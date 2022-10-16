import { io } from "socket.io-client";
import { useState } from "react";
import useSocket from "../hooks/useSocket";
import useGame from "../hooks/useGame";
import { Button } from "@chakra-ui/react";

export const Home = () => {
  const { socket, setSocket } = useSocket();
  const { game, setGame } = useGame();
  const [username, setUsername] = useState("");

  const handleSendUsername = (e) => {
    e.preventDefault();
    try {
      const socketIO = io("http://localhost:4000");
      socketIO.emit("startGame", username, (response) => {
        setSocket(socketIO);
        setGame({ username, word: response, lives: 5 });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-primary w-full min-h-screen">
      <div className="flex flex-col justify-center max-w-[1200px] h-full p-5  bg-blur-3xl">
        <h1 className="text-5xl font-[600] text-secondary my-5 desktop:text-5xl w-full">
          HANGMAN
        </h1>
        <form onSubmit={handleSendUsername}>
          <input
            className="w-full p-3 my-8 bg-secondary rounded-md text-center"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
        <Button className="w-full rounded-full text-sm my-4" colorScheme="teal">
          Join Server
        </Button>
      </div>
    </div>
  );
};
