import React from 'react';
import { Group } from 'react-konva';
import { Image } from 'shared/components/tappables';

const MiniMap = ({ onClick, doors, menuButtonImg }) => {
  return (
    <Group x={8} y={16}>
      {doors.map(door => (
        <Image
          key={door.id}
          x={door.mapPosition.x * 8}
          y={door.mapPosition.y * 8}
          onClick={() => onClick(door.id)}
          image={menuButtonImg}
        />
      ))}
    </Group>
  );
};

export default MiniMap;
