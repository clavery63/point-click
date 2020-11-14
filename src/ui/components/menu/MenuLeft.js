import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';
import MiniMap from './MiniMap';

const MenuLeft = ({ onMoveClick, onMapClick, menuOption }) => {
  return (
    <Group x={7} y={7}>
      <MenuOption 
        left={8}
        top={0}
        onClick={onMoveClick}
        isActive={menuOption === 'MOVE'}
      />
      <MiniMap onClick={onMapClick} />
    </Group>
  );
};

export default MenuLeft;
