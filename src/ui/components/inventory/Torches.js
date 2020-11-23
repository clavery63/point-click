import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import { connect } from 'react-redux';

const WIDTH = 10;
const HEIGHT = 16;
const X_OFFSET = 6;
const Y_OFFSET = 3;
const MS_PER_FRAME = 40;

const Torches = ({ torchImg }) => {
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
    />
  );
};

const mapStateToProps = ({ gameState }) => {
  return {
    torchImg: gameState.images.flame1
  };
};

export default connect(mapStateToProps)(Torches);
