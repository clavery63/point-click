import React from 'react';
import { Rect } from 'react-konva';

const Viewport = ({ fill, width, onClick }) => {
  return (
    <Rect 
      x={20} 
      y={20} 
      width={width} 
      height={200} 
      fill={fill}
      onClick={onClick}
    />
  );
};

Viewport.defaultProps = {
  fill: 'green',
  width: 20
};

export default Viewport;
