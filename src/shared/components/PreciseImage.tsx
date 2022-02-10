import React, { useEffect } from 'react';
import { Image } from './tappables';

type Props = React.ComponentPropsWithRef<typeof Image>;

const PreciseImage = (props: Props) => {
  const imgRef = React.useRef<any>(null); // Sorry.

  useEffect(() => {
    imgRef.current?.cache({ imageSmoothingEnabled: false });
    imgRef.current?.drawHitFromCache();
  }, [imgRef]);

  return <Image {...props} ref={imgRef} />;
};

export default PreciseImage;
