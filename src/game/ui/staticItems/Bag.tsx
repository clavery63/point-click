import React from 'react';
import { Image } from 'shared/components/tappables';
import { useDispatch, useSelector } from 'shared/hooks';

const SPRITE_WIDTH = 16;

const Bag = () => {
  // TODO NOW: allow this to just be an Item. This requires some sort of
  // conditional images
  const bagImg = useSelector(({ images }) => images.get('bag'));
  const time = useSelector(({ worldState }) => worldState.entities[74].time);
  const dispatch = useDispatch();
  return (
    <Image
      x={225}
      y={24}
      width={SPRITE_WIDTH}
      image={bagImg}
      onClick={() => dispatch({ type: 'SELECT_OBJECT', payload: 74 })}
      crop={{
        x: (time ?? 0) * SPRITE_WIDTH,
        width: SPRITE_WIDTH,
        height: bagImg?.height,
      }}
    />
  );
};

export default Bag;
