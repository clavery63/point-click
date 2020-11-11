import { take, map, takeUntil, mapTo, switchMap, concatMap } from 'rxjs/operators';
import { from, timer, of, concat } from 'rxjs';
import { chunk, range, last } from 'lodash';
import { ofType } from 'redux-observable';

const LINES_PER_PAGE = 3;
const CHARS_PER_LINE = 24;
const MS_PER_CHAR = 100;

const makeLines = text => {
  if (!text.length) return [];
  const words = text.split(' ');
  return words.slice(1).reduce((lines, word) => {
    if (last(lines).length + word.length + 1 > CHARS_PER_LINE) {
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

const linesToPositions = lines => lines.flatMap((line, row) => {
  return range(line.length).map(col => [row, col]);
});

const renderPage$ = action$ => lines => {
  const allPositions = linesToPositions(lines);
  return concat(
    from(allPositions).pipe(
      concatMap(position => timer(MS_PER_CHAR).pipe(mapTo(getLines(lines, position)))),
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
    switchMap(lines => from(chunk(lines, LINES_PER_PAGE)).pipe(
      concatMap(renderPage$(action$))
    )),
    map(text => ({ type: 'SET_TEXT', payload: text }))
  );
};

export default rootEpic;
