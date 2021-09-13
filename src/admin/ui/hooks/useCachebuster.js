import { useEffect, useState } from 'react';

const useCachebuster = (dependency) => {
  const [cachebuster, setCachebuster] = useState(null);

  useEffect(() => {
    setCachebuster(Math.random() / 1000);
  }, [dependency]);

  return cachebuster;
}

export default useCachebuster;
