import React from 'react';
import { Rect } from 'shared/components/tappables';
import { useDispatch, useSelector } from 'shared/hooks';
import Text from '../shared/Text';

const KEY = 'doublehamburger-save-data';

const GameOver = () => (
  <Text left={92} top={60} color="light" text="game over" />
);

type Props = {
  onClick: () => void;
}

const Start = ({ onClick }: Props) => (
  <>
    <Text left={88} top={100} color="light" text="start game" />
    <Rect
      x={88}
      y={100}
      height={8}
      width={80}
      onClick={onClick}
    />
  </>
);

const Load = ({ onClick }: Props) => (
  <>
    <Text left={92} top={120} color="light" text="load game" />
    <Rect x={92} y={120} height={8} width={72} onClick={onClick} />
  </>
);

const OuterMenu = () => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu);

  if (menu === 'NONE') return null;

  const hack = (fn: () => void) => () => {
    // NOTE: This hack is here to establish play intent from the user. Otherwise
    // mobile browsers get angry.
    const el = document.querySelector('.music-player') as HTMLAudioElement;
    el.play();
    fn();
  };

  const hasLoadData = !!window.localStorage.getItem(KEY);

  return (
    <>
      {menu === 'GAME_OVER' && <GameOver />}
      <Start onClick={hack(() => dispatch({ type: 'START_GAME' }))} />
      {hasLoadData && <Load onClick={hack(() => dispatch({ type: 'LOAD_GAME' }))} />}
    </>
  );
};

export default OuterMenu;
