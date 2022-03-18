import { Item } from 'game/store/types';
import { useState, useEffect } from 'react';

const MS_PER_FRAME = 40;

/**
 * Once we have more than one of these, each will get its own hook that gets
 * called from useCapabilities
 */
const useCapabilities = (item: Item, image?: HTMLImageElement) => {
  const [flip, setFlip] = useState(0);

  const { position: { left = 0 } = {} } = item;

  useEffect(() => {
    let interval: any;
    if (item.capabilities?.includes('RAND_HORIZ')) {
      interval = setInterval(() => {
        setFlip(Math.floor(Math.random() * 2));
      }, MS_PER_FRAME);
    }
    return () => clearInterval(interval);
  }, []);

  return {
    x: left + flip * (image?.width ?? 0),
    scaleX: 1 + flip * -2,
  };
};

export default useCapabilities;
