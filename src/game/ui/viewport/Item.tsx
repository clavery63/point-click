import { Item } from 'game/store/types';
import React, { useEffect } from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';

type Props = {
  item: Item;
  onClick: (id: number) => void;
};
const ItemComponent = ({ item, onClick }: Props) => {
  const imgRef = React.useRef<any>(null); // Sorry.
  const { position, img, requiresPrecision } = item;
  const images = useSelector(state => state.images);
  const image = images.get(img || '');

  useEffect(() => {
    if (requiresPrecision) {
      // TODO: make cloudfront cross origin. otherwise Konva can't tolerate this
      // TODO: typecasts because I can't deal with this right now
      imgRef.current?.cache({ imageSmoothingEnabled: false });
      imgRef.current.drawHitFromCache();
    }
  }, [imgRef, requiresPrecision]);

  return (
    <Image
      ref={imgRef}
      x={position?.left}
      y={position?.top}
      width={image?.width}
      height={image?.height}
      image={image}
      onClick={() => onClick(item.id)}
    />
  );
};

export default ItemComponent;
