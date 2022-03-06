import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setFlags } from 'admin/store/reducers/gameStateReducer/flagsReducer';
import LongTextField from '../shared/LongTextField';
import { useDispatch, useSelector } from '../hooks/redux';
import splitString from '../utils/splitString';

const Flags = () => {
  const dispatch = useDispatch();
  const flags = useSelector(state => state.gameState.flags);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Initial Flags:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="initial flags"
          value={flags.join(',')}
          onChange={str => {
            dispatch(setFlags(splitString(str) || []));
          }}
        />
      </Grid>
    </>
  );
};

export default Flags;
