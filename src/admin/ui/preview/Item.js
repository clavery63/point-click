import React from 'react';
import { Image } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';

const Item = ({ id }) => {
  const dispatch = useDispatch();
  const { img, position } = useSelector(state => {
    return state.gameState.worldState.items[id];
  });
  const image = useSelector(state => state.gameState.images[img]);

  return (
    <Image
      x={position.left}
      y={position.top}
      width={position.width}
      height={position.height}
      image={image}
      draggable
      onDragEnd={(e) => {
        dispatch({
          type: 'SET_ITEM_POSITION',
          payload: {
            id,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y())
          }
        })
      }}
    />
  );
};

export default Item;
