import React from 'react';
import { Rect } from 'shared/components/tappables';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { getSaveDataKey } from 'game/store/epics/save';
import Text from '../shared/Text';

type StartProps = {
  onClick: () => void;
};

const Start = ({ onClick }: StartProps) => (
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

const Load = ({ onClick }: StartProps) => (
  <>
    <Text left={92} top={120} color="light" text="load game" />
    <Rect x={92} y={120} height={8} width={72} onClick={onClick} />
  </>
);

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
      <Start onClick={hack(() => dispatch({ type: 'START_GAME', payload: fadeOnStart }))} />
      {hasLoadData && <Load onClick={hack(() => dispatch({ type: 'LOAD_GAME' }))} />}
    </>
  );
};

export default Title;
