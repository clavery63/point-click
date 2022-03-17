import { Item } from 'game/store/types';
import React, { useEffect } from 'react';
import { Image } from 'shared/components/tappables';
import { useSelector } from 'shared/hooks';
import { getValidCondition } from 'shared/util/conditionValid';

// TODO: clean this up. maybe put imgSet version in its own component
// TODO: we're calling this a lot for the items in viewport. Consider caching
type Props = {
  item: Item;
  onClick: (id: number) => void;
};
const ItemComponent = ({ item, onClick }: Props) => {
  const imgRef = React.useRef<any>(null); // Sorry.
  const {
    position, img, imgSet, requiresPrecision,
  } = item;
  const images = useSelector(state => state.images);
  const image = images.get(imgSet?.img || img || '');

  const condition = imgSet && getValidCondition(imgSet.conditions, item);
  const index = condition?.index;

  useEffect(() => {
    if (requiresPrecision) {
      // TODO: make cloudfront cross origin. otherwise Konva can't tolerate this
      imgRef.current?.cache({ imageSmoothingEnabled: false });
      imgRef.current.drawHitFromCache();
    }
  }, [imgRef, requiresPrecision]);

  return (
    <Image
      ref={imgRef}
      x={position?.left}
      y={position?.top}
      width={imgSet?.width || image?.width}
      height={image?.height}
      image={image}
      onClick={() => onClick(item.id)}
      crop={index !== undefined && {
        x: index * (imgSet?.width ?? 0),
        width: imgSet?.width,
        height: image?.height,
      }}
    />
  );
};

export default ItemComponent;
