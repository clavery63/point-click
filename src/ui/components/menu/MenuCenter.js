import React from 'react';
import { Group } from 'react-konva';
import MenuOption from './MenuOption';

/**
 * If this needs to be more dynamic at some point, we'll pass it in
 * At that point, we will probably also need to pass in menuButtonImg, since it
 * would no longer be baked into the menu background
 */
const menuOptions = [
  { verb: 'LOOK',  left: 8, top: 8 },
  { verb: 'OPEN',  left: 8, top: 24 },
  { verb: 'USE',   left: 8, top: 40 },
  { verb: 'LEAVE', left: 8, top: 56 },
  { verb: 'TAKE',  left: 56, top: 8 },
  { verb: 'CLOSE', left: 56, top: 24 },
  { verb: 'HIT',   left: 56, top: 40 },
  { verb: 'SPEAK', left: 56, top: 56 }
];

const MenuCenter = ({ onClick, currentVerb }) => {
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
