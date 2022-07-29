import React from 'react';
import Text from '../shared/Text';
import Title from './Title';

const GameOver = () => {
  return (
    <>
      <Text left="centered" top={60} color="light" text="game over" />
      <Title fadeOnStart={false} />
    </>
  );
};

export default GameOver;
