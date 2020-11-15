import React, { useEffect, useState } from 'react';
import { Image, Group } from 'react-konva';
import itemsSrc from '../../../images/items.png';

const Inventory = ({ onClick }) => {
  const [itemsImg, setItemsImg] = useState(null);

  useEffect(() => {
    const itemsImage = new window.Image();
    itemsImage.src = itemsSrc;
    setItemsImg(itemsImage);
  }, []);

  return (
    <Group x={137} y={16}>
      <Image
        width={110}
        height={134}
        image={itemsImg}
      />
    </Group>
  );
};

export default Inventory;
