import Position from "./position.ts";
import Board from "./board.ts";
import BoardTile from "./boardTile.ts";

interface PlantType {
  index: number;
  color: string;
  name: string;
  gainXP: (board: Board, tileParam: BoardTile) => number;
}

// General function for XP calculation based on adjacent tiles and conditions
function calculateXPForAdjacentTiles(
  Board: Board,
  tileParam: BoardTile,
  condition: (tile: BoardTile) => boolean,
  xpIncrement: number
): number {
  let tempXP = 0;
  Board.getAdjacentTiles(tileParam).forEach((tile) => {
    if (condition(tile)) {
      tempXP += xpIncrement;
    }
  });
  return tempXP;
}

// Specific XP gain functions
function increaseXPForEachNonPlantTile(Board: Board, tileParam: BoardTile) {
  return calculateXPForAdjacentTiles(Board, tileParam, (tile) => tile.cropLevel === 0, 2);
}

function increaseXPForAdjacentPlants(Board: Board, tileParam: BoardTile) {
  return calculateXPForAdjacentTiles(Board, tileParam, (tile) => tile.cropLevel > 0, 1);
}

function increaseXPForAdjacentSamePlants(Board: Board, tileParam: BoardTile) {
  return calculateXPForAdjacentTiles(Board, tileParam, (tile) => tile.cropLevel > 0 && tile.plantID === tileParam.plantID, 2);
}

// Simplify plant definitions with generalized logic
const plants: PlantType[] = [
  {
    index: 1,
    color: "white",
    name: "White",
    gainXP: (board: Board, tileParam: BoardTile) =>
      increaseXPForAdjacentPlants(board, tileParam),
  },
  {
    index: 2,
    color: "purple",
    name: "Purple",
    gainXP: (board: Board, tileParam: BoardTile) =>
      increaseXPForAdjacentSamePlants(board, tileParam),
  },
  {
    index: 3,
    color: "brown",
    name: "Brown",
    gainXP: () => 10, // Fixed XP gain
  },
  {
    index: 4,
    color: "red",
    name: "Red",
    gainXP: (board: Board, tileParam: BoardTile) =>
      increaseXPForEachNonPlantTile(board, tileParam),
  },
];

// Utility functions to get plant data by index
export function getPlantsArray(): PlantType[] {
  return plants;
}

export function getPlantByIndex(index: number): PlantType {
  return plants[index - 1];
}

export function getPlantNameByIndex(index: number): string {
  return plants[index - 1].name;
}

export function getPlantColorByIndex(index: number): string {
  return plants[index - 1].color;
}

export function getXPIncreaseByIndex(
  index: number,
  board: Board,
  tile: BoardTile,
): number {
  const XPAmount = plants[index - 1].gainXP(board, tile);
  console.log(XPAmount);
  return XPAmount;
}