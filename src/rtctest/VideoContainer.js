import React from 'react';
import useCapture from './useCapture';
import useSocket from './useSocket';
import useChatClient from './useChatClient';
import Video from './Video';

const VideoContainer = ({ hasVideo = true }) => {
  const { connect, localStream } = useCapture(hasVideo);
  const socket = useSocket();
  const remoteStream = useChatClient(localStream, socket);

  return (
    <div>
      <button onClick={connect}>Start Connection</button>
      <Video stream={localStream} muted={true} />
      <Video stream={remoteStream} />
    </div>
  );
};

export default VideoContainer;
