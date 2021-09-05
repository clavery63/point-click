import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import { useSelector, useDispatch } from 'react-redux';

const Scenery = ({ id, editing = 'startPosition' }) => {
  const [cachebuster, setCachebuster] = useState(null);
  const dispatch = useDispatch();
  const scenery = useSelector(state => {
    return state.gameState.worldState.scenery[id];
  });
  const image = useSelector(state => state.gameState.images[scenery.img]);

  const position = scenery[editing];

  useEffect(() => {
    // This forces a rerender on drag and resize
    setCachebuster(Math.random() / 1000);
  }, [position]);

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
