import React from 'react';
import { connect } from 'react-redux';
import { Image, Group } from 'react-konva';

const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;
const shift = ' '.charCodeAt(0);

const mapStateToProps = ({ images }) => {
  return {
    spriteSheets: {
      dark: images['alpha-dark'],
      light: images['alpha-light'],
    }
  };
};

const Text = ({ text, left, top, color, spriteSheets }) => {
  const image = spriteSheets[color] || spriteSheets.dark;
  const upper = text.toUpperCase();
  const charCodes = upper.split('').map(char => char.charCodeAt(0) - shift);

  return (
    <Group>
      {charCodes.map((code, index) => (
        <Image 
          key={index}
          x={left + index * (spriteWidth + 1)}
          y={top}
          width={spriteWidth}
          height={spriteHeight}
          image={image}
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
