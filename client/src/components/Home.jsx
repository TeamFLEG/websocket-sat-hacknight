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
        setGame({ username, word: response });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-primary w-full min-h-screen">
      <div className="flex flex-col justify-center max-w-[750px] h-full p-5  bg-blur-3xl">
        <h1 className="text-2xl font-[600] text-secondary my-5 desktop:text-5xl">
          HANGMAN
        </h1>
        <form onSubmit={handleSendUsername}>
          <input
            className="w-full p-2 my-5 bg-secondary rounded-md text-center"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
        <Button className="rounded-full text-sm my-3" colorScheme="teal">
          Join Server
        </Button>
      </div>
    </div>
  );
};
