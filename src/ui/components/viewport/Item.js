import React, { useRef, useEffect } from 'react';
import { Image } from 'react-konva';

const Item = ({ object, onClick}) => {
  const imgRef = useRef(null);
  const { position, img, requiresPrecision } = object;

  useEffect(() => {
    if (requiresPrecision) {
      imgRef.current.cache({ imageSmoothingEnabled: false });
      imgRef.current.drawHitFromCache();
    }
  }, [imgRef, requiresPrecision]);

  return (
    <Image
      ref={imgRef}
      x={position.left}
      y={position.top}
      width={position.width}
      height={position.height}
      image={img}
      onClick={() => onClick(object.id, 'items')}
    />
  );
};

export default Item;
