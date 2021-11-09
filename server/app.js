const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
const port = process.env['SERVER_PORT'];
const local = process.env['CORSLOCAL'];

const index = require('./routes/index');
const app = express();

app.use(index);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // You may need to change this in .ENV if the client starts on a different port.
    origin: local,
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: 1e8,
});

let clients = [];

// Init Socket.io.
io.on('connection', (socket) => {
  clients.push(socket);
  console.log('New client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    const ndx = clients.indexOf(socket);
    if (ndx !== -1) clients.splice(ndx, 1);
  });

  socket.on('markerPosition', (arg) => {
    console.log('New marker position', arg);
    socket.emit('newMarkerPosition', 'Marker Found: ' + arg.name);
    // socket.emit('markerPosition', arg.name);
  });

  socket.on('markerLost', (arg) => {
    console.log('Marker lost', arg);
    socket.emit('testEvent', 'Marker Lost');
    // socket.emit('markerLost', arg.name);
  });

  socket.on('testEvent', (data) => {
    console.log('Received test Event ' + data);
  });

  socket.emit('testEvent', 'Sending');
  socket.emit('newMarkerPosition', 'Marker Found: TEST');
});

server.listen(port, () => console.log(`Listening on port ${port}`));
