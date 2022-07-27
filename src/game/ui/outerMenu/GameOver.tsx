import React from 'react';
import Text from '../shared/Text';
import Title from './Title';

const GameOver = () => {
  return (
    <>
      <Text left={92} top={60} color="light" text="game over" />
      <Title />
    </>
  );
};

export default GameOver;
