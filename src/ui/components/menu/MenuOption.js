import React from 'react';
import { Group, Rect } from 'react-konva';

const MenuOption = ({ top, left, onClick, isActive }) => {
  return (
    <Group x={left} y={top}>
      <Rect
        fill={isActive ? 'black' : null}
        onClick={isActive ? () => {} : onClick}
        width={8}
        height={8}
      />
    </Group>
  );
};

export default MenuOption;
