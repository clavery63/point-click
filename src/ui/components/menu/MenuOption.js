import React from 'react';
import { Group, Rect } from 'react-konva';

const MenuOption = ({ verb, top, left, onClick, currentVerb }) => {
  const isActive = verb === currentVerb;
  return (
    <Group x={left} y={top}>
      <Rect
        fill={isActive ? 'black' : null}
        onClick={isActive ? () => {} : () => onClick(verb)}
        width={8}
        height={8}
      />
    </Group>
  );
};

export default MenuOption;
