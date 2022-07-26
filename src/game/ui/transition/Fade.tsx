import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { Rect } from 'shared/components/tappables';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const frame$ = () => interval(60).pipe(
  takeWhile((frame: number) => frame <= 20),
);

const Fade = () => {
  const dispatch = useDispatch();
  const { next } = useSelector(state => state.menu);
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  useEffect(() => {
    const subscription = frame$().subscribe((frame: number) => {
      if (!next) {
        return;
      }
      setCurrentFrame(frame);
    });

    return () => subscription.unsubscribe();
  }, [next]);

  useEffect(() => {
    if (currentFrame === 10 && next) {
      dispatch({ type: 'SET_MENU', payload: next });
    }
  }, [currentFrame]);

  if (!next) {
    return null;
  }

  const opacity = (7 - Math.max(0, Math.abs(currentFrame - 10) - 3)) / 7;

  if (opacity === 0) {
    return null;
  }

  return (
    <Rect
      width={256}
      height={240}
      fill="black"
      opacity={opacity}
    />
  );
};

export default Fade;
