import { VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';

/**
 * If this ever needs to be more dynamic, we'll pass it in.
 * At that point, we will probably also need to pass in menuButtonImg, since it
 * would no longer be baked into the menu background
 */
const menuOptions: { verb: VerbIndex; left: number; top: number}[] = [
  { verb: 'LOOK', left: 8, top: 8 },
  { verb: 'OPEN', left: 8, top: 24 },
  { verb: 'USE', left: 8, top: 40 },
  { verb: 'SMOKE', left: 8, top: 56 },
  { verb: 'TAKE', left: 56, top: 8 },
  { verb: 'EAT', left: 56, top: 24 },
  { verb: 'HIT', left: 56, top: 40 },
  { verb: 'SPEAK', left: 56, top: 56 },
];

type Props = {
  onClick: (verb: VerbIndex) => void;
  currentVerb: VerbIndex;
};

const MenuCenter = ({ onClick, currentVerb }: Props) => {
  return (
    <Group x={71} y={7}>
      {menuOptions.map(({ verb, left, top }) => (
        <MenuOption
          key={verb}
          verb={verb}
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
