import React from 'react';
import GameRoot from '../../../game/GameRoot';

const Home = ({ gameName, counter, incrementCounter }) => {
  return (
    <div>
      <div>GameName: {gameName}</div>
      <div>count: {counter}</div>
      <button onClick={incrementCounter}>INCREMENT</button>
      <GameRoot gameName={gameName} />
    </div>
  );
};

export default Home;
