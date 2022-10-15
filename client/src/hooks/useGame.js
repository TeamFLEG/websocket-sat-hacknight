import { useContext } from "react";
import { GameContext } from "../providers/game";

const useGame = () => useContext(GameContext);

export default useGame;