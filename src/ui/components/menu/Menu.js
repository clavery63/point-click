import React from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';

const Menu = props => {
  const { 
    text, 
    dispatchMove, 
    dispatchMap, 
    menuOption,
    menuImg
  } = props;

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
