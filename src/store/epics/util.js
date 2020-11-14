import { last } from 'lodash';

export const textToLines = charsPerLine => text => {
  if (!text.length) return [];
  const words = text.trim().split(' ');
  return words.slice(1).reduce((lines, word) => {
    if (last(lines).length + word.length + 1 > charsPerLine) {
      return [...lines, word];
    }
    const firstLines = lines.slice(0, lines.length - 1);
    return [...firstLines, `${last(lines)} ${word}`];
  }, [words[0]]);
};
