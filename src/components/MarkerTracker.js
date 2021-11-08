import { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

require('dotenv').config();

const Marker = () => {
  const [markerPosition, setMarkerPosition] = useState({
    x: null,
    y: null,
    z: null,
  });

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    const camera = document.querySelector('[camera]');
    const marker = document.querySelector('a-marker');
    let check;

    marker.addEventListener(
      'markerFound',
      () => {
        let cameraPosition = camera.object3D.position;
        let newMarkerPosition = marker.object3D.position;
        // let distance = cameraPosition.distanceTo(newMarkerPosition);

        check = setInterval(() => {
          cameraPosition = camera.object3D.position;
          newMarkerPosition = marker.object3D.position;
          // distance = camweraPosition.distanceTo(newMarkerPosition);

          // do what you want with the distance:
          console.log('Marker found', markerPosition);
          // console.log(
          //   'Camera:',
          //   cameraPosition,
          //   'Marker:',
          //   newMarkerPosition,
          //   'Distance:',
          //   distance
          // );

          setMarkerPosition(newMarkerPosition);
          socket.emit('markerPosition', newMarkerPosition);
        }, 100);
      },
      []
    );

    marker.addEventListener('markerLost', () => {
      console.log('Marker lost');
      clearInterval(check);
    });
  });

  return null;
};

export default Marker;
