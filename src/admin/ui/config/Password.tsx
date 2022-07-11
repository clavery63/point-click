import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';

const apiRoot = process.env.REACT_APP_API_BASE;

enum Status {
  NONE,
  PENDING,
  SUCCESS,
  FAILURE
}

const updatePw = async (
  name: string,
  pw: string,
  setStatus: React.Dispatch<React.SetStateAction<Status>>,
) => {
  setStatus(Status.PENDING);
  const url = `${apiRoot}/updateGame`;
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        pw,
      }),
    });
    setStatus(Status.SUCCESS);
  } catch (e) {
    console.log(e);
    setStatus(Status.FAILURE);
  }
};

type Props = {
  gameName: string;
};
const Password = (props: Props) => {
  const { gameName } = props;
  const [pw, setPw] = useState('');
  const [status, setStatus] = useState(Status.NONE);

  const handleSubmit = useCallback(() => {
    updatePw(gameName, pw, setStatus);
  }, [gameName, pw, setStatus]);

  const errorMsg = useMemo(() => {
    if (status === Status.FAILURE) {
      return 'Noooo. The password didn\'t update.';
    }
    return '';
  }, [status]);

  const buttonText = useMemo(() => {
    if (status === Status.SUCCESS) {
      return 'Password Saved!';
    }
    return 'Save Password';
  }, [status]);

  useEffect(() => {
    setStatus(Status.NONE);
  }, [pw]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">
          Update Password:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={pw}
          margin="normal"
          name="password"
          label="Password"
          onChange={e => setPw(e.target.value)}
          error={!!errorMsg}
          helperText={errorMsg}
        />
        <LoadingButton
          disabled={status !== Status.NONE}
          loading={status === Status.PENDING}
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2, ml: 2 }}
          onClick={handleSubmit}
        >
          {buttonText}
        </LoadingButton>
      </Grid>
    </>
  );
};

export default Password;
