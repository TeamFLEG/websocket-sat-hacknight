import socketIO from 'socket.io-client';
import {useState} from "react";
import {Studio} from "./components/Studio"
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return <ChakraProvider>
  <Studio/>
  </ChakraProvider>
}

export default App;
