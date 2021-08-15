import React from 'react';
import { useParams } from 'react-router-dom';
import GameRoot from './game/GameRoot';

const PlayRoute = () => {
  const { gameName } = useParams();

  return <GameRoot gameName={gameName} />;
};

export default PlayRoute;
