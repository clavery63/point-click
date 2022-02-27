import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import useStyles from '../shared/useStyles';
import Player from './Player';
import Flags from './Flags';
import Settings from './Settings';
import UploadButton from '../shared/UploadButton';
import EntityDetails from '../rooms/EntityDetails';

const ConfigPage = () => {
  const styles = useStyles();
  return (
    <>
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
        <Stack direction="row" spacing={2}>
          <UploadButton />
        </Stack>
      </Box>
      <Box className={styles.rightColumn}>
        <EntityDetails />
      </Box>
    </>
  );
};

export default ConfigPage;
