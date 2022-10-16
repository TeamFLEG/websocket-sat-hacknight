import { useCallback } from "react";
import { useEffect, useState } from "react";
import useGame from "../hooks/useGame";
import useSocket from "../hooks/useSocket";

export const Game = () => {
  const [current, setCurrent] = useState(null);
  const [winner, setWinner] = useState(<></>);
  const { game, setGame } = useGame();
  const { socket } = useSocket();

  const arraysEqual = useCallback((a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }, []);

  const lifeGenerator = useCallback((lives) => {
    const life = [];
    for (let i = 0; i < lives; i++) {
      life.push(<span key={i}>❤️</span>);
    }
    return life;
  }, []);

  const handlePress = (e) => {
    console.log(e);

    if (e.key.toLowerCase() !== e.key.toUpperCase() && !current) {
      setCurrent(e.key);

      socket.emit("guess", { user: game.username, letter: e.key });

      socket.on("discover", (response) => {
        if (arraysEqual(response, game.word)) {
          setGame({ ...game, lives: game.lives - 1 });
        } else {
          setGame({ ...game, word: response });
        }
      });

      socket.on("winner", (res) => {
        setWinner(<Winner winner={res} />);
        setInterval(() => {
          setWinner("");
          setGame({ ...game, lives: 5 });
        }, 5000);
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

      <div className="flex flex-col justify-center items-center w-full  p-5">
        <h1 className="text-5xl text-secondary pb-16">Guess the Word</h1>

        <div className="flex space-x-3 cursor-pointer">
          {game?.word.map((letter, index) => (
            <LetterBox letter={letter} key={index} />
          ))}
        </div>

        <div className="text-secondary mt-16 text-4xl">
          {lifeGenerator(game?.lives)}
        </div>

        {winner}
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
    <div className="w-[60px] h-[60px] bg-tertiary rounded-md flex justify-center items-center text-2xl font-[500] capitalize">
      {letter}
    </div>
  );
};

const Winner = ({ winner }) => {
  return (
    <div className="text-secondary">
      <h1 className="text-4xl mt-16">Winner</h1>
      <p className="text-3xl font-semibold">{winner}</p>
    </div>
  );
};
