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

type Page = {
  existingLines?: string[];
  lines: string[];
  type: 'standard' | 'scroll';
};

const renderLine$ = (page: Page) => (lineIndex: number) => {
  const { type, lines } = page;
  const prevLines = lines.slice(0, lineIndex);
  const curLine = lines[lineIndex];
  const positions = range(curLine.length);
  return from(positions).pipe(
    concatMap(position => timer(MS_PER_CHAR).pipe(mapTo({
      lines: [...prevLines, curLine.slice(0, position)],
      scroll: 0,
    }))),
  );
};

const renderPage$ = (pageClick$: Observable<any>) => (page: Page) => {
  return concat(
    from(range(page.lines.length)).pipe(
      concatMap(renderLine$(page)),
      takeUntil(pageClick$),
    ),
    of({ lines: page.lines, scroll: 0 }),
    pageClick$.pipe(mapTo({ lines: [], scroll: 0 }), take(1)),
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
    from(pages).pipe(concatMap(renderPage$(pageClick$))),
    of({ lines: null, scroll: 0 }),
  ).pipe(map(payload => ({ type: 'SET_TEXT', payload })));
};

export default runText$;
