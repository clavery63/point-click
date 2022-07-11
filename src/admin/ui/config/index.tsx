import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import useStyles from '../shared/useStyles';
import Player from './Player';
import Flags from './Flags';
import EntityDetails from '../rooms/EntityDetails';
import GameName from './GameName';
import Password from './Password';

const ConfigPage = () => {
  const { gameName } = useParams<{ gameName: string }>();
  const styles = useStyles();
  return (
    <>
      <Box className={styles.leftColumn}>
        <Grid container>
          <GameName />
          <Password gameName={gameName} />
          <Player />
          <Flags />
        </Grid>
      </Box>
      <Box className={styles.rightColumn}>
        <EntityDetails />
      </Box>
    </>
  );
};

export default ConfigPage;
