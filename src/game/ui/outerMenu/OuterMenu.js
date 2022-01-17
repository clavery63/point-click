import React from 'react';
import { Rect } from 'shared/components/tappables';
import Text from '../shared/Text';

const KEY = 'doublehamburger-save-data';

const GameOver = () => (
  <Text left={92} top={60} color={'light'} text={'game over'} />
);

const Start = ({ onClick }) => (
  <>
    <Text left={88} top={100} color={'light'} text={'start game'} />
    <Rect 
      x={88} 
      y={100} 
      height={8} 
      width={80} 
      onClick={onClick}
    />
  </>
);

const Load = ({ onClick }) => (
  <>
    <Text left={92} top={120} color={'light'} text={'load game'} />
    <Rect x={92} y={120} height={8} width={72} onClick={onClick} />
  </>
);

const OuterMenu = ({ menu, onStartClick, onLoadClick }) => {
  if (menu === 'NONE') return null;

  const hack = fn => (...args) => {
    // NOTE: This hack is here to establish play intent from the user. Otherwise
    // mobile browsers get angry.
    document.querySelector('.music-player').play();
    fn(...args);
  }

  const hasLoadData = !!window.localStorage.getItem(KEY);

  return (
    <>
      {menu === 'GAME_OVER' && <GameOver />}
      <Start onClick={hack(onStartClick)} />
      {hasLoadData && <Load onClick={hack(onLoadClick)} />}
    </>
  );
};

export default OuterMenu;
