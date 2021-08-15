import React from 'react';
import { Group, Rect, Image } from 'react-konva';
import { range } from 'lodash';
import Text from '../shared/Text';

const TEXT_AREA_WIDTH = 224;
const TEXT_AREA_HEIGHT = 96;
const TEXT_AREA_COLOR = '#f6d7ae';

const Hr = ({ left, top, hr }) => range(26).map(i => (
  <Image
    key={i}
    x={left + 8 * i}
    y={top}
    width={8}
    height={1}
    image={hr}
  />
));

const Rows = ({ hr }) => range(5).map(i => (
  <Hr key={i} left={8} top={2 + i * 16}  hr={hr} />
));

const TextOverlay = ({ lines, hrImg }) => {
  if (!lines) {
    return null;
  }

  return (
    <Group>
      <Group x={16} y={160} width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT}>
        <Rect width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT} fill={TEXT_AREA_COLOR} />
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
