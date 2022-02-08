import React, { ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { Nullable } from 'game/store/types';
import useStyles from './useStyles';

type Props = {
  label: string;
  value: Nullable<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
      onChange={onChange}
      variant="outlined"
    />
  );
};

export default LongTextField;
