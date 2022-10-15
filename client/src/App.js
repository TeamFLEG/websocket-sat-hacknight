import socketIO from 'socket.io-client';
import {useState} from "react";
import {Studio} from "./components/Studio"
import { ChakraProvider } from '@chakra-ui/react';
import SocketProvider from "./providers/socket"
function App() {
  return <ChakraProvider>
    <SocketProvider>
      <Studio />
    </SocketProvider>
  </ChakraProvider>
}

export default App;
