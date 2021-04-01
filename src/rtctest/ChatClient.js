class ChatClient {
  constructor(localStream, socket, setRemoteStream) {
    this.localStream = localStream;
    this.setRemoteStream = setRemoteStream;
    this.socket = socket;
    this.socket.onVideoOffer = this.handleVideoOfferMsg;
    
    if (this.socket.numParticipants === 2) {
      this.createPeerConnection();
    }
  }

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        }
      ]
    });
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
    this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    this.peerConnection.ontrack = this.handleTrackEvent;
    this.peerConnection.onremovetrack = this.handleRemoveTrackEvent;

    this.socket.onVideoAnswer = this.handleVideoAnswerMsg;
    this.socket.onNewIceCandidate = this.handleNewIceCandidateMsg;
  }

  handleNegotiationNeededEvent = async () => {
    console.log('handleNegotiationNeededEvent');
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    this.socket.sendMessage({
      type: 'video-offer',
      sdp: this.peerConnection.localDescription
    });
  }

  handleVideoOfferMsg = async msg => {
    console.log('handleVideoOfferMsg');
    this.createPeerConnection();
    const desc = new RTCSessionDescription(msg.sdp);
    await this.peerConnection.setRemoteDescription(desc)
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
  
    this.socket.sendMessage({
      type: 'video-answer',
      sdp: this.peerConnection.localDescription
    });
  }

  handleVideoAnswerMsg = async msg => {
    console.log('handleVideoAnswerMsg');
    const desc = new RTCSessionDescription(msg.sdp);
    await this.peerConnection.setRemoteDescription(desc);
  }

  handleICECandidateEvent = async event => {
    console.log('handleICECandidateEvent');
    if (event.candidate) {
      this.socket.sendMessage({
        type: 'new-ice-candidate',
        candidate: event.candidate
      });
    }
  }

  handleNewIceCandidateMsg = async msg => {
    console.log('handleNewICECandidateMsg');
    const candidate = new RTCIceCandidate(msg.candidate);
  
    this.peerConnection.addIceCandidate(candidate);
  }

  handleTrackEvent = async event => {
    console.log('handleTrackEvent');
    this.setRemoteStream(event.streams[0]);
  };
  
  handleRemoveTrackEvent = async () => {
    console.log('handleRemoveTrackEvent');
    this.setRemoteStream(null);
  };

  close() {

  }
}

export default ChatClient;
