import React from 'react';
import { Nullable } from 'game/store/types';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
  options: string[];
};
const Selector = ({
  label, value, onChange, options,
}: Props) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={e => onChange(e.target.value as string)}
      >
        {options.map(option => (
          <MenuItem value={option} key={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selector;
