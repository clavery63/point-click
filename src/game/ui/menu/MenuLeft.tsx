import { Door, VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';
import MiniMap from './MiniMap';

type Props = {
  onMenuClick: (verb: VerbIndex) => void;
  onDoorClick: (id: number) => void;
  doors: Door[];
};
const MenuLeft = (props: Props) => {
  const {
    onMenuClick, onDoorClick, doors,
  } = props;
  return (
    <Group x={7} y={7}>
      <MenuOption
        verbIndex={0}
        left={8}
        top={0}
        onClick={onMenuClick}
      />
      <MiniMap onClick={onDoorClick} doors={doors} />
    </Group>
  );
};

export default MenuLeft;
