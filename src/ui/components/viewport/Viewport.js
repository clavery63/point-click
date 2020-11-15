import React from 'react';
import { Image, Group } from 'react-konva';

const Viewport = ({ onClick, borderImg }) => {

  return (
    <Group x={8} y={23}>
      <Image
        width={128}
        height={128}
        image={borderImg}
      />
    </Group>
  );
};

export default Viewport;
