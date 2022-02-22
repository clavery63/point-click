import React from 'react';
import TextField from '@mui/material/TextField';
import { Nullable } from 'game/store/types';
import useStyles from './useStyles';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (value: string) => void;
};
const LongTextField = ({ label, value, onChange }: Props) => {
  const styles = useStyles();
  return (
    <TextField
      label={label}
      className={styles.field}
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
