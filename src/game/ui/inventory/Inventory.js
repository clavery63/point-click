import React from 'react';
import { Image, Group,  } from 'react-konva';
import { Rect } from 'shared/components/tappables';
import Torches from './Torches';
import Bag from './Bag';
import Text from '../shared/Text';

const InventoryItem = ({ item, index, onClick, using }) => {
  return <Group x={15} y={21 + 16 * index}>
    <Rect
      x={0}
      y={2}
      width={8}
      height={8}
      fill={item.id === using ? 'black' : null}
      onClick={() => onClick(item.id)}
    />
    <Text left={9} top={3} text={item.name} />
  </Group>
};

const Inventory = ({ items, inventoryImg, using, examining, onClick }) => {
  // We can strongly type action dispatching if we move to the useDispatch hook:
  // const dispatch = useDispatch<Dispatch<NumberAction>>();
  // dispatch(({ type: 'SET_FRAME', payload: 8}))

  const text = examining?.name || 'GOODS';
  const currentList = examining?.contains || items;
  return (
    <Group x={137} y={16}>
      <Image
        width={110}
        height={134}
        image={inventoryImg}
      />
      <Text left={24} top={8} text={text} />
      <Torches />
      <Bag />
      {currentList.map((item, i) => (
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
