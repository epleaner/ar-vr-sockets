import React, { useEffect, useState } from 'react';
import './App.css';

import SocketContext from './contexts/SocketContext';
import MarkerTracker from './components/MarkerTracker';

import socketIOClient from 'socket.io-client';

function App() {
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIOClient(ENDPOINT);
    setSocket(newSocket);

    console.log(newSocket);

    return () => {
      newSocket.close();
    };
  }, [ENDPOINT]);

  return (
    <SocketContext.Provider value={socket}>
      <MarkerTracker />
    </SocketContext.Provider>
  );
}

export default App;
