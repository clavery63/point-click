/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import useAuth, { AuthState } from '../hooks/useAuth';

type Props = {
  gameName: string;
  children: React.ReactElement;
};
const AuthGate = (props: Props) => {
  const { children, gameName } = props;
  const { authorize, authState, setAuthState } = useAuth(gameName);
  const [pw, setPw] = useState('');

  const handleSubmit = () => {
    authorize(pw);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    setAuthState(AuthState.UNKNOWN);
  };

  if (authState === AuthState.LOADING) {
    return <LinearProgress />;
  }

  if (authState === AuthState.AUTHORIZED) {
    return children;
  }

  const errorMsg = authState === AuthState.UNAUTHORIZED ? 'Ugh, this sucks. The password is wrong.' : null;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" textAlign="center">
          editing
          {' '}
          <b>{gameName}</b>
          {' '}
          requires a password
        </Typography>
        <TextField
          value={pw}
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          onChange={handleTextChange}
          error={!!errorMsg}
          helperText={errorMsg}
        />
        <LoadingButton
          loading={authState === AuthState.CHECKING}
          loadingPosition="end"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default AuthGate;
