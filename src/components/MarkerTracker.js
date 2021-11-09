import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

require('dotenv').config();

const Marker = () => {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    const marker1 = document.querySelector('a-marker#animated-marker');
    const marker2 = document.querySelector('a-marker#animated-marker2');

    const markers = [
      { marker: marker1, name: 'marker1' },
      { marker: marker2, name: 'marker2' },
    ];

    markers.forEach(({ marker, name }) => {
      let getAndEmit;

      marker.addEventListener(
        'markerFound',
        () => {
          getAndEmit = setInterval(() => {
            let position = marker.object3D.position;
            console.log('Marker found', name, position);
            socket.emit('markerPosition', { name, position });
          }, 100);
        },
        []
      );

      marker.addEventListener('markerLost', () => {
        console.log('Marker lost', name);
        socket.emit('markerLost', { name });
        clearInterval(getAndEmit);
      });
    });
  });

  return null;
};

export default Marker;
