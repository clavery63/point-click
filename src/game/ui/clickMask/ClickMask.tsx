import { GameStoreState } from 'game/store/types';
import React from 'react';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { Rect } from 'shared/components/tappables';

const selector = (state: GameStoreState) => {
  const { text, worldState, playerState } = state;
  const room = worldState.rooms[playerState.room];
  const shouldShow = !!text.lines || !!room.gameOver;
  return {
    shouldShow,
  };
};

const ClickMask = () => {
  const { shouldShow } = useSelector(selector);
  const dispatch = useDispatch();

  if (!shouldShow) {
    return null;
  }

  return (
    <Rect
      width={256}
      height={240}
      onClick={() => dispatch({ type: 'PAGE_CLICK' })}
    />
  );
};

export default ClickMask;
