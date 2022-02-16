import { Scenery } from 'game/store/types';
import React from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  scenery: Scenery;
  onClick: (id: number) => void;
};
const SceneryComponent = ({ scenery, onClick }: Props) => {
  const {
    startPosition, position, size, img,
  } = scenery;
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
      onClick={() => onClick(scenery.id)}
    />
  );
};

export default SceneryComponent;
