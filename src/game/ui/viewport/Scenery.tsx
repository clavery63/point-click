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
  const image = images.get(img || '');
  const position = currentPosition || startPosition;

  // TODO: move width and height out of startPosition

  return (
    <Image
      x={position.left}
      y={position.top}
      width={image?.width || startPosition.width}
      height={image?.height || startPosition.height}
      image={image}
      onClick={() => onClick(object.id, 'scenery')}
    />
  );
};

export default SceneryComponent;
