import {
  take, map, takeUntil, mapTo, concatMap,
} from 'rxjs/operators';
import {
  from, timer, of, concat, Observable,
} from 'rxjs';
import chunk from 'lodash/chunk';
import range from 'lodash/range';
import { ActionsType } from 'game/store/reducers/rootReducer';
import { textToLines } from '../util';

const LINES_PER_PAGE = 4;
const CHARS_PER_LINE = 24;
const MS_PER_CHAR = 65;

const makeLines = textToLines(CHARS_PER_LINE);

type Position = [number, number];

type Page = {
  existingLines?: string[];
  lines: string[];
  type: 'standard' | 'scroll';
};

type GetLines = (l: string[], p: Position) => string[];
const getLines: GetLines = (lines, [row, col]) => {
  const fullLines = lines.slice(0, row);
  const lastLine = lines[row].slice(0, col + 1);
  return [...fullLines, lastLine];
};

type LtoP = (l: string[]) => Position[];
const linesToPositions: LtoP = lines => lines.flatMap((line, row) => {
  const positions: Position[] = range(line.length).map(col => [row, col]);
  return positions;
});

type RenderPage = (p: Observable<any>) => (l: Page) => Observable<string[]>;
const renderPage$: RenderPage = pageClick$ => page => {
  const allPositions = linesToPositions(page.lines);
  const lastPosition = allPositions[allPositions.length - 1];
  return concat(
    from(allPositions).pipe(
      concatMap(position => timer(MS_PER_CHAR).pipe(mapTo(getLines(page.lines, position)))),
      takeUntil(pageClick$),
    ),
    of(getLines(page.lines, lastPosition)),
    pageClick$.pipe(mapTo([]), take(1)),
  );
};

type RunText = (p: Observable<any>) => (t: string) => Observable<ActionsType['SET_TEXT']>;
const runText$: RunText = pageClick$ => rawText => {
  const lines = makeLines(rawText);
  const chunks = chunk(lines, LINES_PER_PAGE);
  const pages: Page[] = chunks.map(pageLines => ({
    type: 'standard',
    lines: pageLines,
  }));
  pages[1].type = 'scroll';
  pages[1].existingLines = pages[0].lines;
  return concat(
    from(pages).pipe(
      concatMap(renderPage$(pageClick$)),
    ),
    of(null),
  ).pipe(map(text => ({ type: 'SET_TEXT', payload: text })));
};

export default runText$;
