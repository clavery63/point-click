import { take, map, takeUntil, mapTo, switchMap, concatMap } from 'rxjs/operators';
import { from, timer, of, concat } from 'rxjs';
import { chunk, range, last } from 'lodash';
import { ofType } from 'redux-observable';
import { textToLines } from './util';

const LINES_PER_PAGE = 4;
const CHARS_PER_LINE = 24;
const MS_PER_CHAR = 75;

const makeLines = textToLines(CHARS_PER_LINE);

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

const text$ = action$ => {
  return action$.pipe(
    ofType('RUN_TEXT'),
    map(({ payload }) => makeLines(payload)),
    switchMap(lines => concat(
      from(chunk(lines, LINES_PER_PAGE)).pipe(
        concatMap(renderPage$(action$))
      ),
      of(null)
    )),
    map(text => ({ type: 'SET_TEXT', payload: text }))
  );
};

export default text$;
