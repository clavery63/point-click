import { useSelector } from 'admin/ui/hooks/redux';
import useCachebuster from 'admin/ui/hooks/useCachebuster';
import { TextStateless as Text, makeCanvasSet } from 'game/ui/shared/Text';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import { Group, Image } from 'react-konva';
import { createSelector } from 'reselect';
import { setCursorStyle } from 'shared/components/PreciseImage';

const canvasesSelector = createSelector(
  // TODO: fix the "any" type here
  (state: any) => state.gameState.images,
  (images) => {
    const charSet = images['alpha-dark'];
    return charSet ? makeCanvasSet(charSet) : undefined;
  },
);

type Props = {
  top: number;
  left: number;
  text?: string;
  onClick?: () => void;
  onDrag?: (e: KonvaEventObject<DragEvent>) => void;
};
const MenuButtonWidget = (props: Props) => {
  const {
    top, left, text, onClick = () => {}, onDrag = () => {},
  } = props;
  const images = useSelector(state => state.gameState.images);
  const canvases = useSelector(canvasesSelector);
  const cachebuster = useCachebuster(1000 * top + left);

  return (
    <Group
      x={left + cachebuster}
      y={top + cachebuster}
      draggable
      onClick={onClick}
      onDragEnd={onDrag}
      onMouseEnter={setCursorStyle('pointer')}
      onMouseLeave={setCursorStyle('default')}
    >
      <Image image={images['menu-button']} />
      {text && <Text text={text} left={9} top={1} canvases={canvases} />}
    </Group>
  );
};

export default MenuButtonWidget;
