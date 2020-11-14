import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';
import MiniMap from './MiniMap';

const MenuLeft = () => {
  return (
    <Group x={8} y={8}>
      <MenuOption />
      <MiniMap />
    </Group>
  );
};

export default MenuLeft;
