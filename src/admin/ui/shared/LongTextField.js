import React from 'react';
import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';

const LongTextField = ({ label, value, onChange }) => {
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
