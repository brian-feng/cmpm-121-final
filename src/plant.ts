import Position from "./position.ts";
import Board from "./board.ts";
import BoardTile from "./boardTile.ts";
// export default class PlantType {
// future plans
// to select plant type
// the other plant will be normal class
// this is so that you can instantiate species with one class
// in the other class, the boardspace will instantiate it and
// automatically plant it on instantiation
// }



interface PlantType {
  index: number;
  color: string;
  name: string;
  gainXP: (board: Board, tileParam: BoardTile) => number;
}

function increaseXPForEachNonPlantTile(Board: Board, tileParam: BoardTile) {
  let tempXP = 0;
  Board.getAdjacentTiles(tileParam).forEach((tile) => {
    if (tile.cropLevel == 0) {
      tempXP += 2;
    }
  });
  return tempXP;
}
function increaseXPForAdjacentPlants(Board: Board, tileParam: BoardTile) {
  let tempXP = 0;
  console.log("Getting Adjacent Tiles");
  Board.getAdjacentTiles(tileParam).forEach((tile) => {
    console.log("Checking tile", tile);
    if (tile.cropLevel > 0) {
      tempXP += 1;
    }
  });
  return tempXP;
}

function increaseXPForAdjacentSamePlants(Board: Board, tileParam: BoardTile) {
  let tempXP = 0;
  Board.getAdjacentTiles(tileParam).forEach((tile) => {
    if (tile.cropLevel > 0 && tile.plantID == tileParam.plantID) {
      tempXP += 2;
    }
  });
  return tempXP;
}

const plants: PlantType[] = [
  { index: 1, color: "white", name: "White", gainXP: (board: Board, tileParam: BoardTile) => increaseXPForAdjacentPlants(board, tileParam) },
  { index: 2, color: "purple", name: "Purple", gainXP: (board: Board, tileParam: BoardTile) => increaseXPForAdjacentSamePlants(board, tileParam) },
  { index: 3, color: "brown", name: "Brown", gainXP: () => 10 },
  { index: 4, color: "red", name: "Red", gainXP: (board: Board, tileParam: BoardTile) => increaseXPForEachNonPlantTile(board, tileParam) },
];

export function getPlantsArray(): PlantType[] {
  return plants;
}

export function getPlantByIndex(index: number): PlantType {
  return plants[index-1];
}

export function getPlantNameByIndex(index: number): string {
  return plants[index-1].name;
}

export function getPlantColorByIndex(index: number): string {
  return plants[index-1].color;
}

export function getXPIncreaseByIndex(index: number, board: Board, tile: BoardTile): number {
  const XPAmount = plants[index-1].gainXP(board, tile);
  console.log(XPAmount);
  return XPAmount;
}


//Might be useless now, but not sure if its ready to delete

export default class Plant {
  color: number;
  name: number;
  constructor(color: number, name: number) {
    this.color = color;
    this.name = name;
  }
  placePlant() {
  }
  draw(ctx: CanvasRenderingContext2D, pos: Position, w: number, h: number, level: number) {
    ctx.fillStyle = this.color.toString();
  
    // Calculate the plant size based on the level
    let sizePercentage = 0;
    switch (level) {
      case 1:
        sizePercentage = 0.4; // 40%
        break;
      case 2:
        sizePercentage = 0.6; // 60%
        break;
      case 3:
        sizePercentage = 0.8; // 80%
        break;
      default:
        sizePercentage = 0.4; // Default to level 1 if the level is invalid
    }
  
    // Width and height based on %
    const newWidth = w * sizePercentage;
    const newHeight = h * sizePercentage;
  
    // Center the plant within the space
    ctx.fillRect(
      pos.x + (w - newWidth) / 2,  // Horizontal center alignment
      pos.y + (h - newHeight) / 2, // Vertical center alignment
      newWidth,
      newHeight
    );
  }
  
}
