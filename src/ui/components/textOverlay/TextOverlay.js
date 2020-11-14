import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import alphaSrc from '../../../images/alpha.png';

const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;
const top = 150;
const left = 20;

const TextOverlay = ({ lines }) => {
  const [alphabet, setAlphabet] = useState(null);

  useEffect(() => {
    const alphaImg = new window.Image();
    alphaImg.src = alphaSrc;
    setAlphabet(alphaImg);
  }, []);

  return (
    <>
      {lines.map((line, lineNumber) => {
        return line.map((code, charNumber) => (
          <Image 
            key={lineNumber * 1000 + charNumber}
            x={left + charNumber * (spriteWidth + 1)}
            y={top + lineNumber * (spriteHeight + 1)}
            width={spriteWidth}
            height={spriteHeight}
            image={alphabet}
            crop={{ 
              x: (code % sheetWidth) * spriteWidth,
              y: Math.floor(code / sheetWidth) * spriteHeight,
              width: spriteWidth, 
              height: spriteHeight 
            }}
            perfectDrawEnabled={false}
          />
        ));
      })}
    </>
  );
};

export default TextOverlay;
