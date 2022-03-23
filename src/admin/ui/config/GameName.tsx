import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setFriendlyName } from 'admin/store/reducers/gameStateReducer/configReducer/friendlyNameReducer';
import LongTextField from '../shared/LongTextField';
import { useDispatch, useSelector } from '../hooks/redux';

const GameName = () => {
  const dispatch = useDispatch();
  const gameName = useSelector(state => state.gameState.config.friendlyName);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Game Name:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="game name"
          value={gameName}
          onChange={str => {
            dispatch(setFriendlyName(str || ''));
          }}
        />
      </Grid>
    </>
  );
};

export default GameName;
