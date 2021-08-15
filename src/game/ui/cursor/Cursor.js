import React, { useState, useEffect } from 'react';
import { Image } from 'react-konva';
import cursor$ from './cursorStream';

const Cursor = ({ cursorEnabled, cursorImg, stageData }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const subscription = cursor$(stageData).subscribe(newPosition => {
      setPosition(newPosition);
    });

    return () => subscription.unsubscribe();
  }, [stageData])

  if (!position) {
    return null;
  }

  return (
    <Image
      width={9}
      height={16}
      x={position?.x - 3}
      y={position?.y - 1}
      image={cursorEnabled ? cursorImg : null}
      listening={!cursorEnabled}
    />
  );
};

export default Cursor;
