import React from 'react';
import { Nullable } from 'game/store/types';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select } from '@mui/material';

export const makeOptions = (options: string[]) => {
  return options.map(option => ({ value: option, label: option }));
};

const isEmpty = (value: any) => value === undefined || value === null;

type Option = { value: string | number; label: string };

type Props = {
  label: string;
  value: Nullable<string | number>;
  onChange: (value: any) => void;
  options: Option[];
  required?: boolean;
  style?: React.CSSProperties;
};
const Selector = ({
  label, value, onChange, options, required = false, style,
}: Props) => {
  return (
    <FormControl variant="outlined" style={{ minWidth: 120 }} margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        value={isEmpty(value) ? '' : value}
        label={label}
        onChange={e => {
          if (e.target.value === '') {
            onChange(undefined);
          } else {
            onChange(e.target.value);
          }
        }}
        style={style}
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
