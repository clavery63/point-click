import React, { useEffect, useState } from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';
import menuSrc from '../../../images/menu.png';

const Menu = ({ text, dispatchMove, dispatchMap, menuOption }) => {
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
    <Group x={17} y={152}>
      <Image
        width={222}
        height={78}
        image={menuImg}
      />
      <MenuLeft
        menuOption={menuOption}
        onMoveClick={dispatchMove} 
        onMapClick={dispatchMap}
      />
    </Group>
  );
};

export default Menu;
