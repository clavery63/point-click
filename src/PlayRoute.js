import React from 'react';
import { useParams } from 'react-router-dom';
import GameRoot from './game/GameRoot';

const divStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'black'
};

const PlayRoute = () => {
  const { gameName } = useParams();

  return (
    <div style={divStyle}>
      <GameRoot gameName={gameName} />
    </div>
  );
};

export default PlayRoute;
