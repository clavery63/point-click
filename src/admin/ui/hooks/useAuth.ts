import { useCallback, useState } from 'react';

const apiRoot = process.env.REACT_APP_API_BASE;

const useAuth = (name: string) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorize = useCallback(async (pw: string) => {
    const url = `${apiRoot}/verifyPw`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        pw,
      }),
    });
    const result: boolean = await response.json();
    setIsAuthorized(result);
  }, [name]);

  return { authorize, isAuthorized };
};

export default useAuth;
