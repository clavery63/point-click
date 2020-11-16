import React from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';

const Menu = props => {
  const { 
    text, 
    dispatchMove, 
    dispatchDoor, 
    menuOption,
    menuImg,
    menuButtonImg,
    doors
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
        doors={doors}
        onMoveClick={dispatchMove} 
        onDoorClick={dispatchDoor}
        menuButtonImg={menuButtonImg}
      />
    </Group>
  );
};

export default Menu;
