import React from 'react';
import { Image, Group } from 'react-konva';
import { useDispatch, useSelector } from 'shared/hooks';
import { PageDir, VerbIndex } from 'game/store/types';
import MenuLeft from './MenuLeft';
import MenuCenter from './MenuCenter';
import MenuRight from './MenuRight';
import menuSelector from './menuSelector';

const Menu = () => {
  const { hasText, menuImg, doors } = useSelector(menuSelector);

  const dispatch = useDispatch();
  const dispatchVerb = (verb: VerbIndex) => dispatch({ type: 'SELECT_VERB', payload: verb });
  const dispatchDoor = (id: number) => dispatch({
    type: 'SELECT_DOOR',
    payload: id,
  });
  const dispatchPage = (dir: PageDir) => dispatch({ type: 'CHANGE_PAGE', payload: dir });
  const dispatchSave = () => dispatch({ type: 'SAVE_GAME' });

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
        doors={doors}
        onMenuClick={dispatchVerb}
        onDoorClick={dispatchDoor}
      />
      <MenuCenter
        onClick={dispatchVerb}
      />
      <MenuRight
        onPageClick={dispatchPage}
        onSaveClick={dispatchSave}
      />
    </Group>
  );
};

export default Menu;
