import { VerbIndex } from 'game/store/types';
import React from 'react';
import { useSelector } from 'shared/hooks/redux';
import MenuOption from './MenuOption';

type Props = {
  verbIndex: VerbIndex;
  top: number;
  left: number;
  onClick: (verb: VerbIndex) => void;
};

const VerbOption = (props: Props) => {
  const {
    verbIndex, top, left, onClick,
  } = props;
  const currentVerb = useSelector(state => state.playerState.verb);
  const verbNames = useSelector(state => state.config.verbs);
  const isActive = verbIndex === currentVerb;

  return (
    <MenuOption
      top={top}
      left={left}
      text={verbNames[verbIndex].name}
      onClick={() => onClick(verbIndex)}
      isActive={isActive}
    />
  );
};

export default VerbOption;
