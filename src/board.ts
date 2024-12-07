import generateRandomInt from "./random.ts";
import "./plant.ts";
import Position from "./position.ts";
import BoardTile from "./boardTile.ts";
import { getPlantColorByIndex, getXPIncreaseByIndex } from "./plant.ts";
import { initGameSettings, type GameSettings } from "./externalDSLParser.ts";

const SPACEWIDTH: number = 50;
const SPACEHEIGHT: number = 50;
export default class Board {
  width: number = SPACEWIDTH;
  height: number = SPACEHEIGHT;
  tiles: BoardTile[];
  ctx: CanvasRenderingContext2D;
  playerPos: Position;
  gameSettings: GameSettings | null;
  // amtHarvested: number;
  constructor(ctx: CanvasRenderingContext2D, tiles: BoardTile[], gameSettings: GameSettings) {
    this.gameSettings = gameSettings;
    this.tiles = tiles;
    this.ctx = ctx;
    this.playerPos = { x: 0, y: 0 }; // render default position if no playerTile
    const playerTile = tiles.find((tile) => tile.hasPlayer == true);
    if (playerTile) {
      this.playerPos = { x: playerTile.xPos, y: playerTile.yPos };
    };
    // if (amtHarvested) {
    //   this.amtHarvested = amtHarvested;
    // } else {
    //   this.amtHarvested = 0;
    // }
    this.drawPlayer(ctx);
  }

  addTile(tile: BoardTile) {
    this.tiles.push(tile);
    if (tile.tileColor == 1) this.ctx!.fillStyle = this.gameSettings!.board_info.board_colors[0]!;
    else this.ctx!.fillStyle = this.gameSettings!.board_info.board_colors[1]!;
    this.ctx!.fillRect(tile.xPos, tile.yPos, tile.width, tile.height);

    if (tile.cropLevel > 0) this.drawPlant(this.ctx, tile);
  }

  drawTile(ctx: CanvasRenderingContext2D, tile: BoardTile) {
    if (tile.tileColor == 1) ctx.fillStyle = this.gameSettings!.board_info.board_colors[0]!;
    else ctx.fillStyle = this.gameSettings!.board_info.board_colors[1]!;
    
    ctx.fillRect(tile.xPos, tile.yPos, tile.width, tile.height);

    if(tile.cropLevel > 0) this.drawPlant(ctx, tile);
  }

  advanceTime(ctx: CanvasRenderingContext2D) {
    this.tiles.forEach((tile) => {
      // There is an advanceTime function for each tile
      if (tile.cropLevel < 3 && tile.cropLevel > 0) {
        //!Sunlight and water level might need tweaking, confusing when plants dont grow properly
        if (tile.waterLevel > 0 && tile.sunlightLevel > 0) {
          if (tile.plantID != 0) tile.plantXP += getXPIncreaseByIndex(tile.plantID, this, tile);
        }
        if (tile.plantXP >= 10) {
          tile.cropLevel += 1;
          tile.plantXP = 0;
        }
      }
      // Adjust thte sunlight and water levels
      tile.waterLevel = this.getAdjacentWaters(tile);
      tile.sunlightLevel = generateRandomInt(0, 3);
      // Redraw only the plant without resetting the space
      this.refreshSpace(ctx, tile);
    });
  }

  getLevel3Plants() {
    //Get count of level 3 plants and return as int
    let count: number = 0;
    console.log(this.tiles);
    this.tiles.forEach((tile) => {
      if (tile.cropLevel == 3) {
        count++;
      }
    });
    console.log(count);
    return count;
  }

  getAdjacentTiles(tile: BoardTile): BoardTile[] {
    let adjTiles: BoardTile[] = [];
    const tempX = tile.xPos;
    const tempY = tile.yPos;
    if (tempX > 1) {
      const tempTile = this.getSpace({ x: tempX - 51, y: tempY });
      if (tempTile)
        adjTiles.push(tempTile);
    }
    if (tempX < 24 * 51) {
      const tempTile = this.getSpace({ x: tempX + 51, y: tempY });
      if (tempTile)
        adjTiles.push(tempTile);
    }
    if (tempY > 1) {
      const tempTile = this.getSpace({ x: tempX, y: tempY - 51 });
      if (tempTile)
        adjTiles.push(tempTile);
    }
    if (tempY < 13 * 51) {
      const tempTile = this.getSpace({ x: tempX, y: tempY + 51 });
      if (tempTile)
        adjTiles.push(tempTile);
    }
    return adjTiles;
  }
  
  // Might delete this function
  getAdjacentWaters(tile: BoardTile) {
    let adjWaters: number = 0;
    const tempX = tile.xPos;
    const tempY = tile.yPos;
    // const tempX = this.position.x/51;
    // const tempY = this.position.y/51;
    if (tempX > 1) {
      const tempTile = this.getSpace({x: tempX - 51,y: tempY});
      if (tempTile)
        adjWaters += tempTile.waterLevel;
    }
    if (tempX < 24) {
      const tempTile = this.getSpace({ x: tempX + 51, y: tempY });
      if (tempTile)
        adjWaters += tempTile.waterLevel;
    }
    if (tempY > 1) {
      const tempTile = this.getSpace({ x: tempX, y: tempY - 51 });
      if (tempTile)
        adjWaters += tempTile.waterLevel;
    }
    if (tempY < 13) {
      const tempTile = this.getSpace({ x: tempX, y: tempY + 51 });
      if (tempTile)
        adjWaters += tempTile.waterLevel;
    }
    return adjWaters / 1.7;
  }

  getSpace(pos: Position) {
    const found = this.tiles.find(tile => tile.xPos == pos.x && tile.yPos == pos.y);
    if (found) {
      return found;
    }
    else{
      console.log("not found");
    }
  }
  refreshSpace(ctx: CanvasRenderingContext2D, tile: BoardTile) {
        this.drawTile(ctx, tile);
        if(tile.cropLevel > 0){
          this.drawPlant(ctx, tile);
        }
        if (tile.hasPlayer) {
          this.drawPlayer(ctx);
        }
  }

  playerMove(ctx: CanvasRenderingContext2D, x: number, y: number){
    //const prevPos = {currX, currY};
    const currPos = this.getSpace(this.playerPos);
    if (currPos) {
       this.playerPos.x += x * 51;
       this.playerPos.y += y * 51;


       const newPos = this.getSpace(this.playerPos);
      if (newPos) {
        console.log('newPos: ', newPos);
        this.refreshSpace(ctx, currPos);
        // this.playerPos = {x: newX, y: newY};
        this.drawPlayer(ctx);
        currPos.hasPlayer = false;
        newPos.hasPlayer = true;
      } else {
        this.playerPos.x -=  x * 51;
        this.playerPos.y -= y * 51;
      }
    }
  }

  drawPlayer(ctx: CanvasRenderingContext2D){
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile)
      currentTile.hasPlayer = true;
    ctx.fillStyle="black";
    ctx.fillRect(this.playerPos.x, this.playerPos.y, this.width, this.height);

    if (currentTile?.cropLevel! > 0) this.drawPlant(ctx, currentTile!);
  }

  harvestHere(ctx: CanvasRenderingContext2D) {
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile) {
      if (currentTile.cropLevel > 0) {
        currentTile.plantID = 0;
        currentTile.plantXP = 0;
        currentTile.cropLevel = 0;
        this.refreshSpace(ctx, currentTile);
      }
    }
  }

  placeHere(ctx: CanvasRenderingContext2D, plantID: number){
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile){
      if (currentTile.plantID == 0) {
        currentTile.plantID = plantID;
        currentTile.cropLevel = 1;
        this.drawPlant(ctx, currentTile);
      } else {
        this.harvestHere(ctx);
      }
    }
  }

  drawPlant(ctx: CanvasRenderingContext2D, tile: BoardTile){
    if (tile.plantID != 0) ctx.fillStyle = getPlantColorByIndex(tile.plantID);

    let sizePercentage = 0;
    if (tile.cropLevel == 1) {
      sizePercentage = 0.4;
    } else if (tile.cropLevel == 2) {
      sizePercentage = 0.6;
    } else {
      sizePercentage = 0.8;
    }

    const newWidth = tile.width * sizePercentage;
    const newHeight = tile.height * sizePercentage;

    ctx.fillRect(
      tile.xPos + (tile.width - newWidth) / 2,
      tile.yPos + (tile.height - newHeight) / 2,
      newWidth,
      newHeight,
    );
  }

  setTiles(tiles: BoardTile[]) {
    this.tiles = tiles;
  }
}