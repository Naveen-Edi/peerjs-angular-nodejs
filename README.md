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

this.myPeer.on('open', (id) => {
  console.log(id);
	this.socket.emit('JOIN_ROOM', token, id);
		navigator.mediaDevices
		.getUserMedia({
			video: true,
			audio: true,
		})
		.then((stream) => {
			this.localStream = stream;
			this.addVideoStream(document.createElement('video'), stream);
			this.myPeer.on('call', (call) => {
				call.answer(stream);
				const video = document.createElement('video');
				call.on('stream', (userVideoStream) => {
					this.addVideoStream(video, userVideoStream);
				});
			});
			this.socket.on('USER_CONNECTED', (userId) => {
				this.connectToNewUser(userId, stream);
			});
			this.socket.on('USER_DISCONNECTED', (userId) => {
				if (this.peers[userId]) this.peers[userId].close();
			});
		});
});

#Add Video Stream :

addVideoStream(video, stream) {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	});
	document.getElementById('video-grid').append(video);
}

#Connect New User in to the call :

connectToNewUser(userId, stream) {
	const call = this.myPeer.call(userId, stream);
	const video = document.createElement('video');
	call.on('stream', (userVideoStream) => {
		this.addVideoStream(video, userVideoStream);
	});
	call.on('close', () => {
		video.remove();
	});
	this.peers[userId] = call;
}