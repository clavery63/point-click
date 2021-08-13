import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import GameContainer from './GameContainer';

const PlayRoute = ({ bootGame }) => {
  const { gameName } = useParams();

  useEffect(() => {
    bootGame(gameName);
  }, [gameName]);

  return <GameContainer />;
};

const mapDispatchToProps = {
  bootGame: gameName => ({ type: 'BOOT_GAME', gameName })
};

export default connect(() => ({}), mapDispatchToProps)(PlayRoute);
