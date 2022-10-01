import React from 'react';
import { compact, uniq } from 'lodash';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Flag } from 'game/store/types';
import { createSelector } from 'reselect';
import { RootState, useSelector } from '../hooks/redux';
import WithTooltip from './WithTooltip';

const filter = createFilterOptions<FlagOption>();

const selectEntities = (state: RootState) => state.gameState.present.worldState.entities;
const selectDoors = (state: RootState) => state.gameState.present.worldState.doors;
const selectDialogs = (state: RootState) => state.gameState.present.worldState.dialogs;
const selectFlags = (state: RootState) => state.gameState.present.flags;
const dialogPagesSelector = createSelector(selectDialogs, dialogs => {
  return Object.values(dialogs).flatMap(({ pages }) => pages);
});

const flagsSelector = createSelector(
  selectEntities,
  selectDoors,
  dialogPagesSelector,
  selectFlags,

  (entities, doors, dialogPages, flags) => {
    const doorFlags = Object.values(doors)
      .flatMap(({ openCondition }) => openCondition);

    const entityFlags = Object.values(entities)
      .flatMap(({ visibleFlags = [], takeableFlags = [] }) => [...visibleFlags, ...takeableFlags]);

    const dialogFlags = dialogPages.flatMap(({ prereqFlags = [], answers }) => [
      ...prereqFlags, ...answers.flatMap(({ addFlags = [], removeFlags = [] }) => [
        ...addFlags, ...removeFlags,
      ]),
    ]);

    const verbFlags = [...Object.values(entities), ...Object.values(doors)]
      .flatMap(({ verbs }) => Object.values(verbs || {}).flat())
      .flatMap(({ addFlags = [], removeFlags = [], prereqFlags = [] }) => [
        ...addFlags, ...removeFlags, ...prereqFlags,
      ]);

    const allFlags = compact([
      ...flags,
      ...doorFlags,
      ...entityFlags,
      ...verbFlags,
      ...dialogFlags,
    ]);

    return uniq(allFlags).sort();
  },
);

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
  tooltip?: string;
};

const FlagsInput = React.memo((props: Props) => {
  const {
    value: propsValue = [], onChange, label, tooltip,
  } = props;
  const allFlags = useSelector(flagsSelector);
  const seedOptions = allFlags.map(toFlagOption);
  const seedValue = propsValue.map(toFlagOption);

  return (
    <WithTooltip text={tooltip}>
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
    </WithTooltip>
  );
});

export default FlagsInput;
