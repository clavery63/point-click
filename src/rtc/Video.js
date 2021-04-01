import React, { useEffect, useRef } from 'react';

const videoStyle = {
  backgroundColor: 'black',
  width: '600px'
};

const Video = ({ stream, muted = false }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = function(e) {
        videoRef.current.play();
      };
    }
  }, [stream, videoRef]);

  return (
    <video ref={videoRef} style={videoStyle} muted={muted} />
  );
};

export default Video;
