import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setFlags } from 'admin/store/reducers/gameStateReducer/flagsReducer';
import { compact, uniq } from 'lodash';
import { Autocomplete, TextField } from '@mui/material';
import { RootState, useDispatch, useSelector } from '../hooks/redux';

const flagsSelector = (state: RootState) => {
  const { worldState, flags } = state.gameState;
  const { entities, doors } = worldState;

  const doorFlags = Object.values(doors)
    .flatMap(({ openCondition }) => [openCondition]);

  const entityFlags = Object.values(entities)
    .flatMap(({ visibleFlag, takeableFlag }) => [visibleFlag, takeableFlag]);

  const verbFlags = [...Object.values(entities), ...Object.values(doors)]
    .flatMap(({ verbs }) => Object.values(verbs || {}).flat())
    .flatMap(({ addFlags = [], removeFlags = [], prereqFlags = [] }) => [
      ...addFlags, ...removeFlags, ...prereqFlags,
    ]);

  const allFlags = compact([...flags, ...doorFlags, ...entityFlags, ...verbFlags]);

  return uniq(allFlags).sort();
};

const Flags = () => {
  const dispatch = useDispatch();
  const flags = useSelector(state => state.gameState.flags);
  const allFlags = useSelector(flagsSelector);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Edit Initial Flags:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          disableClearable
          id="tags-outlined"
          options={allFlags}
          filterSelectedOptions
          value={flags}
          onChange={(e, newFlags) => dispatch(setFlags(newFlags))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="initial flags"
              placeholder="add a flag"
            />
          )}
        />
      </Grid>
    </>
  );
};

export default Flags;
