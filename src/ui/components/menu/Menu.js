import React, { useEffect, useState } from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';
import menuSrc from '../../../images/menu.png';

const Menu = ({ text }) => {
  const [menuImg, setMenuImg] = useState(null);

  useEffect(() => {
    const menuImage = new window.Image();
    menuImage.src = menuSrc;
    setMenuImg(menuImage);
  }, []);

  if (text) {
    return null;
  }

  return (
    <Group x={17} y={150}>
      <Image
        width={222}
        height={78}
        image={menuImg}
      />
      <MenuLeft />
    </Group>
  );
};

export default Menu;
