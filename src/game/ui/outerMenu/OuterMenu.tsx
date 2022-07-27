import React from 'react';
import { useSelector } from 'shared/hooks/redux';
import GameOver from './GameOver';
import Title from './Title';

const OuterMenu = () => {
  const { current } = useSelector(state => state.menu);

  switch (current) {
    case 'TITLE': return <Title />;
    case 'GAME_OVER': return <GameOver />;
    default: return null;
  }
};

export default OuterMenu;
