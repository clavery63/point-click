import React, { useRef, useEffect, useMemo } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva';

type Props = {
  src: string;
  muted?: boolean;
  opacity?: number;
  onClick?: () => void;
};

const getMusicPlayer = () => {
  return document.querySelector('.music-player') as HTMLAudioElement;
};

const Video = ({
  src, muted = false, opacity = 1, onClick = () => {},
}: Props) => {
  const imageRef = useRef<Konva.Image>(null);

  // we need to use 'useMemo' here, so we don't create new video elment on any render
  const videoElement = useMemo(() => {
    const element = document.createElement('video');
    element.loop = true;
    element.src = src;
    element.playsInline = true;
    element.muted = muted;
    return element;
  }, [src]);

  useEffect(() => {
    const musicPlayer = getMusicPlayer();
    musicPlayer?.pause();
    return () => {
      videoElement.pause();
      videoElement.removeAttribute('src');
      musicPlayer?.play();
    };
  }, []);

  // use Konva.Animation to redraw a layer
  useEffect(() => {
    videoElement.play();
    const layer = imageRef.current?.getLayer();

    const anim = new Konva.Animation(() => {}, layer);
    anim.start();

    return () => {
      anim.stop();
    };
  }, [videoElement]);

  return (
    <Image
      ref={imageRef}
      image={videoElement}
      x={0}
      y={0}
      width={112}
      height={112}
      opacity={opacity}
      onClick={onClick}
    />
  );
};

export default Video;
