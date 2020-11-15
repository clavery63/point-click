import React, { useEffect, useState } from 'react';
import { Group, Rect } from 'react-konva';
import Text from '../shared/Text';
import alphaSrc from '../../../images/alpha.png';

const TEXT_AREA_WIDTH = 240;
const TEXT_AREA_HEIGHT = 96;
const TEXT_AREA_COLOR = '#f6d7ae';

const TextOverlay = ({ lines, onClick }) => {
  const [alphabet, setAlphabet] = useState(null);

  useEffect(() => {
    const alphaImg = new window.Image();
    alphaImg.src = alphaSrc;
    setAlphabet(alphaImg);
  }, []);

  if (!lines) {
    return null;
  }

  return (
    <Group>
      <Rect width={256} height={240} onClick={onClick} />
      <Group x={8} y={160} width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT}>
        <Rect width={TEXT_AREA_WIDTH} height={TEXT_AREA_HEIGHT} fill={TEXT_AREA_COLOR} />
        {lines.map((line, lineNumber) => (
          <Text
            key={lineNumber}
            left={12}
            top={12 + lineNumber * 16}
            text={line}
            alphabet={alphabet}
          />
        ))}
      </Group>
    </Group>
  );
};

export default TextOverlay;
