import { useEffect, useState } from 'react';

const useCachebuster = (dependency: any) => {
  const [cachebuster, setCachebuster] = useState<number>(0);

  useEffect(() => {
    setCachebuster(Math.random() / 1000);
  }, [dependency]);

  return cachebuster;
};

export default useCachebuster;
