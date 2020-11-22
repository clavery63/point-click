import React from 'react';
import { Image } from 'react-konva';

const Inventory = ({ cursor, cursorImg }) => {
  return (
    <Image
      width={8}
      height={16}
      x={cursor.x - 2}
      y={cursor.y - 1}
      image={cursorImg}
      listening={false}
    />
  );
};

export default Inventory;
