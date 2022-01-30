import React from 'react';
import { Image } from 'shared/components/tappables';
import { GameStoreState } from 'game/store/types';
import { useDispatch, useSelector } from 'shared/hooks';

const SHEET_WIDTH = 5;
const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 20;

const bagSelector = ({ images, playerState }: GameStoreState) => {
  return {
    bagImg: images.get('bag'),
    bagLevel: playerState.timer,
  };
};

const Bag = () => {
  const { bagLevel, bagImg } = useSelector(bagSelector);
  const dispatch = useDispatch();
  return (
    <Image
      x={88}
      y={8}
      width={SPRITE_WIDTH}
      height={SPRITE_HEIGHT}
      image={bagImg}
      onClick={() => dispatch({ type: 'SELECT_BAG', payload: bagLevel })}
      crop={{
        x: (bagLevel % SHEET_WIDTH) * SPRITE_WIDTH,
        y: Math.floor(bagLevel / SHEET_WIDTH) * SPRITE_HEIGHT,
        width: SPRITE_WIDTH,
        height: SPRITE_HEIGHT,
      }}
    />
  );
};

export default Bag;
