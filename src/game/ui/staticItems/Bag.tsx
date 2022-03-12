import React from 'react';
import { Image } from 'shared/components/tappables';
import { GameStoreState } from 'game/store/types';
import { useDispatch, useSelector } from 'shared/hooks';

const SPRITE_WIDTH = 16;

const bagSelector = ({ images, playerState }: GameStoreState) => {
  return {
    bagImg: images.get('bag'),
    // TODO NOW: this should actually be the item-specific timer
    bagLevel: playerState.timer,
  };
};

const Bag = () => {
  const { bagLevel, bagImg } = useSelector(bagSelector);
  const dispatch = useDispatch();
  return (
    <Image
      x={225}
      y={24}
      width={SPRITE_WIDTH}
      image={bagImg}
      onClick={() => dispatch({ type: 'SELECT_BAG', payload: bagLevel })}
      crop={{
        x: bagLevel * SPRITE_WIDTH,
        width: SPRITE_WIDTH,
        height: bagImg?.height,
      }}
    />
  );
};

export default Bag;
