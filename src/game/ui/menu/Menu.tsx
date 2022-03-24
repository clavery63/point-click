import React from 'react';
import { Image, Group } from 'react-konva';
import { useDispatch, useSelector } from 'shared/hooks/redux';
import { PageDir, VerbIndex } from 'game/store/types';
import MenuVerbs from './MenuVerbs';
import MenuButtons from './MenuButtons';
import menuSelector from './menuSelector';
import MiniMap from './MiniMap';

const Menu = () => {
  const { hasText, menuImg, doors } = useSelector(menuSelector);
  const dispatch = useDispatch();

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
      <MiniMap
        onClick={(id: number) => dispatch({
          type: 'SELECT_DOOR',
          payload: id,
        })}
        doors={doors}
      />
      <MenuVerbs
        onClick={(verb: VerbIndex) => dispatch({
          type: 'SELECT_VERB',
          payload: verb,
        })}
      />
      <MenuButtons
        onPageClick={(dir: PageDir) => dispatch({
          type: 'CHANGE_PAGE',
          payload: dir,
        })}
        onSaveClick={() => dispatch({ type: 'SAVE_GAME' })}
      />
    </Group>
  );
};

export default Menu;
