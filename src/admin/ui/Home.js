import React from 'react';
import GameRoot from '../../game/GameRoot';

const Home = ({ gameName }) => {

  return (
    <div>
      <div>GameName: {gameName}</div>
      <GameRoot gameName={gameName} />
    </div>
  );
};

export default Home;
