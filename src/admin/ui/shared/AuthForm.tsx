import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

type Props = {
  onSubmit: (pw: string) => void;
};
const AuthForm = (props: Props) => {
  const [pw, setPw] = useState('');
  const { onSubmit } = props;

  return (
    <>
      <TextField onChange={e => setPw(e.target.value)} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSubmit(pw)}
      >
        Submit
      </Button>

    </>
  );
};

export default AuthForm;
