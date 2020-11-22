import React from 'react';
import { Image } from 'react-konva';

const Item = ({ object, onClick}) => {
  const { position, img } = object;
  return (
    <Image
      x={position.left}
      y={position.top}
      width={position.width}
      height={position.height}
      image={img}
      onClick={() => onClick(object.id, 'items')}
    />
  );
};

export default Item;
