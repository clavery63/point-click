import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import React from 'react';
import useStyles from '../shared/useStyles';
import Player from './Player';
import Flags from './Flags';
import Settings from './Settings';

const ConfigPage = () => {
  const styles = useStyles();
  return (
    <Box className={styles.leftColumn}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">
            Edit Game Config:
          </Typography>
        </Grid>
        <Player />
        <Flags />
        <Settings />
      </Grid>
    </Box>
  );
};

export default ConfigPage;
