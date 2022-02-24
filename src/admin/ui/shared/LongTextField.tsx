import React from 'react';
import TextField from '@mui/material/TextField';
import { Nullable } from 'game/store/types';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
};
const LongTextField = ({ label, value, onChange }: Props) => {
  return (
    <TextField
      label={label}
      margin="normal"
      multiline
      fullWidth
      maxRows={6}
      value={value}
      onChange={e => onChange(e.target.value)}
      variant="outlined"
    />
  );
};

export default LongTextField;
