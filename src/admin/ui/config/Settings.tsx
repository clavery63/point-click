import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setVerbNames } from 'admin/store/reducers/gameStateReducer/verbNamesReducer';
import { Nullable } from 'game/store/types';
import { useDispatch, useSelector } from '../hooks/redux';
import LongTextField from '../shared/LongTextField';

const NUM_VERBS = 9;

const Settings = () => {
  const dispatch = useDispatch();
  const allVerbs = useSelector(state => state.gameState.verbNames);

  const handleChange = (value: Nullable<string>) => {
    const verbs = value?.split(',');
    if (!verbs || verbs.length !== NUM_VERBS) {
      console.log(`Must provide ${NUM_VERBS} verb names`);
      return;
    }
    for (let i = 0; i < verbs.length; i++) {
      if (verbs[i].length < 1) {
        console.log('Each verb must contain at least 1 character.');
        return;
      }
      if (verbs[i].length > 5) {
        console.log('Each verb must contain at most 5 characters.');
        return;
      }
    }

    dispatch(setVerbNames(verbs));
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Settings:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LongTextField
          label="verb names"
          value={allVerbs.join(',')}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};

export default Settings;
