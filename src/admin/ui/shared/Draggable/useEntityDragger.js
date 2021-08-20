import { useCallback, useState } from 'react';
import { SCALE } from '../../preview/constants';

const useEntityDragger = (position, callback) => {
  const [startXY, setStartXY] = useState(null);
  const [startPosition, setStartPositon] = useState(null);
  const [diff, setDiff] = useState(({ x: 0, y: 0 }));
  const [dragTarget, setDragTarget] = useState(null);

  const onMouseDown = useCallback(e => {
    setStartXY({ 
      x: e.clientX,
      y: e.clientY
    });
    setStartPositon(position);
    e.target.style.cursor = 'grabbing';
    e.target.style.zIndex = 420;
    setDragTarget(e.target);
  }, [callback, position]);

  const onMouseUp = useCallback(e => {
    dragTarget.style.cursor = 'pointer';
    dragTarget.style.zIndex = 0;
    setStartXY(null);
    setStartPositon(null);
    setDragTarget(null);
  }, [callback]);

  const onMouseMove = useCallback(e => {
    if (startXY) {
      const xDiff = Math.floor((e.clientX - startXY.x) / SCALE);
      const yDiff = Math.floor((e.clientY - startXY.y) / SCALE);
      if (xDiff !== diff.x || yDiff !== diff.y) {
        setDiff({ x: xDiff, y: yDiff })
        callback(startPosition.left + xDiff, startPosition.top + yDiff);
      }
    }
  }, [callback, startXY]);

  return {
    onMouseDown,
    onMouseUp,
    onMouseMove
  }
};

export default useEntityDragger;
