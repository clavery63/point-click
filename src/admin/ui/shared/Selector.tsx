import React, { ChangeEvent } from 'react';
import { Nullable } from 'game/store/types';
import FormControl from '@material-ui/core/FormControl';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (e: ChangeEvent<any>) => void;
  options: string[];
};
const Selector = ({
  label, value, onChange, options,
}: Props) => {
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
