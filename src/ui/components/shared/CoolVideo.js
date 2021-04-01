import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Image, Rect } from 'react-konva';
import useRemoteStream from '../../../rtc/useRemoteStream';
import Konva from 'konva';

const VIEWPORT_SIZE = 112;
const SCALE_FACTOR = 0.8;

const CoolVideo = () => {
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({});
  const { connect, remoteStream } = useRemoteStream();

  // we need to use 'useMemo' here, so we don't create new video elment on any render
  const videoElement = useMemo(() => {
    const element = document.createElement('video');
    return element;
  }, []);
  
  useEffect(() => {
    document.querySelector('.music-player').pause();
    connect();
    return () => {
      videoElement.pause();
      videoElement.removeAttribute('src');
      videoElement.height = 420;
      document.querySelector('.music-player').play();
    }
  }, []);

  useEffect(() => {
    if (videoElement && remoteStream) {
      videoElement.srcObject = remoteStream;
      videoElement.play();

      window.videoElement = videoElement;

      const layer = imageRef.current.getLayer();

      const anim = new Konva.Animation(() => {
        const { videoWidth, videoHeight } = videoElement;
        const length = Math.min(videoWidth, videoHeight);
        setCrop({
          x: (videoWidth - length) / 2,
          y: (videoHeight - length) / 2,
          width: length,
          height: length
        });
        imageRef.current.cache();
        imageRef.current.getLayer().batchDraw();
      }, layer);
      anim.start();
  
      return () => anim.stop();
    }
  }, [remoteStream, videoElement]);

  return (
    <>
      <Rect width={VIEWPORT_SIZE} height={VIEWPORT_SIZE} fill={'black'} />
      <Image
        ref={imageRef}
        filters={[Konva.Filters.Posterize, Konva.Filters.Noise]}
        levels={0.02}
        noise={0.1}
        image={videoElement}
        x={VIEWPORT_SIZE * ((1 - SCALE_FACTOR) / 2)}
        y={VIEWPORT_SIZE * ((1 - SCALE_FACTOR) / 2)}
        width={VIEWPORT_SIZE * SCALE_FACTOR}
        height={VIEWPORT_SIZE * SCALE_FACTOR}
        crop={crop}
      />
    </>
  );
};

export default CoolVideo;
