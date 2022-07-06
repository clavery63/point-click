import { useCallback, useState } from 'react';

const apiRoot = process.env.REACT_APP_API_BASE;

const useAuth = (name: string) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorize = useCallback(async (pw: string) => {
    const url = `${apiRoot}/verifyPw`;
    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        pw,
      }),
    });
    console.log(result);
  }, [name]);

  return { authorize, isAuthorized };
};

export default useAuth;
