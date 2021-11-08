import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

require('dotenv').config();

export default function ClientComponent() {
  const [fsr, setFsr] = useState('');

  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('FromFsr', (data) => {
      setFsr(data);
    });
  }, [ENDPOINT]);

  if (fsr.item === 'fsr') {
    console.log('FSR', fsr.msg);
  }

  return <div className='grid'></div>;
}
