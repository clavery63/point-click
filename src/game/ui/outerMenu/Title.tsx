import React from 'react';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { getSaveDataKey } from 'game/store/epics/save';
import ClickText from '../shared/ClickText';

type Props = {
  fadeOnStart?: boolean;
};
const Title = ({ fadeOnStart = true }: Props) => {
  const dispatch = useDispatch();
  const gameName = useSelector(state => state.gameName);

  const hack = (fn: () => void) => () => {
    // NOTE: This hack is here to establish play intent from the user. Otherwise
    // mobile browsers get angry.
    const el = document.querySelector('.music-player') as HTMLAudioElement;
    el.play();
    fn();
  };

  const hasLoadData = !!window.localStorage.getItem(getSaveDataKey(gameName));

  return (
    <>
      <ClickText
        left="centered"
        top={100}
        color="light"
        text="start game"
        onClick={hack(() => dispatch({ type: 'START_GAME', payload: fadeOnStart }))}
      />
      {hasLoadData && (
        <ClickText
          left="centered"
          top={120}
          color="light"
          text="load game"
          onClick={hack(() => dispatch({ type: 'LOAD_GAME' }))}
        />
      )}
    </>
  );
};

export default Title;
