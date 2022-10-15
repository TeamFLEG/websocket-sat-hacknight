import { useEffect, useState } from "react";
import useGame from "../hooks/useGame";
import useSocket from "../hooks/useSocket";

export const Game = () => {
  const [current, setCurrent] = useState(null);
  const { game, setGame } = useGame();
  const { socket } = useSocket();

  const handlePress = (e) => {
    console.log(e);

    if (e.key.toLowerCase() !== e.key.toUpperCase() && !current) {
      setCurrent(e.key);

      socket.emit("guess", { user: game.username, letter: e.key });

      socket.on("discover", (response) => {
        console.log(response);
        setGame({ ...game, word: response });
        console.log(game);
      });

      setTimeout(() => {
        setCurrent(null);
      }, 1000);
    }
  };
  useEffect(() => {
    window.addEventListener("keypress", handlePress);
    return () => window.removeEventListener("keypress", handlePress);
  });

  return (
    <div className="flex bg-primary w-full min-h-screen">
      <div className="flex-[0.20] flex flex-col p-3 bg-black drop-shadow border-slate-700 border-r"></div>

      <div className="flex-[0.80] p-5">
        <h1 className="text-2xl text-secondary pb-20">Guess the Word</h1>

        <div className="flex space-x-3 cursor-pointer">
          {game?.word.map((letter, index) => (
            <LetterBox letter={letter} key={index} />
          ))}
        </div>
      </div>

      {current && (
        <div className="duration-500 absolute right-[25px] bottom-[25px] uppercase font-[500] drop-shadow w-[60px] text-black text-xl flex justify-center items-center h-[60px] bg-yellow-400 rounded-md">
          {current}
        </div>
      )}
    </div>
  );
};

const LetterBox = ({ letter }) => {
  return (
    <div className="w-[60px] h-[60px] bg-tertiary rounded-md flex justify-center items-center text-2xl font-[500] capitalize">{letter}</div>
  );
};
