import React, { useEffect, useState } from 'react';
import { Image, Group } from 'react-konva';
import borderSrc from '../../../images/border.png';

const Viewport = ({ onClick }) => {
  const [borderImg, setBorderImg] = useState(null);

  useEffect(() => {
    const borderImage = new window.Image();
    borderImage.src = borderSrc;
    setBorderImg(borderImage);
  }, []);

  return (
    <Group x={8} y={23}>
      <Image
        width={128}
        height={128}
        image={borderImg}
      />
    </Group>
  );
};

export default Viewport;
