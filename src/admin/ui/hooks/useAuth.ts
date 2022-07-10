import { useCallback, useState } from 'react';

const apiRoot = process.env.REACT_APP_API_BASE;

export enum AuthState {
  UNKNOWN,
  CHECKING,
  AUTHORIZED,
  UNAUTHORIZED,
}

const useAuth = (name: string) => {
  const [authState, setAuthState] = useState(AuthState.UNKNOWN);

  const authorize = useCallback(async (pw: string) => {
    setAuthState(AuthState.CHECKING);
    const url = `${apiRoot}/verifyPw`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        pw,
      }),
    });
    const result: boolean = await response.json();
    if (result) {
      setAuthState(AuthState.AUTHORIZED);
    } else {
      setAuthState(AuthState.UNAUTHORIZED);
    }
  }, [name]);

  return { authorize, authState, setAuthState };
};

export default useAuth;
