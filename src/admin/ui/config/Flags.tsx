import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setFlags } from 'admin/store/reducers/gameStateReducer/flagsReducer';
import { useDispatch, useSelector } from '../hooks/redux';
import FlagsInput from '../shared/FlagsInput';

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
        <FlagsInput
          label="initial flags"
          value={flags}
          onChange={newFlags => dispatch(setFlags(newFlags))}
        />
      </Grid>
    </>
  );
};

export default Flags;
