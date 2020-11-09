import React, { useEffect, useState } from 'react';
import { Rect, Image } from 'react-konva';
import srcS from '../../../images/S.png';
import srcA from '../../../images/A.png';
import srcV from '../../../images/V.png';
import srcE from '../../../images/E.png';

const Viewport = ({ fill, width, onClick }) => {
  const [S, setS] = useState(null);
  const [A, setA] = useState(null);
  const [V, setV] = useState(null);
  const [E, setE] = useState(null);

  useEffect(() => {
    const imageS = new window.Image();
    const imageA = new window.Image();
    const imageV = new window.Image();
    const imageE = new window.Image();
    imageS.src = srcS;
    imageA.src = srcA;
    imageV.src = srcV;
    imageE.src = srcE;
    setS(imageS);
    setA(imageA);
    setV(imageV);
    setE(imageE);
  }, [])

  return (
    <>
      <Rect 
        x={20} 
        y={20}
        width={width} 
        height={200} 
        fill={fill}
        onClick={onClick}
      />
      <Image 
        x={100}
        y={100}
        image={S}
      />
      <Image 
        x={108}
        y={100}
        image={A}
      />
      <Image 
        x={116}
        y={100}
        image={V}
      />
      <Image 
        x={124}
        y={100}
        image={E}
      />
    </>
  );
};

Viewport.defaultProps = {
  fill: 'green',
  width: 20
};

export default Viewport;
