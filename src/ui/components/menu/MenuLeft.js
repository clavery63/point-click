import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';
import MiniMap from './MiniMap';

const MenuLeft = ({ onMenuClick, onDoorClick, currentVerb, doors, menuButtonImg }) => {
  return (
    <Group x={7} y={7}>
      <MenuOption
        verb={'MOVE'}
        left={8}
        top={0}
        onClick={onMenuClick}
        currentVerb={currentVerb}
      />
      <MiniMap onClick={onDoorClick} doors={doors} menuButtonImg={menuButtonImg} />
    </Group>
  );
};

export default MenuLeft;
