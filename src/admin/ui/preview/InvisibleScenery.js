import React from 'react';
import { Rect } from 'react-konva';
import useCachebuster from '../hooks/useCachebuster';

const InisibleScenery = ({ position, onDragEnd }) => {
  const cachebuster = useCachebuster(position);

  return (
    <Rect
      x={position.left + cachebuster}
      y={position.top + cachebuster}
      width={position.width}
      height={position.height}
      fill='red'
      opacity={0.7}
      draggable
      onDragEnd={onDragEnd}
    />
  );
};

export default InisibleScenery;
