import socketIO from 'socket.io-client';
import { useState } from "react";
import { Studio } from "./components/Studio"
import { ChakraProvider } from '@chakra-ui/react';
import SocketProvider from "./providers/socket"
import GameProvider from './providers/game';

function App() {
  return <ChakraProvider>
    <SocketProvider>
      <GameProvider>
        <Studio />
      </GameProvider>
    </SocketProvider>
  </ChakraProvider>
}

export default App;
