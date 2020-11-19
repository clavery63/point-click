import React from 'react';
import { Image, Group, Rect } from 'react-konva';
import Text from '../shared/Text';

const InventoryItem = ({ item, index, onClick, using }) => {
  console.log(item)
  return <Group x={20} y={16 * index}>
    <Rect 
      x={10} 
      y={2} 
      width={8}
      height={8}
      fill={item.id === using ? 'black' : null}
      onClick={() => onClick(item.id)}
    />
    <Text left={20} top={2} text={item.name} />
  </Group>
};

const Inventory = ({ items, inventoryImg, using, onClick }) => {
  return (
    <Group x={137} y={16}>
      <Image
        width={110}
        height={134}
        image={inventoryImg}
      />
      {items.map((item, i) => (
        <InventoryItem
          key={i}
          item={item}
          index={i}
          onClick={onClick}
          using={using}
        />
      ))}
    </Group>
  );
};

export default Inventory;
