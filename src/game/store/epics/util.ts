import { chunk, last } from 'lodash';
import identity from 'lodash/identity';
import { AllActions } from './types';

const CHARS_PER_LINE = 24;
const LINES_PER_PAGE = 4;

export type PageType = 'standard' | 'scroll';
export type Page = {
  previousPage?: string[];
  lines: string[];
  type: PageType;
};

type TextToLines = (t: string) => string[];
const textToLines: TextToLines = text => {
  const lines: string[] = [];
  let curWord = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ' || char === '\n') {
      const lastLine = last(lines);
      if (!lastLine || lastLine.length + curWord.length + 1 > CHARS_PER_LINE) {
        lines.push(curWord);
      } else {
        lines[lines.length - 1] = `${lines[lines.length - 1]} ${curWord}`;
      }
      curWord = '';
      continue;
    }
    if (char === '\n') {
      lines.push('');
      continue;
    }
    curWord += char;
  }
  return lines;
};

type TextToPages = (t: string) => Page[];
export const textToPages: TextToPages = text => {
  const allLines = textToLines(text);
  const chunks = chunk(allLines, LINES_PER_PAGE);
  return chunks.map(lines => ({
    type: 'standard',
    lines,
  }));
};

type When = (p: boolean, a: AllActions) => AllActions;
export const when: When = (pred, action) => {
  return pred ? action : { type: 'NULL' };
};

type TypedAction = (a: AllActions) => AllActions;
export const typedAction: TypedAction = identity;
