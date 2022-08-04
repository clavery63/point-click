import {
  take, map, takeUntil, mapTo, concatMap, tap, switchMap,
} from 'rxjs/operators';
import {
  from, timer, of, concat, Observable, EMPTY,
} from 'rxjs';
import range from 'lodash/range';
import { ActionsType } from 'game/store/reducers/rootReducer';
import { ofType } from 'redux-observable';
import { Page, PageType, textToPages } from '../util';

const MS_PER_CHAR = 65;
const LINE_HEIGHT = 16;

const getInitScroll = (type: PageType, numLines: number) => {
  if (type === 'standard') {
    return 0;
  }

  return numLines * LINE_HEIGHT;
};

const doScroll$ = (type: PageType, prevLines: string[], lineIndex: number) => {
  if (type === 'standard') {
    return EMPTY;
  }

  return from(range(LINE_HEIGHT / 4)).pipe(
    concatMap(scrollFrame => timer(MS_PER_CHAR).pipe(mapTo({
      lines: prevLines,
      scroll: (lineIndex * LINE_HEIGHT) + (scrollFrame * 4),
    }))),
  );
};

const textAnimation$ = (animateText: boolean, numChars: number) => {
  if (!animateText) {
    return of(numChars);
  }

  return from(range(numChars)).pipe(
    concatMap(position => timer(MS_PER_CHAR).pipe(mapTo(position))),
  );
};

const renderLine$ = (page: Page, shouldAnimateText: boolean = true) => (lineIndex: number) => {
  const { type, lines, previousPage = [] } = page;
  const prevLines = [...previousPage, ...lines.slice(0, lineIndex)];
  const curLine = lines[lineIndex];
  const initScroll = getInitScroll(type, lineIndex + 1);

  return concat(
    doScroll$(type, prevLines, lineIndex),
    textAnimation$(shouldAnimateText, curLine.length).pipe(map(position => ({
      lines: [...prevLines, curLine.slice(0, position + 1)],
      scroll: initScroll,
    }))),
  );
};

const renderPage$ = (pageClick$: Observable<any>) => (page: Page) => {
  let lastLineRendered = 0;
  return concat(

    // Render the lines one at a time
    from(range(page.lines.length)).pipe(
      concatMap(renderLine$(page)),
      takeUntil(pageClick$),
      tap(({ lines }) => {
        lastLineRendered = lines.length - (page.previousPage || []).length;
      }),
    ),

    // Finish rendering the page after click. This might involve scrolling through
    // the rest of the text.
    of({}).pipe(switchMap(() => {
      if (lastLineRendered === page.length) {
        return of({ lines: page.lines, scroll: 0 });
      }
      return from(range(lastLineRendered, page.lines.length)).pipe(
        concatMap(renderLine$(page, false)),
      );
    })),

    // Click again to go to the next page (or close the dialog if this is the last page)
    pageClick$.pipe(
      mapTo({ lines: page.lines, scroll: 0 }),
      take(1),
    ),
  );
};

type RunText = (p: Observable<any>) => (t: string) => Observable<ActionsType['SET_TEXT']>;
const runText$: RunText = action$ => {
  const pageClick$ = action$.pipe(ofType('PAGE_CLICK'));
  return rawText => {
    const pages = textToPages(rawText);
    return concat(
      from(pages).pipe(concatMap(renderPage$(pageClick$))),
      of({ lines: null, scroll: 0 }),
    ).pipe(
      map(payload => ({ type: 'SET_TEXT', payload })),
    );
  };
};

export default runText$;
