import { assign, chunk } from 'lodash';
import identity from 'lodash/identity';
import { AllActions } from './types';

const CHARS_PER_LINE = 24;
const LINES_PER_PAGE = 4;

export type PageType = 'standard' | 'scroll';
export type Page = {
  previousPage?: string[];
  lines: string[];
  length?: number;
  type: PageType;
};

type TextToLines = (t: string) => string[];
const textToLines: TextToLines = text => {
  if (!text.length) return [''];
  const words = text.trim().split(' ');
  return words.slice(1).reduce((lines, word) => {
    const lastLine = lines[lines.length - 1];
    if (lastLine.length + word.length + 1 > CHARS_PER_LINE) {
      return [...lines, word];
    }
    const firstLines = lines.slice(0, lines.length - 1);
    return [...firstLines, `${lastLine} ${word}`];
  }, [words[0]]);
};

const textToParagraphs: TextToLines = text => {
  return text.split('\n').map(textToLines).flat();
};

type TextToPagesForType = (t: string, type: PageType) => Page[];
const textToPagesForType: TextToPagesForType = (text, type) => {
  const allLines = textToParagraphs(text);
  const chunks = chunk(allLines, LINES_PER_PAGE);
  return chunks.map(lines => ({
    type,
    lines,
  }));
};

const paddedPage = (lines: string[]) => {
  return assign(['', '', '', ''], lines);
};

const paddedPreviousPage = (typedChapters: Page[], i: number) => {
  return paddedPage(i === 0 ? [] : typedChapters[i - 1].lines);
};

const getActualLength = (lines: string[]) => {
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].length > 0) {
      return i + 1;
    }
  }
  return 0;
};

type TextToPages = (t: string) => Page[];
export const textToPages: TextToPages = text => {
  const chapters = text.split('\n~');
  if (chapters[0].length === 0) {
    chapters.shift();
  }
  const typedChapters = chapters.flatMap((chapter) => {
    if (chapter.startsWith('scroll')) {
      return textToPagesForType(chapter.slice(8), 'scroll');
    }
    if (chapter.startsWith('standard')) {
      return textToPagesForType(chapter.slice(10), 'standard');
    }
    return textToPagesForType(chapter, 'standard');
  });

  return typedChapters.map((typedChapter, i) => {
    if (typedChapter.type === 'scroll') {
      return {
        type: 'scroll',
        lines: paddedPage(typedChapter.lines),
        length: getActualLength(typedChapter.lines),
        previousPage: paddedPreviousPage(typedChapters, i),
      };
    }
    return typedChapter;
  });
};

type When = (p: boolean, a: AllActions) => AllActions;
export const when: When = (pred, action) => {
  return pred ? action : { type: 'NULL' };
};

type TypedAction = (a: AllActions) => AllActions;
export const typedAction: TypedAction = identity;
