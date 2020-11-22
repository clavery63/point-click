import React from 'react';
import { Image } from 'react-konva';

const Door = ({ object, onClick}) => {
  const { position, img, state } = object;
  return (
    <Image
      x={position.left}
      y={position.top}
      width={position.width}
      height={position.height}
      image={state === 'OPEN' ? null : img}
      onClick={() => onClick(object.id, 'doors')}
    />
  );
};

export default Door;
