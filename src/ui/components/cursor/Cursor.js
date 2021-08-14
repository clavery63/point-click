import React, { useState, useEffect } from 'react';
import { Image } from 'react-konva';
import cursor$ from './cursorStream';

const Cursor = ({ cursorEnabled, cursorImg, enableCursor, stageData }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const subscription = cursor$(stageData).subscribe(newPosition => {
      if (!position) {
        enableCursor();
      }
      setPosition(newPosition);
    });

    return () => subscription.unsubscribe();
  }, [stageData])

  if (!cursorEnabled || !position) {
    return null;
  }

  // TODO: looks like we're able to click even when it's invisible...

  return (
    <Image
      width={9}
      height={16}
      x={position?.x - 3}
      y={position?.y - 1}
      image={cursorImg}
      listening={false}
    />
  );
};

export default Cursor;
