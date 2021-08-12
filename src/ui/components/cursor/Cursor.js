import React from 'react';
import { Image } from 'react-konva';

const Cursor = ({ cursor, cursorImg }) => {
  if (!cursor?.enabled || !cursor?.position) {
    return null;
  }

  // TODO: looks like we're able to click even when it's invisible...

  return (
    <Image
      width={9}
      height={16}
      x={cursor.position.x - 3}
      y={cursor.position.y - 1}
      image={cursorImg}
      listening={false}
    />
  );
};

export default Cursor;
