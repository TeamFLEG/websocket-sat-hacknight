import { createContext, useState } from "react";
export const GameContext = createContext();

export default function GameProvider({ children }) {
  const [game, setGame] = useState({});

  return (
    <GameContext.Provider value={{game,setGame }}>
      {children}
    </GameContext.Provider>
  );
}
