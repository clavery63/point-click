import { useSelector } from 'admin/ui/hooks/redux';
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

  return (
    <Group
      // TODO: useCachebuster doesn't really work as intended. Find a more
      // foolproof way to handle this
      x={left + Math.random() / 1000}
      y={top + Math.random() / 1000}
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
