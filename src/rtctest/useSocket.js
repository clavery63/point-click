import { useEffect, useState } from 'react';

const SOCKET_URL = 'ws://localhost:8080';
const REACT_APP_SERVER_URL='wss://server.doublehamburger.com'

const tryCalling = (fn, ...args) => {
  if (fn) {
    fn(...args);
  }
}

class Socket {
  constructor(url) {
    this.numParticipants = 0;
    this.ws = new WebSocket(url);
    this.ws.onmessage = data => this.onMessage(data);
    this.ws.onopen = () => {
      console.log('this.ws.onopen');
      this.ws.send('POINT_CLICK_INIT');
    }
    console.log('new Socket');
    this.sendMessage = msg => this.ws.send(JSON.stringify(msg));
  }

  onMessage(event) {
    const msg = JSON.parse(event.data);
    switch (msg.type) {
      case 'num-participants':
        this.numParticipants = msg.num;
        console.log('numParticipants:', this.numParticipants);
        break;
      case 'pre-offer':
        console.log('preoffer came in, ', this.onPreOffer)
        tryCalling(this.onPreOffer, msg);
        break;
      case 'video-offer':
        tryCalling(this.onVideoOffer, msg);
        break;
      case 'video-answer':
        tryCalling(this.onVideoAnswer, msg);
        break;
      case 'new-ice-candidate':
        tryCalling(this.onNewIceCandidate, msg);
        break;
      default:
        break;
    }
  }

  close() {
    this.ws.close();
  }
}

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      setSocket(new Socket(REACT_APP_SERVER_URL));
    }
  }, [socket]);

  return socket;
};

export default useSocket;
