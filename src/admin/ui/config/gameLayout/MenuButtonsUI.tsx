import { setMenuButtonPosition } from 'admin/store/reducers/gameStateReducer/configReducer/positionsReducer';
import { useSelector, useDispatch } from 'admin/ui/hooks/redux';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import { Group } from 'react-konva';
import MenuButtonWidget from './MenuButtonWidget';

type B = ('pageUp' | 'pageDown' | 'self' | 'save')[];
const buttonNames: B = ['pageUp', 'pageDown', 'self', 'save'];
const texts = {
  pageUp: undefined,
  pageDown: undefined,
  self: 'self',
  save: 'save',
};

const MenuButtonsUI = () => {
  const dispatch = useDispatch();
  const positions = useSelector(state => state.gameState.present.config.positions);

  if (!positions.save) {
    // Hasn't loaded yet
    return null;
  }

  return (
    <Group>
      {buttonNames.map(name => (
        <MenuButtonWidget
          key={name}
          top={positions[name].top}
          left={positions[name].left}
          text={texts[name]}
          onDrag={(e: KonvaEventObject<DragEvent>) => {
            dispatch(setMenuButtonPosition({
              top: Math.round(e.target.y()),
              left: Math.round(e.target.x()),
              name,
            }));
          }}
        />
      ))}
    </Group>
  );
};

export default MenuButtonsUI;
