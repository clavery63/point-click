import React, { useRef, useEffect, useMemo } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';

const Video = ({ src }) => {
  const imageRef = useRef(null);

  // we need to use 'useMemo' here, so we don't create new video elment on any render
  const videoElement = useMemo(() => {
    const element = document.createElement('video');
    element.loop = true;
    element.src = src;
    element.playsInline = true;
    return element;
  }, [src]);
  
  useEffect(() => {
    document.querySelector('.music-player').pause();
    return () => {
      videoElement.pause();
      videoElement.removeAttribute('src');
      document.querySelector('.music-player').play();
    }
  }, []);

  // use Konva.Animation to redraw a layer
  useEffect(() => {
    videoElement.play();
    const layer = imageRef.current.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => anim.stop();
  }, [videoElement]);

  return (
    <Image
      ref={imageRef}
      image={videoElement}
      x={0}
      y={0}
      width={112}
      height={112}
    />
  );
};

export default Video;
