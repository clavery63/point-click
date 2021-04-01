import { useEffect, useState } from 'react';
import ChatClient from './ChatClient';

const useChatClient = (localStream, socket) => {
  const [chatClient, setChatClient] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    if (localStream && socket && !chatClient) {
      setChatClient(new ChatClient(localStream, socket, setRemoteStream));
    }
    return () => chatClient && chatClient.close();
  }, [localStream, socket, chatClient]);

  return remoteStream;
};

export default useChatClient;
