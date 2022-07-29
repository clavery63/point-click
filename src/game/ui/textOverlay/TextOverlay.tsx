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
};
const Rows = ({ hr }: RowsProps) => (
  <>
    {range(5).map(i => (
      <Hr key={i} left={8} top={2 + i * 16} hr={hr} />
    ))}
  </>
);

const selector = ({ text, images, config }: GameStoreState) => {
  return {
    lines: text.lines || null,
    hrImg: images.get('line'),
    bgColor: config.colors.background,
  };
};

const TextOverlay = () => {
  const { lines, hrImg, bgColor } = useSelector(selector);

  if (!lines) {
    return null;
  }

  return (
    <Group>
      <Group x={16} y={160} width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT}>
        <Rect width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT} fill={bgColor} />
        <Rows hr={hrImg} />
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
