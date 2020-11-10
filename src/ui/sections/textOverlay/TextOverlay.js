import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import alphaSrc from '../../../images/alpha.png';

const testStrs = [
  'Water cascades over a',
  'subterranean cliff into',
  'a cool, clean stream.'
];
const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;
const lineWidth = 24;

const TextOverlay = () => {
  const [alpha, setAlpha] = useState(null);

  const top = 100;
  const left = 50;
  const shift = ' '.charCodeAt(0);
  const strs = testStrs.map(str => {
    const upper = str.toUpperCase();
    return upper.split('').map(char => char.charCodeAt(0) - shift);
  });

  useEffect(() => {
    const alphaImg = new window.Image();
    alphaImg.src = alphaSrc;
    setAlpha(alphaImg);
  }, []);

  return (
    <>
      {strs.map((line, lineNumber) => {
        return line.map((code, charNumber) => (
          <Image 
            key={lineNumber * 1000 + charNumber}
            x={left + charNumber * (spriteWidth + 1)}
            y={top + lineNumber * (spriteHeight + 1)}
            width={spriteWidth}
            height={spriteHeight}
            image={alpha}
            crop={{ 
              x: (code % sheetWidth) * spriteWidth,
              y: Math.floor(code / sheetWidth) * spriteHeight,
              width: spriteWidth, 
              height: spriteHeight 
            }}
          />
        ));
      })}
    </>
  );
};

export default TextOverlay;
