import { VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';

const menuOptions: { left: number; top: number}[] = [
  { left: 8, top: 8 },
  { left: 8, top: 24 },
  { left: 8, top: 40 },
  { left: 8, top: 56 },
  { left: 56, top: 8 },
  { left: 56, top: 24 },
  { left: 56, top: 40 },
  { left: 56, top: 56 },
];

type Props = {
  onClick: (verb: VerbIndex) => void;
  currentVerb: VerbIndex;
};

const MenuCenter = ({ onClick, currentVerb }: Props) => {
  return (
    <Group x={71} y={7}>
      {menuOptions.map(({ left, top }, index) => (
        <MenuOption
          key={index}
          verbIndex={index + 1 as VerbIndex}
          left={left}
          top={top}
          onClick={onClick}
          currentVerb={currentVerb}
        />
      ))}
    </Group>
  );
};

export default MenuCenter;
