import React, { useEffect, useState } from 'react';
import { Image } from 'shared/components/tappables';
import { connect } from 'react-redux';

const WIDTH = 10;
const HEIGHT = 16;
const X_OFFSET = 6;
const Y_OFFSET = 3;
const MS_PER_FRAME = 40;

const Torches = ({ torchImg, onClick }) => {
  const [flip, setFlip] = useState(0);
  const x = X_OFFSET + flip * WIDTH;
  const scaleX = 1 + flip * -2;

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(Math.floor(Math.random() * 2))
    }, MS_PER_FRAME);
    return () => clearInterval(interval)
  }, []);

  return (
    <Image
      x={x}
      y={Y_OFFSET}
      width={WIDTH}
      height={HEIGHT}
      image={torchImg}
      scaleX={scaleX}
      onClick={onClick}
    />
  );
};

const mapStateToProps = ({ images }) => {
  return {
    torchImg: images['flame-1']
  };
};

const mapDispatchToProps = {
  onClick: () => ({ 
    type: 'PLAY_MUSIC', 
    payload: {
      text: 'With all the antics going on in this crazy castle, the last thing you need to worry about is this torch going out. Lucky for you, that won\'t be a problem. This is an eternal torch... It is a light that never goes out.',
      fileName: 'light.mp3' 
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Torches);
