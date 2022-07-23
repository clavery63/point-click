import React from 'react';
import { compact, uniq } from 'lodash';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Flag } from 'game/store/types';
import { RootState, useSelector } from '../hooks/redux';

const filter = createFilterOptions<FlagOption>();

const flagsSelector = (state: RootState) => {
  const { worldState, flags } = state.gameState;
  const { entities, doors } = worldState;

  const doorFlags = Object.values(doors)
    .flatMap(({ openCondition }) => openCondition);

  const entityFlags = Object.values(entities)
    .flatMap(({ visibleFlags = [], takeableFlags = [] }) => [...visibleFlags, ...takeableFlags]);

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

type Props = {
  value?: Flag[];
  onChange: (f: Flag[]) => void;
  label: string;
};

const FlagsInput = (props: Props) => {
  const { value: propsValue = [], onChange, label } = props;
  const allFlags = useSelector(flagsSelector);
  const seedOptions = allFlags.map(toFlagOption);
  const seedValue = propsValue.map(toFlagOption);

  return (
    <Autocomplete
      sx={{ mt: 2, mb: 2 }}
      multiple
      disableClearable
      options={seedOptions}
      filterSelectedOptions
      value={seedValue}
      onChange={(e, newFlags) => {
        onChange(newFlags.map(({ value }) => value));
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
          label={label}
          placeholder="choose a flag"
        />
      )}
    />
  );
};

export default FlagsInput;
