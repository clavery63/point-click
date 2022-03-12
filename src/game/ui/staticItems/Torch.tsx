import React, { useEffect, useState } from 'react';
import { Image } from 'shared/components/tappables';
import { useDispatch, useSelector } from 'shared/hooks';

const WIDTH = 10;
const HEIGHT = 16;
const X_OFFSET = 143;
const Y_OFFSET = 19;
const MS_PER_FRAME = 40;

const musicPayload = {
  text: 'With all the antics going on in this crazy castle, the last thing you need to worry about is this torch going out. Lucky for you, that won\'t be a problem. This is an eternal torch... It is a light that never goes out.',
  fileName: 'light.mp3',
};

const Torche = () => {
  const dispatch = useDispatch();
  const torchImg = useSelector(({ images }) => images.get('flame-1'));

  const [flip, setFlip] = useState(0);
  const x = X_OFFSET + flip * WIDTH;
  const scaleX = 1 + flip * -2;

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(Math.floor(Math.random() * 2));
    }, MS_PER_FRAME);
    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      x={x}
      y={Y_OFFSET}
      width={WIDTH}
      height={HEIGHT}
      image={torchImg}
      scaleX={scaleX}
      onClick={() => dispatch({
        type: 'PLAY_MUSIC',
        payload: musicPayload,
      })}
    />
  );
};

export default Torche;
