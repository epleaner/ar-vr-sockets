import { useEffect, useContext } from 'react';
import SocketContext from '../contexts/SocketContext';

require('dotenv').config();

const Marker = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    console.log('ok we got a socket', socket);
    socket.on('newMarkerPosition', () =>
      console.log('we got a new marker position')
    );

    const marker1 = document.querySelector('a-marker#animated-marker');
    const marker2 = document.querySelector('a-marker#animated-marker2');

    const markers = [
      { marker: marker1, name: 'marker1' },
      { marker: marker2, name: 'marker2' },
    ];

    markers.forEach(({ marker, name }) => {
      console.log('Setting up listeners for', name);
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

    return () => socket.emit('disconnect');
  }, [socket]);

  useEffect(() => () => console.log('bye'), []);

  return null;
};

export default Marker;
