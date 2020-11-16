import React from 'react';
import { Image, Group } from 'react-konva';

const Inventory = ({ inventoryImg }) => {
  return (
    <Group x={137} y={16}>
      <Image
        width={110}
        height={134}
        image={inventoryImg}
      />
    </Group>
  );
};

export default Inventory;
