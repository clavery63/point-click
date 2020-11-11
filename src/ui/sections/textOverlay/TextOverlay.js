import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import { connect } from 'react-redux';
import alphaSrc from '../../../images/alpha.png';

// 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod test'

const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;

const TextOverlay = ({ text }) => {
  const [alphabet, setAlphabet] = useState(null);

  const top = 100;
  const left = 20;
  const shift = ' '.charCodeAt(0);
  const strs = text.map(str => {
    const upper = str.toUpperCase();
    return upper.split('').map(char => char.charCodeAt(0) - shift);
  });

  useEffect(() => {
    const alphaImg = new window.Image();
    alphaImg.src = alphaSrc;
    setAlphabet(alphaImg);
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

export default connect(({ text }) => ({ text }))(TextOverlay);
