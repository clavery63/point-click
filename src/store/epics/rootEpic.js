import { take, map, takeUntil, mapTo, switchMap, concatMap } from 'rxjs/operators';
import { from, timer, of, concat } from 'rxjs';
import { chunk, range, last } from 'lodash';
import { ofType } from 'redux-observable';

const MAX_LINE_LEN = 24;

const makeLines = text => {
  const words = text.split(' ');
  return words.slice(1).reduce((lines, word) => {
    if (last(lines).length + word.length + 1 > MAX_LINE_LEN) {
      return [...lines, [word]];
    }
    const firstLines = lines.slice(0, lines.length - 1);
    return [...firstLines, `${last(lines)} ${word}`];
  }, [words[0]]);
};

const getLines = (lines, [row, col]) => {
  const fullLines = lines.slice(0, row);
  const lastLine = lines[row].slice(0, col + 1);
  return [...fullLines, lastLine];
};

const mapToPositions = lines => lines.flatMap((line, row) => {
  return range(line.length).map(col => [row, col]);
});

const renderChunk$ = action$ => lines => {
  const allPositions = mapToPositions(lines);
  return concat(
    from(allPositions).pipe(
      concatMap(position => timer(100).pipe(mapTo(getLines(lines, position)))),
      takeUntil(action$.ofType('PAGE_CLICK'))
    ),
    of(getLines(lines, last(allPositions))),
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
