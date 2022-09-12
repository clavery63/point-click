const apiRoot = process.env.REACT_APP_API_BASE;

type ApiReturn = { result?: string; error?: string};
const api = async (route: string, name: string, pw: string): Promise<ApiReturn> => {
  const url = `${apiRoot}/${route}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name,
        pw,
      }),
    });

    if (!response.ok) {
      return { error: `Got a status code of ${response.status} calling ${route}` };
    }

    const result = await response.text();

    return { result };
  } catch (e: any) {
    return { error: e };
  }
};

export default api;
