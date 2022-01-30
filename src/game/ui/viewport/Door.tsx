import { Door, EntityType } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  object: Door;
  onClick: (id: number, type: EntityType) => void;
};
const DoorComponent = ({ object, onClick}: Props) => {
  const { position, openImg, closedImg, state } = object;
  const images = useSelector(state => state.images);
  const img = state === 'OPEN' ? openImg : closedImg;
  return (
    <Image
      x={position?.left}
      y={position?.top}
      width={position?.width}
      height={position?.height}
      image={images.get(img || '')}
      onClick={() => onClick(object.id, 'doors')}
    />
  );
};

export default DoorComponent;
