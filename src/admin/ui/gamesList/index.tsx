import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import S3 from 'shared/util/S3';
import CreateGameButton from './CreateGameButton';

const GamesList = () => {
  const [gameNames, setGameNames] = useState<string[]>([]);

  useEffect(() => {
    document.title = 'Admin';
    const getGameNames = async () => {
      const s3 = new S3();
      const prefixes = await s3.listPrefixes();
      setGameNames(prefixes);
    };
    getGameNames();
  }, []);

  return (
    <Box>
      <Typography variant="h3">
        Games:
      </Typography>
      {gameNames.map(gameName => (
        <Link key={gameName} to={`admin/${gameName}`}>{gameName}</Link>
      ))}
      <CreateGameButton />
    </Box>
  );
};

export default GamesList;