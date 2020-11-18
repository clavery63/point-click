import React from 'react';
import { Group, Image } from 'react-konva';

const MiniMap = ({ onClick, doors, menuButtonImg }) => {
  return (
    <Group x={8} y={16}>
      {doors.map(door => (
        <Image
          key={door.id}
          x={door.position.x * 8}
          y={ door.position.y * 8}
          onClick={() => onClick(door.id)}
          image={menuButtonImg}
        />
      ))}
    </Group>
  );
};

export default MiniMap;
