import { Door, VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';
import MiniMap from './MiniMap';

type Props = {
  onMenuClick: (verb: VerbIndex) => void;
  onDoorClick: (id: number) => void;
  currentVerb: VerbIndex;
  doors: Door[];
  menuButtonImg?: HTMLImageElement;
};
const MenuLeft = (props: Props) => {
  const {
    onMenuClick, onDoorClick, currentVerb, doors, menuButtonImg,
  } = props;
  return (
    <Group x={7} y={7}>
      <MenuOption
        verb="MOVE"
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
