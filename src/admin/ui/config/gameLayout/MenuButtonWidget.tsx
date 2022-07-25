import { useSelector } from 'admin/ui/hooks/redux';
import { TextStateless as Text, makeCanvasSet } from 'game/ui/shared/Text';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useState } from 'react';
import { Group, Image, Text as KonvaText } from 'react-konva';
import { createSelector } from 'reselect';
import { setCursorStyle } from 'shared/components/PreciseImage';

const canvasesSelector = createSelector(
  // TODO: fix the "any" type here
  (state: any) => state.images,
  (images) => {
    const charSet = images['alpha-dark'];
    return charSet ? makeCanvasSet(charSet) : undefined;
  },
);

type Props = {
  top: number;
  left: number;
  text?: string;
  hasButton: boolean;
  onClick?: () => void;
  onDrag?: (e: KonvaEventObject<DragEvent>) => void;
};
const MenuButtonWidget = (props: Props) => {
  const {
    top, left, text, hasButton, onClick = () => {}, onDrag = () => {},
  } = props;
  const images = useSelector(state => state.images);
  const canvases = useSelector(canvasesSelector);

  const textLeft = hasButton ? 9 : 0;
  const textTop = hasButton ? 1 : 0;

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
      {hasButton && <Image image={images['menu-button']} />}
      {text && <Text text={text} left={textLeft} top={textTop} canvases={canvases} />}
    </Group>
  );
};

export default MenuButtonWidget;
