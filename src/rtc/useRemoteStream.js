import useCapture from './useCapture';
import useSocket from './useSocket';
import useChatClient from './useChatClient';

const useRemoteStream = () => {
  const { connect, localStream } = useCapture(false);
  const socket = useSocket();
  const remoteStream = useChatClient(localStream, socket);

  return { connect, remoteStream };
};

export default useRemoteStream;
