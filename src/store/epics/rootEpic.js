import { take, map, takeUntil, mapTo, switchMap, concatMap } from 'rxjs/operators';
import { from, timer, of, concat } from 'rxjs';
import { chunk, range, last } from 'lodash';
import { ofType } from 'redux-observable';

const maxLineLen = 24;

const makeLines = text => {
  const output = [];
  const words = text.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (!output.length) {
      output.push(words[i]);
      continue;
    }
    const lastLine = output[output.length - 1];
    if (lastLine.length + words[i].length + 1 > maxLineLen) {
      output.push(words[i]);
      continue;
    }
    output[output.length - 1] = lastLine.concat(' ' + words[i]);
  }
  return output;
};

const mapLines = (lines, [row, col]) => {
  const fullLines = lines.slice(0, row);
  const lastLine = lines[row].slice(0, col + 1);
  return [...fullLines, lastLine];
};

const renderChunk$ = action$ => lines => {
  const allCoords = lines.flatMap((line, row) => {
    return range(line.length).map(col => [row, col]);
  });
  return concat(
    from(allCoords).pipe(
      concatMap(coords => timer(100).pipe(mapTo(mapLines(lines, coords)))),
      takeUntil(action$.ofType('PAGE_CLICK'))
    ),
    of(mapLines(lines, last(allCoords))),
    action$.ofType('PAGE_CLICK').pipe(mapTo([]), take(1))
  );
};

const rootEpic = action$ => {
  return action$.pipe(
    ofType('RUN_TEXT'),
    map(({ payload }) => makeLines(payload)),
    switchMap(lines => from(chunk(lines, 3)).pipe(
      concatMap(renderChunk$(action$))
    )),
    map(text => ({ type: 'SET_TEXT', payload: text }))
  );
};

export default rootEpic;
