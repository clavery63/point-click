import React from 'react';
import { Image } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';

const Scenery = ({ id, editing = 'startPosition' }) => {
  const dispatch = useDispatch();
  const scenery = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });
  const image = useSelector(state => state.gameState.images[scenery.img]);

  const position = scenery[editing];

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
          type: 'SET_SCENERY_POSITION',
          payload: {
            id,
            field: editing,
            x: Math.round(e.target.x()),
            y: Math.round(e.target.y())
          }
        })
      }}
    />
  );
};

export default Scenery;
