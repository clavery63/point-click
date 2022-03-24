import { VerbIndex } from 'game/store/types';
import React from 'react';
import MenuOption from './MenuOption';

const menuOptions: { left: number; top: number}[] = [
  { left: 15, top: 7 },
  { left: 68, top: 15 },
  { left: 68, top: 31 },
  { left: 68, top: 47 },
  { left: 68, top: 63 },
  { left: 118, top: 15 },
  { left: 118, top: 31 },
  { left: 118, top: 47 },
  { left: 118, top: 63 },
];

type Props = {
  onClick: (verb: VerbIndex) => void;
};

const MenuCenter = ({ onClick }: Props) => {
  return (
    <>
      {menuOptions.map(({ left, top }, index) => (
        <MenuOption
          key={index}
          verbIndex={index as VerbIndex}
          left={left}
          top={top}
          onClick={onClick}
        />
      ))}
    </>
  );
};

export default MenuCenter;
