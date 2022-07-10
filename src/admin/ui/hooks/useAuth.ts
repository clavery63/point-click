import { useCallback, useEffect, useState } from 'react';

const apiRoot = process.env.REACT_APP_API_BASE;

export enum AuthState {
  LOADING,
  UNKNOWN,
  CHECKING,
  AUTHORIZED,
  UNAUTHORIZED,
}

const authorize = async (name: string, pw: string) => {
  const url = `${apiRoot}/verifyPw`;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      name,
      pw,
    }),
  });
  const result: boolean = await response.json();
  return result;
};

const useAuth = (name: string) => {
  const [authState, setAuthState] = useState(AuthState.LOADING);

  const userAuth = useCallback(async (pw: string) => {
    setAuthState(AuthState.CHECKING);
    const result = await authorize(name, pw);
    if (result) {
      setAuthState(AuthState.AUTHORIZED);
    } else {
      setAuthState(AuthState.UNAUTHORIZED);
    }
  }, [name]);

  useEffect(() => {
    const initialAuth = async () => {
      const result = await authorize(name, '');
      if (result) {
        setAuthState(AuthState.AUTHORIZED);
      } else {
        setAuthState(AuthState.UNKNOWN);
      }
    };
    initialAuth();
  }, []);

  return { authorize: userAuth, authState, setAuthState };
};

export default useAuth;
