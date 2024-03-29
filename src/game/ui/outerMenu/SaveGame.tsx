import React from 'react';
import { useDispatch } from 'shared/hooks/redux';
import ClickText from '../shared/ClickText';
import Text from '../shared/Text';

const SaveGame = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Text left="centered" top={80} color="light" text="save game?" />
      <ClickText
        left="centered"
        top={120}
        color="light"
        text="yes"
        onClick={() => {
          dispatch({ type: 'FADE_TO_MENU', payload: 'NONE' });
          dispatch({ type: 'SAVE_GAME' });
        }}
      />
      <ClickText
        left="centered"
        top={100}
        color="light"
        text="no"
        onClick={() => dispatch({ type: 'FADE_TO_MENU', payload: 'NONE' })}
      />
    </>
  );
};

export default SaveGame;
