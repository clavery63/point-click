import {
  useCallback, useEffect, useRef,
} from 'react';

const useCommand = (char: string, callback: () => void) => {
  const cmdPressed = useRef(false);

  const keydown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Meta') {
      e.preventDefault();
      cmdPressed.current = true;
    }

    if (e.key === char) {
      if (cmdPressed.current) {
        e.preventDefault();
        callback();
      }
    }
  }, []);

  const keyup = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Meta') {
      e.preventDefault();
      cmdPressed.current = false;
    }
  }, []);

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
