import { GameStoreState } from 'game/store/types';
import React from 'react';
import { Image, Group } from 'react-konva';
import { useSelector } from 'shared/hooks';

const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;
const shift = ' '.charCodeAt(0);

const selector = ({ images }: GameStoreState) => {
  return {
    spriteSheets: {
      dark: images.get('alpha-dark'),
      light: images.get('alpha-light'),
    },
  };
};

type Color = 'dark' | 'light';
type Props = {
  text: string;
  left: number;
  top: number;
  color?: Color;
};
const Text = ({
  text, left, top, color,
}: Props) => {
  const { spriteSheets } = useSelector(selector);
  const image = spriteSheets[color || 'dark'];
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
            height: spriteHeight,
          }}
          perfectDrawEnabled={false}
        />
      ))}
    </Group>
  );
};

export default Text;
