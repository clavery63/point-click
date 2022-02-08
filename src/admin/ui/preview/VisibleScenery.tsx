import { PositionAndSize, Scenery } from 'game/store/types';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import { Image } from 'react-konva';
import { useSelector } from '../hooks/redux';
import useCachebuster from '../hooks/useCachebuster';

type Props = {
  scenery: Scenery;
  position: PositionAndSize;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onClick: () => void;
};
const VisibleScenery = ({
  scenery, position, onDragEnd, onClick,
}: Props) => {
  const image = useSelector(state => state.gameState.images[scenery.img || '']);
  const cachebuster = useCachebuster(position);

  if (!position) {
    return null;
  }

  return (
    <Image
      x={position.left + cachebuster}
      y={position.top + cachebuster}
      width={position.width}
      height={position.height}
      image={image}
      draggable
      onDragEnd={onDragEnd}
      onClick={onClick}
    />
  );
};

export default VisibleScenery;
