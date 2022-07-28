import React from 'react';
import { Rect } from 'shared/components/tappables';
import { useDispatch } from 'shared/hooks/redux';
import Text from '../shared/Text';

type StartProps = {
  onClick: () => void;
};

const No = ({ onClick }: StartProps) => (
  <>
    <Text left={88} top={100} color="light" text="no" />
    <Rect x={88} y={100} height={8} width={80} onClick={onClick} />
  </>
);

const Yes = ({ onClick }: StartProps) => (
  <>
    <Text left={92} top={120} color="light" text="yes" />
    <Rect x={92} y={120} height={8} width={72} onClick={onClick} />
  </>
);

const SaveGame = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Text left={92} top={80} color="light" text="save game?" />
      <Yes onClick={() => {
        dispatch({ type: 'FADE_TO_MENU', payload: 'NONE' });
        dispatch({ type: 'SAVE_GAME' });
      }}
      />
      <No onClick={() => dispatch({ type: 'FADE_TO_MENU', payload: 'NONE' })} />
    </>
  );
};

export default SaveGame;
