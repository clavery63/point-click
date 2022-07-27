import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { Rect } from 'shared/components/tappables';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const numFrames = 20; // First half fade out; second half fade in
const clampBy = 5; // Hold on black for this many frames (for both fade in and fade out)

const ceil = numFrames / 2;
const clampedCeil = ceil - clampBy;

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
    if (currentFrame === ceil && next) {
      dispatch({ type: 'SET_MENU', payload: { current: next, next } });
    }
    if (currentFrame === numFrames && next) {
      // We need to clear 'next' at the end of this
      dispatch({ type: 'SET_MENU', payload: { current: next } });
    }
  }, [currentFrame]);

  const inverseRelativeOpacity = Math.max(0, Math.abs(currentFrame - ceil));
  const clampedInverseRelativeOpacity = Math.max(0, inverseRelativeOpacity - clampBy);
  const clampedRelativeOpacity = clampedCeil - clampedInverseRelativeOpacity;
  const opacity = clampedRelativeOpacity / clampedCeil;

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
