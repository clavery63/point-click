import React from 'react';
import { connect } from 'react-redux';
import { Image, Group } from 'react-konva';

const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;

const mapStateToProps = ({ gameState }) => {
  return {
    alphabetImg: gameState.images.alpha
  };
};

const Text = ({ text, left, top, alphabetImg }) => {
  return (
    <Group>
      {text.map((code, charNumber) => (
        <Image 
          key={charNumber}
          x={left + charNumber * (spriteWidth + 1)}
          y={top}
          width={spriteWidth}
          height={spriteHeight}
          image={alphabetImg}
          crop={{ 
            x: (code % sheetWidth) * spriteWidth,
            y: Math.floor(code / sheetWidth) * spriteHeight,
            width: spriteWidth, 
            height: spriteHeight 
          }}
          perfectDrawEnabled={false}
        />
      ))}
    </Group>
  );
};

export default connect(mapStateToProps)(Text);
