import React from 'react';
import { Group, Rect, Image } from 'react-konva';
import range from 'lodash/range';
import { GameStoreState } from 'game/store/types';
import { useSelector } from 'shared/hooks/redux';
import Text from '../shared/Text';

const TEXT_AREA_WIDTH = 224;
const TEXT_AREA_HEIGHT = 96;

type HrProps = {
  left: number;
  top: number;
  hr?: HTMLImageElement;
};
const Hr = ({ left, top, hr }: HrProps) => (
  <>
    {range(26).map(i => (
      <Image
        key={i}
        x={left + 8 * i}
        y={top}
        width={8}
        height={1}
        image={hr}
      />
    ))}
  </>
);

type RowsProps = {
  hr?: HTMLImageElement;
  num: number;
};
const Rows = ({ hr, num }: RowsProps) => (
  <>
    {range(Math.max(5, num + 1)).map(i => (
      <Hr key={i} left={8} top={2 + i * 16} hr={hr} />
    ))}
  </>
);

const selector = ({ text, images, config }: GameStoreState) => {
  return {
    lines: text.lines || null,
    scroll: text.scroll,
    hrImg: images.get('line'),
    bgColor: config.colors.background,
  };
};

const TextOverlay = () => {
  const {
    lines, scroll, hrImg, bgColor,
  } = useSelector(selector);

  if (!lines) {
    return null;
  }

  return (
    <Group
      x={16}
      y={160}
      width={TEXT_AREA_WIDTH}
      height={TEXT_AREA_HEIGHT}
      clipX={0}
      clipY={0}
      clipWidth={TEXT_AREA_WIDTH}
      clipHeight={TEXT_AREA_HEIGHT - 10}
    >
      <Rect width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT} fill={bgColor} />
      <Group y={-scroll}>
        <Rows hr={hrImg} num={lines.length} />
        {lines.map((line, lineNumber) => (
          <Text
            key={lineNumber}
            left={9}
            top={9 + lineNumber * 16}
            text={line}
          />
        ))}
      </Group>
    </Group>
  );
};

export default TextOverlay;
