import generateRandomInt from "./random.ts";
import Plant from "./plant.ts";
import Position from "./position.ts";
import BoardTile from "./boardTile.ts";

const SPACEWIDTH: number = 50;
const SPACEHEIGHT: number = 50;
export default class Board {
  width: number = SPACEWIDTH;
  height: number = SPACEHEIGHT;
  tiles: BoardTile[];
  ctx: CanvasRenderingContext2D;
  playerPos: Position;
  constructor(ctx: CanvasRenderingContext2D, tiles: BoardTile[]) {
    this.tiles = tiles;
    this.ctx = ctx;
    this.playerPos = {x: 0, y: 0} // render default position if no playerTile
    const playerTile = tiles.find((tile) => tile.hasPlayer == true);
    if (playerTile) {
      this.playerPos = {x: playerTile.xPos, y: playerTile.yPos}
      console.log('playerTile pos: ', playerTile.xPos, playerTile.yPos);
    };
    
    this.drawPlayer(ctx);
  }
  
  addTile(tile: BoardTile) {
    this.tiles.push(tile);
    if (tile.tileColor == 1) this.ctx!.fillStyle = "green";
    else this.ctx!.fillStyle = "lime";
    this.ctx!.fillRect(tile.xPos, tile.yPos, tile.width, tile.height);

    if(tile.cropLevel > 0) this.drawPlant(this.ctx, tile);
  }

  drawTile(ctx: CanvasRenderingContext2D, tile: BoardTile) {
    if (tile.tileColor == 1) this.ctx!.fillStyle = "green";
      else this.ctx!.fillStyle = "lime";
      this.ctx!.fillRect(tile.xPos, tile.yPos, tile.width, tile.height);  

  }

  advanceTime(ctx: CanvasRenderingContext2D, tile: BoardTile) {
    this.tiles.forEach((tile) => {
        // There is an advanceTime function for each tile
        if (tile.cropLevel < 3 && tile.cropLevel > 0) {
          if (tile.waterLevel > 0 && tile.sunlightLevel > 0) {
            tile.plantXP += tile.waterLevel + tile.sunlightLevel;
          }
          if (tile.plantXP > 5) {
            tile.cropLevel += 1;
            tile.plantXP = 0;
          }
        }
        // Adjust thte sunlight and water levels
        tile.waterLevel = this.getAdjacentWaters(tile);
        tile.sunlightLevel = generateRandomInt(0, 3);
  
        // Redraw only the plant without resetting the space
        // item.draw(ctx, tile.position, tile._width, tile._height, tile.cropLevel);
        // TODO: create an advanceTime function
      })
  }

  getLevel3Plants() {
    //Get count of level 3 plants and return as int
    let count: number = 0;
    this.tiles.forEach((tile) => {
      if (tile.cropLevel == 3) {
        count++;
      }
    });
    return count;
  }
  
  getAdjacentWaters(tile: BoardTile) {
        let adjWaters: number = 0;
        const tempX = tile.xPos;
        const tempY = tile.yPos;
        // const tempX = this.position.x/51;
        // const tempY = this.position.y/51;
        if (tempX > 1) {
          const tempTile = this.getSpace({x: tempX - 1,y: tempY});
          if (tempTile)
            adjWaters += tempTile.waterLevel;
        }
        if (tempX < 24) {
          const tempTile = this.getSpace({x: tempX + 1,y: tempY});
          if (tempTile)
            adjWaters += tempTile.waterLevel;
        }
        if (tempY > 1) {
          const tempTile = this.getSpace({x: tempX,y: tempY - 1});
          if (tempTile)
            adjWaters += tempTile.waterLevel;
        }
        if (tempY < 13) {
          const tempTile = this.getSpace({x: tempX,y: tempY + 1});
          if (tempTile)
            adjWaters += tempTile.waterLevel;
        }
        return adjWaters / 2 ;
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
        //tile.draw(ctx, )
        // for (const item of this.tiles) {
        //   // item.draw(ctx, this.position, this._width, this._height, this.cropLevel);
        //   this.drawTile(ctx, item)
        // }
  }
/*
  move(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // TODO: refactor!!
    const prevSpace = this.board.getSpace(this.pos);
    this.pos.x += x;
    this.pos.y += y;
    const newSpace = this.board.getSpace(this.pos);
    if (prevSpace && newSpace) {
      this.board.refreshSpace(ctx, prevSpace);
      console.log("playerPos: ", this.pos);
      this.draw(ctx);
    } else {
      this.pos.x -= x;
      this.pos.y -= y;
    }
  }
  */

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

    // currPos.hasPlayer = false;
    // newPos.hasPlayer = true;
   
    
  }

  drawPlayer(ctx: CanvasRenderingContext2D){
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile)
      currentTile.hasPlayer = true;
    ctx.fillStyle="black";
    ctx.fillRect(this.playerPos.x, this.playerPos.y, this.width, this.height);

    if (currentTile?.cropLevel! > 0) this.drawPlant(ctx, currentTile!);
  }

  placeHere(ctx: CanvasRenderingContext2D, plantName: number, plantColor: number){
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile){
      currentTile.plantName = plantName;
      currentTile.plantColor = plantColor;
      currentTile.cropLevel = 1;
      this.drawPlant(ctx, currentTile);
    }
  }

  drawPlant(ctx: CanvasRenderingContext2D, tile: BoardTile){
    if(tile.plantColor == 1){
      ctx.fillStyle = "purple";
    }
    else if (tile.plantColor == 2){
      ctx.fillStyle = "brown";
    }
    else{
      ctx.fillStyle = "white";
    }

    let sizePercentage = 0;
    if(tile.cropLevel == 1){
      sizePercentage = 0.4;
    }
    else if(tile.cropLevel == 2){
      sizePercentage = 0.6;
    }
    else {
      sizePercentage = 0.8;
    }

    const newWidth = tile.width * sizePercentage;
    const newHeight = tile.height * sizePercentage;

    ctx.fillRect(
      tile.xPos + (tile.width - newWidth) / 2,
      tile.yPos + (tile.height - newHeight) / 2,
      newWidth,
      newHeight
    );
  }
}

// class BoardSpace {
//   position: Position;
//   private _color: string;
//   private _width: number;
//   private _height: number;
//   private _inventory: Array<Plant> = [];
//   // private _boardReference: Board;

//   sunlightLevel: number = generateRandomInt(0, 3);
//   // after a turn sunlight should be lost
//   waterLevel: number = generateRandomInt(0, 3);
//   plantXP: number = 0;
//   cropLevel: number = 0;
//   harvestable: boolean = false;

//   constructor(
//     position: Position,
//     _color: string,
//     _width: number,
//     _height: number,
//     // _board: BoardTile[];
//   ) {
//     this._color = _color;
//     this.position = position;
//     this._width = _width;
//     this._height = _height;
//     // this._boardReference = _board;
//     console.log("Creating: " + this.position.x / 51 + ", " + this.position.y/51);
//   }

//   changeColor(color: string) {
//     this._color = color;
//   }

//   draw(ctx: CanvasRenderingContext2D) {
//     ctx.fillStyle = this._color;
//     ctx.fillRect(this.position.x, this.position.y, this._width, this._height);
//   }

//   placeHere(ctx: CanvasRenderingContext2D, plant: Plant) {
//     this._inventory.push(plant);
//     this.cropLevel = 1;
//     plant.draw(ctx, this.position, this._width, this._height, this.cropLevel);
//   }

//   removeHere(ctx: CanvasRenderingContext2D){
//     this._inventory = [];
//     this.cropLevel = 0;
//     ctx.fillStyle = "black";
//     ctx.fillRect(this.position.x, this.position.y, this._width, this._height);
//     ctx.fillStyle = this._color;
//   }

//   refreshSpace(ctx: CanvasRenderingContext2D) {
//     this.draw(ctx);
//     for (const item of this._inventory) {
//       item.draw(ctx, this.position, this._width, this._height, this.cropLevel);
//     }
//   }


//   //This function will need to be edited.
//   // Currently every plant just "levels" without any input.
//   // We need to account for water/sun/nearby plants
//   // We also need to update incoming water and sun to be randomly changed each turn
//   advanceTime(ctx: CanvasRenderingContext2D) {
//     // Increase the level of the crops on this plot
//     for (const item of this._inventory) {
//       if (this.cropLevel < 3 && this.cropLevel > 0) {
//         if (this.waterLevel > 0 && this.sunlightLevel > 0) {
//           this.plantXP += this.waterLevel + this.sunlightLevel;
//         }
//         if (this.plantXP > 5) {
//           this.cropLevel += 1;
//           this.plantXP = 0;
//         }
//       }
//       // Adjust thte sunlight and water levels
//       this.waterLevel = this.getAdjacentWaters();
//       this.sunlightLevel = generateRandomInt(0, 3);

//       // Redraw only the plant without resetting the space
//       item.draw(ctx, this.position, this._width, this._height, this.cropLevel);
//     }
//   }

//   getAdjacentWaters() {
//     let adjWaters: number = 0;
//     const tempX = this.position.x/51;
//     const tempY = this.position.y/51;
//     // if (tempX > 1) {
//     //   adjWaters += this._board[tempX - 1][tempY].waterLevel;
//     // }
//     // if (tempX < 24) {
//     //   adjWaters += this._board[tempX + 1][tempY].waterLevel;
//     // }
//     // if (tempY > 1) {
//     //   adjWaters += this._board[tempX][tempY - 1].waterLevel;
//     // }
//     // if (tempY < 13) {
//     //   adjWaters += this._board[tempX][tempY + 1].waterLevel;
//     // }
//     return adjWaters / 2 ;
//   }

//   getPlants() {
//     return this._inventory;
//   }

//   getWidth(){
//     return this._width;
//   }

//   getHeight(){
//     return this._height;
//   }
  

// }