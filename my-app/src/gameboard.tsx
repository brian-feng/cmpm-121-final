import React from 'react';
import {useEffect, useState} from 'react';
import Board from './board';
import { BoardTile } from './boardTile';
import generateRandomInt from './random';
const WIDTH: number = 50;
const HEIGHT: number = 50;

function GameBoard({canvaswidth, canvasheight}) {
    // THIS IS THE AOS FILE
    // const [tiles, setTiles] = useState<BoardTile[]>([]);

    const [tiles, setTiles] = useState<BoardTile[]>([]);
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
      <Board boardTiles={tiles}></Board>
  )
}

export default GameBoard;