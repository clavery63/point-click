/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Image } from './tappables';

type Props = React.ComponentPropsWithRef<typeof Image>;

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

  return <Image {...props} ref={imgRef} image={hack} />;
};

export default PreciseImage;
