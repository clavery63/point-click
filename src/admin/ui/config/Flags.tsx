import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { setFlags } from 'admin/store/reducers/gameStateReducer/flagsReducer';
import { compact, uniq } from 'lodash';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Flag } from 'game/store/types';
import { RootState, useDispatch, useSelector } from '../hooks/redux';

const filter = createFilterOptions<FlagOption>();

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

const toFlagOption = (flag: Flag) => ({
  value: flag,
  label: flag,
});

type FlagOption = {
  value: Flag;
  label: string;
};

const Flags = () => {
  const dispatch = useDispatch();
  const flags = useSelector(state => state.gameState.flags);
  const allFlags = useSelector(flagsSelector);

  const seedOptions = allFlags.map(toFlagOption);
  const seedValue = flags.map(toFlagOption);

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
          options={seedOptions}
          filterSelectedOptions
          value={seedValue}
          onChange={(e, newFlags) => {
            dispatch(setFlags(newFlags.map(({ value }) => value)));
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            const isExisting = [...options, ...seedValue]
              .map(({ value }) => value)
              .includes(inputValue);

            if (inputValue !== '' && !isExisting) {
              const newFlag = inputValue.toUpperCase().replaceAll(/\s+/g, '_');
              filtered.push({
                value: newFlag,
                label: `Add "${newFlag}"`,
              });
            }

            return filtered;
          }}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(a, b) => a.value === b.value}
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
