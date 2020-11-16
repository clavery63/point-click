import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';
import MiniMap from './MiniMap';

const MenuLeft = ({ onMoveClick, onDoorClick, menuOption, doors, menuButtonImg }) => {
  return (
    <Group x={7} y={7}>
      <MenuOption 
        left={8}
        top={0}
        onClick={onMoveClick}
        isActive={menuOption === 'MOVE'}
      />
      <MiniMap onClick={onDoorClick} doors={doors} menuButtonImg={menuButtonImg} />
    </Group>
  );
};

export default MenuLeft;
