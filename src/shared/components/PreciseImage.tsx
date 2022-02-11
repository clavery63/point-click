/* eslint-disable react/prop-types */

import { KonvaEventObject } from 'konva/types/Node';
import React, { useEffect, useState } from 'react';
import { Image } from './tappables';

type Props = React.ComponentPropsWithRef<typeof Image>;

const setCursorStyle = (style: string) => (e: KonvaEventObject<MouseEvent>) => {
  const container = e.target.getStage()?.container();
  if (container) {
    container.style.cursor = style;
  }
};

const PreciseImage = (props: Props) => {
  const imgRef = React.useRef<any>(null); // Sorry.
  const [hack, setHack] = useState(undefined);

  useEffect(() => {
    imgRef.current?.cache({ imageSmoothingEnabled: false });
    imgRef.current?.drawHitFromCache();
  }, [imgRef, hack]);

  useEffect(() => {
    imgRef.current?.clearCache({ imageSmoothingEnabled: false });
    setHack(props.image);
  }, [props.image]);

  return (
    <Image
      {...props}
      ref={imgRef}
      image={hack}
      onMouseEnter={setCursorStyle('pointer')}
      onMouseLeave={setCursorStyle('default')}
    />
  );
};

export default PreciseImage;
