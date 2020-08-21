const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.use('/peerjs', peerServer);

io.on('connection', socket => {

  socket.on('JOIN-ROOM', (roomId, userId) => {

    socket.join(roomId);

    socket.to(roomId).broadcast.emit('USER-CONNECTED', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('USER-DISCONNECTED', userId);
    })

  })
  
})

server.listen(4000);
