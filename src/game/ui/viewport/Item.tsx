import { EntityType, Item } from 'game/store/types';
import Konva from 'konva';
import React, { useRef, useEffect } from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  object: Item;
  onClick: (id: number, type: EntityType) => void;
};
const ItemComponent = ({ object, onClick }: Props) => {
  const imgRef = useRef(null);
  const { position, img, requiresPrecision } = object;
  const images = useSelector(state => state.images);

  useEffect(() => {
    if (requiresPrecision) {
      // TODO: make cloudfront cross origin. otherwise Konva can't tolerate this
      // TODO: typecasts because I can't deal with this right now
      (imgRef.current as unknown as Konva.Image).cache({ imageSmoothingEnabled: false });
      (imgRef.current as unknown as Konva.Image).drawHitFromCache();
    }
  }, [imgRef, requiresPrecision]);

  return (
    <Image
      ref={imgRef}
      x={position?.left}
      y={position?.top}
      width={position?.width}
      height={position?.height}
      image={images.get(img || '')}
      onClick={() => onClick(object.id, 'items')}
    />
  );
};

export default ItemComponent;
