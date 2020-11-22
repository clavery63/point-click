import React from 'react';
import { Image } from 'react-konva';

const Inventory = ({ cursor, cursorImg }) => {
  return (
    <Image
      width={9}
      height={16}
      x={cursor.position.x - 3}
      y={cursor.position.y - 1}
      image={cursor.enabled ? cursorImg : null}
      listening={cursor.enabled ? false : true}
    />
  );
};

export default Inventory;
