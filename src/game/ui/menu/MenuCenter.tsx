import { VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';

const menuOptions: { left: number; top: number}[] = [
  { left: 8, top: 8 },
  { left: 8, top: 24 },
  { left: 8, top: 40 },
  { left: 8, top: 56 },
  { left: 58, top: 8 },
  { left: 58, top: 24 },
  { left: 58, top: 40 },
  { left: 58, top: 56 },
];

type Props = {
  onClick: (verb: VerbIndex) => void;
};

const MenuCenter = ({ onClick }: Props) => {
  return (
    <Group x={60} y={7}>
      {menuOptions.map(({ left, top }, index) => (
        <MenuOption
          key={index}
          verbIndex={index + 1 as VerbIndex}
          left={left}
          top={top}
          onClick={onClick}
        />
      ))}
    </Group>
  );
};

export default MenuCenter;
