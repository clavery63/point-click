import React from 'react';
import { Image } from 'shared/components/tappables';

const Scenery = ({ object, onClick }) => {
  const { startPosition, currentPosition, img } = object;
  const position = currentPosition || startPosition;
  return (
    <Image
      x={position.left}
      y={position.top}
      width={startPosition.width}
      height={startPosition.height}
      image={img}
      onClick={() => onClick(object.id, 'scenery')}
    />
  );
};

export default Scenery;
