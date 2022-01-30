import { EntityType, Scenery } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  object: Scenery;
  onClick: (id: number, type: EntityType) => void;
};
const SceneryComponent = ({ object, onClick }: Props) => {
  const { startPosition, currentPosition, img } = object;
  const images = useSelector(state => state.images);
  const position = currentPosition || startPosition;
  return (
    <Image
      x={position.left}
      y={position.top}
      width={startPosition.width}
      height={startPosition.height}
      image={images.get(img || '')}
      onClick={() => onClick(object.id, 'scenery')}
    />
  );
};

export default SceneryComponent;
