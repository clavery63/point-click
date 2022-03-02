import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import useStyles from '../shared/useStyles';
import Player from './Player';
import Flags from './Flags';
import Settings from './Settings';
import UploadButton from '../shared/UploadButton';
import EntityDetails from '../rooms/EntityDetails';

const ConfigPage = () => {
  const { gameName } = useParams<{ gameName: string }>();
  const styles = useStyles();
  return (
    <>
      <Box className={styles.leftColumn}>
        <Grid container>
          <Grid item xs={12}>
            <Link to={`/admin/${gameName}`}>
              <Button
                startIcon={<ArrowBack>back</ArrowBack>}
              >
                To Home
              </Button>
            </Link>
          </Grid>
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
