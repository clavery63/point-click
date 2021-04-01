import { useCallback, useState } from 'react';

const constraints = { audio: true, video: { width: 1280, height: 720 } };

const useCapture = () => {
  const [localStream, setLocalStream] = useState(null);
  const connect = useCallback(() => {
    navigator.mediaDevices.getUserMedia(constraints)
      .then(setLocalStream)
      .catch((err) => { console.log(err.name + ": " + err.message); });
  }, []);

  return { connect, localStream };
};  

export default useCapture;
