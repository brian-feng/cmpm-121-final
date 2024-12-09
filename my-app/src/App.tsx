import { useState } from 'react';
import './App.css';
import BoardContext from './BoardContext';
import GameBoard from './gameboard';
import { Stage } from '@pixi/react';
import { useEffect } from 'react';
import { GameSettings } from './externalDSLParser';
import { BoardTile } from './boardTile';
import generateRandomInt from './random';
import Board from './board';
const App = () => {
  const [tiles, setTiles] = useState([])
  const [playerPos, setPlayerPos] = useState({});
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    win: {
      win_condition: 10, // Example: Win when you reach 10 points or complete one full cycle
      human_instructions: "Reach the goal within the time limit!", // Basic instruction message
    },
    board_info: {
      board_size_pixels: [800, 600], // Default board size in pixels
      board_colors: ["#ffffff", "#00ff00"], // Default board colors, white and green
      plant_colors: ["#ff0000", "#0000ff", "#ffff00"], // Default plant colors, red, blue, yellow
    },
  });
  
  return (
      <BoardContext.Provider value={{ playerPos, setPlayerPos }}>
          <GameBoard gameSettings={gameSettings}/>
          {/* <Board boardTiles={tiles}></Board> */}
      </BoardContext.Provider>
  );
};

export default App;