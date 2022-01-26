import React from 'react';
import { Image } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';
import useCachebuster from '../hooks/useCachebuster';

const Item = ({ id }) => {
  const dispatch = useDispatch();
  const { img, position } = useSelector(state => {
    return state.gameState.worldState.items[id];
  });
  const image = useSelector(state => state.gameState.images.get(img));
  const cachebuster = useCachebuster(position);

  return (
    <Image
      x={position.left + cachebuster}
      y={position.top + cachebuster}
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
      onClick={(e) => {
        dispatch({
          type: 'SET_SELECTED',
          payload: {
            id,
            type: 'item'
          }
        })
      }}
    />
  );
};

export default Item;
