import React from 'react';
import { Image } from 'react-konva';
import { useSelector } from 'react-redux';
import useCachebuster from '../hooks/useCachebuster';

const VisibleScenery = ({ scenery, position, onDragEnd, onClick }) => {
  const image = useSelector(state => state.gameState.images.get(scenery.img));
  const cachebuster = useCachebuster(position);

  return (
    <Image
      x={position.left + cachebuster}
      y={position.top + cachebuster}
      width={position.width}
      height={position.height}
      image={image}
      draggable
      onDragEnd={onDragEnd}
      onClick={onClick}
    />
  );
};

export default VisibleScenery;
