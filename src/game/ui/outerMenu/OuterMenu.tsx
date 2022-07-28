import React from 'react';
import { useSelector } from 'shared/hooks/redux';
import GameOver from './GameOver';
import SaveGame from './SaveGame';
import Title from './Title';

const OuterMenu = () => {
  const { current } = useSelector(state => state.menu);

  switch (current) {
    case 'TITLE': return <Title />;
    case 'GAME_OVER': return <GameOver />;
    case 'SAVE': return <SaveGame />;
    default: return null;
  }
};

export default OuterMenu;
