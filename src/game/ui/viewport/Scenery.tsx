import { EntityType, Scenery } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  object: Scenery;
  onClick: (id: number, type: EntityType) => void;
};
const SceneryComponent = ({ object, onClick }: Props) => {
  const {
    startPosition, position, size, img,
  } = object;
  const images = useSelector(state => state.images);
  const image = images.get(img || '');
  const currentPosition = position || startPosition;

  return (
    <Image
      x={currentPosition.left}
      y={currentPosition.top}
      width={image?.width || size?.width}
      height={image?.height || size?.height}
      image={image}
      onClick={() => onClick(object.id, 'scenery')}
    />
  );
};

export default SceneryComponent;
