import React from 'react';
import { Image } from 'react-konva';

const Door = ({ object, onClick}) => {
  const { position, openImg, closedImg, state } = object;
  return (
    <Image
      x={position.left}
      y={position.top}
      width={position.width}
      height={position.height}
      image={state === 'OPEN' ? openImg : closedImg}
      onClick={() => onClick(object.id, 'doors')}
    />
  );
};

export default Door;
