type TextToLines = (c: number) => (t: string) => string[];
export const textToLines: TextToLines = charsPerLine => text => {
  if (!text.length) return [];
  const words = text.trim().split(' ');
  return words.slice(1).reduce((lines, word) => {
    const lastLine = lines[lines.length - 1];
    if (lastLine.length + word.length + 1 > charsPerLine) {
      return [...lines, word];
    }
    const firstLines = lines.slice(0, lines.length - 1);
    return [...firstLines, `${lastLine} ${word}`];
  }, [words[0]]);
};
