import { GameStoreState } from 'game/store/types';
import React from 'react';
import { Image, Group } from 'react-konva';
import { createSelector } from 'reselect';
import { useSelector } from 'shared/hooks/redux';
import range from 'lodash/range';

const sheetWidth = 8;
const spriteWidth = 7;
const spriteHeight = 7;
const shift = ' '.charCodeAt(0);

/**
 * TODO: If we want to allow alternative spritesheets (i.e. narrower fonts),
 * then we probably want to do this work in a dedicated module.
 *
 * We also probably want to store common assets like these in their own bucket.
 */
export const makeCanvasSet = (image: HTMLImageElement) => {
  return range(sheetWidth).flatMap(y => range(sheetWidth).map(x => {
    const canvas = document.createElement('canvas');
    canvas.width = spriteWidth;
    canvas.height = spriteHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(
      image,
      x * spriteWidth,
      y * spriteWidth,
      spriteWidth,
      spriteWidth,
      0,
      0,
      spriteWidth,
      spriteWidth,
    );
    return canvas;
  }));
};

const selector = createSelector(
  ({ images }: GameStoreState) => images,
  (images) => {
    const dark = images.get('alpha-dark');
    const light = images.get('alpha-light');
    return {
      dark: dark ? makeCanvasSet(dark) : undefined,
      light: light ? makeCanvasSet(light) : undefined,
    };
  },
);

type Color = 'dark' | 'light';
type TextStatelessProps = {
  text: string;
  left: number;
  top: number;
  canvases?: HTMLCanvasElement[];
};
export const TextStateless = ({
  text, left, top, canvases,
}: TextStatelessProps) => {
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
          image={canvases && canvases[code]}
          perfectDrawEnabled={false}
        />
      ))}
    </Group>
  );
};

type Props = {
  text: string;
  left: number;
  top: number;
  color?: Color;
};
const Text = ({
  text, left, top, color,
}: Props) => {
  const canvasSets = useSelector(selector);
  const canvases = canvasSets[color || 'dark'];

  return (
    <TextStateless
      top={top}
      left={left}
      text={text}
      canvases={canvases}
    />
  );
};

export default Text;
