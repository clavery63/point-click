import { Door, EntityType } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  object: Door;
  onClick: (id: number, type: EntityType) => void;
};
const DoorComponent = ({ object, onClick }: Props) => {
  const {
    position, openImg, closedImg, state,
  } = object;
  const images = useSelector(gameState => gameState.images);
  const openImage = images.get(openImg || '');
  const closedImage = images.get(closedImg || '');
  const image = state === 'OPEN' ? openImage : closedImage;
  const width = openImage?.width || closedImage?.width;
  const height = openImage?.height || closedImage?.height;

  return (
    <Image
      x={position?.left}
      y={position?.top}
      width={width}
      height={height}
      image={image}
      onClick={() => onClick(object.id, 'doors')}
    />
  );
};

export default DoorComponent;