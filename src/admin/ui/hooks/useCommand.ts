import { useCallback, useEffect, useState } from 'react';

const useCommand = (char: string, callback: () => void) => {
  const [cmdPressed, setCmdPressed] = useState(false);

  const keydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Meta') {
      e.preventDefault();
      setCmdPressed(true);
    }

    if (e.key === char) {
      if (cmdPressed) {
        e.preventDefault();
        callback();
      }
    }
  }, [cmdPressed]);

  const keyup = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Meta') {
      e.preventDefault();
      setCmdPressed(false);
    }
  }, [cmdPressed]);

  useEffect(() => {
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    return () => {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    };
  }, [keydown, keyup]);
};

export default useCommand;
