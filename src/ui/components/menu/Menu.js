import React from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';
import MenuCenter from './MenuCenter';
import MenuRight from './MenuRight';

const Menu = props => {
  const { 
    hasText, 
    dispatchVerb, 
    dispatchDoor, 
    dispatchPage, 
    currentVerb,
    menuImg,
    menuButtonImg,
    doors
  } = props;

  if (hasText) {
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
      <MenuRight
        onClick={dispatchPage}
        menuButtonImg={menuButtonImg}
      />
    </Group>
  );
};

export default Menu;
