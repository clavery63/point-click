import React from 'react';
import { Group, Image } from 'react-konva';

const MenuRight = ({ onClick, onSaveClick, menuButtonImg }) => {
  return (
    <Group x={170} y={5}>
      <Image
        key={1}
        x={5}
        y={10}
        onClick={() => onClick('UP')}
        image={menuButtonImg}
      />
      <Image
        key={2}
        x={5}
        y={26}
        onClick={() => onClick('DOWN')}
        image={menuButtonImg}
      />
      <Image
        key={3}
        x={5}
        y={58}
        onClick={onSaveClick}
        image={menuButtonImg}
      />
    </Group>
  );
};

export default MenuRight;
