import { Position, Scenery } from 'game/store/types';
import { KonvaEventObject } from 'konva/types/Node';
import React from 'react';
import PreciseImage from 'shared/components/PreciseImage';
import { useSelector } from '../hooks/redux';
import useCachebuster from '../hooks/useCachebuster';

type Props = {
  scenery: Scenery;
  position: Position;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onClick: () => void;
  opacity: number;
};
const VisibleScenery = ({
  scenery, position, onDragEnd, onClick, opacity,
}: Props) => {
  const image = useSelector(state => state.images[scenery.img || '']);
  const cachebuster = useCachebuster(position);

  if (!position) {
    return null;
  }

  return (
    <PreciseImage
      x={position.left + cachebuster}
      y={position.top + cachebuster}
      width={image.width}
      height={image.height}
      image={image}
      opacity={opacity}
      draggable
      onDragEnd={onDragEnd}
      onClick={onClick}
    />
  );
};

export default VisibleScenery;
