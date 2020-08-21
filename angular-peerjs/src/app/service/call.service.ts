import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { v4 as uuid } from 'uuid';
//@ts-ignore
import Peer from 'peerjs';
import { BehaviorSubject, Subscription, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CallService {

	socket = null;
	peers = {};
	myPeer:any;
	stream:any;
	localStream:any;

	constructor() {}

	calling(token,id) {
		if (this.socket) {
			this.socket.emit('disconnect');
			this.socket.disconnect();
		}

		this.socket = io('socketUrl', {
			query: {  },
			transports: ["websocket"],
			path: '/socket.io'
		});
		this.socket.connect();

		this.listenEvents(token,id);
	}


	stop() {
		const tracks = this.localStream.getTracks();
		tracks.forEach((track) => {
			track.stop();
		});
	}


	listenEvents(token,id) {

		this.myPeer = new Peer(undefined, {
			host: 'www.example.com', //https required for live
			path: '/peerjs/' 
		});

		this.myPeer.on('open', (id) => {

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

	}

	addVideoStream(video, stream) {

		video.srcObject = stream;
		video.addEventListener('loadedmetadata', () => {
			video.play();
		});
		document.getElementById('video-grid').append(video);
	}

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
}
