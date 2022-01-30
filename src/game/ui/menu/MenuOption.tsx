import { VerbIndex } from 'game/store/types';
import React from 'react';
import { Group } from 'react-konva';
import { Rect } from 'shared/components/tappables';

type Props = {
  verb: VerbIndex;
  top: number;
  left: number;
  onClick: (verb: VerbIndex) => void;
  currentVerb: VerbIndex
}

const MenuOption = (props: Props) => {
  const { verb, top, left, onClick, currentVerb } = props;
  const isActive = verb === currentVerb;
  return (
    <Group x={left} y={top}>
      <Rect
        fill={isActive ? 'black' : null}
        onClick={isActive ? () => {} : () => onClick(verb)}
        width={8}
        height={8}
      />
    </Group>
  );
};

export default MenuOption;
