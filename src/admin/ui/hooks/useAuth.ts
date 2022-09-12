import api from 'admin/api';
import { useCallback, useEffect, useState } from 'react';

export enum AuthState {
  LOADING,
  UNKNOWN,
  CHECKING,
  AUTHORIZED,
  UNAUTHORIZED,
}

const authorize = async (name: string, pw: string) => {
  const { result, error } = await api('verifyPw', name, pw);
  if (error || !result) {
    return false;
  }
  return JSON.parse(result);
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
