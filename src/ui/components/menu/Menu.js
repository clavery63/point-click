import React from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';
import MenuCenter from './MenuCenter';

const Menu = props => {
  const { 
    text, 
    dispatchVerb, 
    dispatchDoor, 
    currentVerb,
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
        currentVerb={currentVerb}
        doors={doors}
        onMenuClick={dispatchVerb} 
        onDoorClick={dispatchDoor}
        menuButtonImg={menuButtonImg}
      />
      <MenuCenter
        currentVerb={currentVerb}
        onClick={dispatchVerb} 
      />
    </Group>
  );
};

export default Menu;
