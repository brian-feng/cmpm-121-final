import React from 'react';
import {useEffect, useState} from 'react';
import Board from './board';
import { BoardTile } from './boardTile';
import { saveGame,loadGame, redo, undo, initializeBoard } from './aos';
import { initGameSettings } from './externalDSLParser';
import { GameSettings } from './externalDSLParser';
import generateRandomInt from './random';
function GameBoard({gameSettings}: {gameSettings: GameSettings}) {
    // THIS IS THE AOS FILE
    const [tiles, setTiles] = useState<BoardTile[]>([]);
    const [fileNumber, setFileNumber] = useState<number>();
    useEffect(() => {
      const initialTiles = initializeBoard(gameSettings);
      setTiles(initialTiles);
    }, [gameSettings]);

    const save = (fileNumber: number) => {
        saveGame(tiles, fileNumber);
    };

    const load = (fileNumber: number) => {
        const loadedTiles = loadGame(fileNumber, gameSettings);
        setTiles(loadedTiles);
    };

    const handleRedo = () => {
        setTiles((prevTiles) => redo(fileNumber, gameSettings));
    };

    const handleUndo = () => {
        setTiles((prevTiles) => undo(fileNumber, gameSettings));
    };
    const canvaswidth = 800;
    const canvasheight = 600;
    const WIDTH = 50;
    const HEIGHT = 50;
    useEffect(() => {
        const newTiles: BoardTile[] = [];
        let index = 0;
        for (let i = 0; i < canvaswidth; i+=WIDTH) {
            for (let j = 0; j < canvasheight; j+=HEIGHT) {
                const tile: BoardTile = {
                    tileColor: generateRandomInt(1, 3),
                    cropLevel: 0,
                    waterLevel: generateRandomInt(0, 3),
                    sunlightLevel: generateRandomInt(0, 3),
                    xPos: i,
                    yPos: j,
                    width: WIDTH,
                    height: HEIGHT,
                    hasPlayer: false,
                    plantID: 0,
                    plantXP: 0,
                    index: index++
                };
                newTiles.push(tile);
            }
        }
        setTiles(newTiles);
      }, [canvaswidth, canvasheight])
  return (
    <div>
      <button onClick={() => save(1)}>Save Game</button>
      <button onClick={() => load(1)}>Load Game</button>
        <button onClick={handleUndo}>Undo</button>
     <button onClick={handleRedo}>Redo</button>
    {/* <button>Save Game</button>
    <button>Load Game</button>
    <button>Undo</button>
    <button>Redo</button>
       */}
      <Board boardTiles={tiles}></Board>
    </div>
  )
}

export default GameBoard;



//    