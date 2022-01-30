import React from 'react';
import { Image, Group } from 'react-konva';
import MenuLeft from './MenuLeft';
import MenuCenter from './MenuCenter';
import MenuRight from './MenuRight';
import { useDispatch, useSelector } from 'shared/hooks';
import menuSelector from './menuSelector';
import { DoorDir, PageDir, VerbIndex } from 'game/store/types';

const Menu = () => {
  const {
    hasText, currentVerb, menuImg, menuButtonImg, doors
  } = useSelector(menuSelector);

  const dispatch = useDispatch();
  const dispatchVerb = (verb: VerbIndex) => dispatch({ type: 'SELECT_VERB', payload: verb });
  const dispatchDoor = (id: number) => dispatch({ 
    type: 'SELECT_OBJECT', 
    payload: { id, type: 'doors' } 
  });
  const dispatchPage = (dir: PageDir) => dispatch({ type: 'CHANGE_PAGE', payload: dir});
  const dispatchSave =  () => dispatch({ type: 'SAVE_GAME' });

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
        onPageClick={dispatchPage}
        onSaveClick={dispatchSave}
        menuButtonImg={menuButtonImg}
      />
    </Group>
  );
};

export default Menu;
