import React from 'react';
import { Nullable } from 'game/store/types';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

export const makeOptions = (options: string[]) => {
  return options.map(option => ({ value: option, label: option }));
};

type Option = { value: string | number; label: string };

type Props = {
  label: string;
  value: Nullable<string | number>;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
};
const Selector = ({
  label, value, onChange, options, required = false,
}: Props) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }} margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={e => onChange(e.target.value as string)}
      >
        {!required && <MenuItem value="" key=""><em>none</em></MenuItem>}
        {options.map(option => (
          <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
