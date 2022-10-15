import { useState } from "react";
import { Button } from "@chakra-ui/react";
export const Home = () => {
  const [newServer,setNewServer]=useState(false)
  const [joinServer,setJoinServer]=useState(false)

  return (
    <div className="flex flex-col justify-center items-center bg-primary w-full min-h-screen">
    <div className="flex flex-col justify-center  max-w-[650px] h-full p-5  bg-blur-3xl">
      <h1 className="text-2xl font-[600] text-secondary my-5 desktop:text-5xl">HANGMAN</h1>
      <Button className="rounded-full text-sm my-3 text-sm " colorScheme="teal">Join Server</Button>
    </div>
    </div>
  );
};
