import { last } from 'lodash';
import identity from 'lodash/identity';
import { AllActions } from './types';

type TextToLines = (c: number) => (t: string) => string[];
export const textToLines: TextToLines = charsPerLine => text => {
  const lines: string[] = [];
  let curWord = '';
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === ' ' || char === '\n') {
      const lastLine = last(lines);
      if (!lastLine || lastLine.length + curWord.length + 1 > charsPerLine) {
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

type When = (p: boolean, a: AllActions) => AllActions;
export const when: When = (pred, action) => {
  return pred ? action : { type: 'NULL' };
};

type TypedAction = (a: AllActions) => AllActions;
export const typedAction: TypedAction = identity;
