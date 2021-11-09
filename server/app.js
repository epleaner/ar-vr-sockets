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

// Init Socket.io.
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    socket.off();
  });

  socket.on('markerPosition', (arg) => {
    console.log('New marker position', arg);
  });

  socket.on('markerLost', (arg) => {
    console.log('Marker lost', arg);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
