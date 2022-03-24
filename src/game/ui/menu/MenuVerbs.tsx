import { VerbIndex } from 'game/store/types';
import React from 'react';
import { useSelector } from 'shared/hooks/redux';
import VerbOption from './VerbOption';

type Props = {
  onClick: (verb: VerbIndex) => void;
};

const MenuCenter = ({ onClick }: Props) => {
  const verbPositions = useSelector(state => state.config.positions.verbs);
  return (
    <>
      {verbPositions.map(({ left, top }, index) => (
        <VerbOption
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
