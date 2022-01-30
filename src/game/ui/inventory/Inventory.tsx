import React from 'react';
import { Image, Group,  } from 'react-konva';
import { Rect } from 'shared/components/tappables';
import Torches from './Torches';
import Bag from './Bag';
import Text from '../shared/Text';
import { useDispatch, useSelector } from 'shared/hooks';
import inventorySelector from './inventorySelector';
import { Item, Nullable } from 'game/store/types';


type Props = {
  item: Item,
  index: number,
  onClick: (id: number) => void;
  using: Nullable<number>;
}
const InventoryItem = ({ item, index, onClick, using }: Props) => {
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

const Inventory = () => {
  const { items, inventoryImg, using, examining } = useSelector(inventorySelector);
  const dispatch = useDispatch();

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
          onClick={(itemId: number) => dispatch({ type: 'SELECT_ITEM', payload: itemId })}
          using={using}
        />
      ))}
    </Group>
  );
};

export default Inventory;
