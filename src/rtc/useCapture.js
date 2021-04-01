import { useCallback, useState } from 'react';

const useCapture = (hasVideo = true) => {
  const [localStream, setLocalStream] = useState(null);
  const video = hasVideo ? { width: 1280, height: 720 } : false;
  const constraints = { audio: true, video};
  const connect = useCallback(() => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(setLocalStream)
      .catch((err) => { console.log(err.name + ": " + err.message); });
  }, []);

  return { connect, localStream };
};  

export default useCapture;
