# peerjs-angular-nodejs
Web Video call stream using peerjs + angular + nodejs ( using socket)


#PeerJS: Simple Video Call with WebRTC


PeerJS provides a complete, configurable, and easy-to-use peer-to-peer API built on top of WebRTC, supporting both data channels and media streams.


#Setup
Include the library

with npm: npm install peerjs and the usage:

    import Peer from 'peerjs';

#Create a Peer

    this.myPeer = new Peer(undefined, {
			host: 'www.example.com', //https required for live
			path: '/peerjs/' 
		});

