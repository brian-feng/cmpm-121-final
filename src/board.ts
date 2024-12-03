import generateRandomInt from "./random.ts";
import Plant from "./plant.ts";
import Position from "./position.ts";

const SPACEWIDTH: number = 50;
const SPACEHEIGHT: number = 50;
export default class Board {
  spaces: BoardSpace[][] = [];
  width: number = SPACEWIDTH;
  height: number = SPACEHEIGHT;
  constructor(canvas: HTMLCanvasElement) {
    for (let x = 0; x < canvas.width - this.width; x += this.width + 1) {
      const row: BoardSpace[] = [];
      for (let y = 0; y < canvas.height - this.height; y += this.height + 1) {
        // Select a random color
        const color = Math.random() > 0.5 ? "green" : "lightgreen";
        const newPosition = { x: x, y: y };
        row.push(new BoardSpace(newPosition, color, this.width, this.height, this));
      }
      this.spaces.push(row);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.spaces.forEach((row) => row.forEach((space) => space.draw(ctx)));
  }

  advanceTime(ctx: CanvasRenderingContext2D) {
    this.spaces.forEach((row) => 
      row.forEach((space) => {
        // There is an advanceTime function for each space
        space.advanceTime(ctx);
      })
    );
  }

  getLevel3Plants() {
    //Get count of level 3 plants and return as int
    let count: number = 0;
    this.spaces.forEach((row) => 
      row.forEach((space) => {
        if (space.cropLevel == 3) {
          count++;
        }
      }
    )
    );
    return count;
  }
  

  getSpace(pos: Position) {
    console.log("position: ", pos);
    if (this.spaces[pos.x] && this.spaces[pos.x][pos.y] !== undefined) {
      // check if space exists
      return this.spaces[pos.x][pos.y];
    }
  }
}

class BoardSpace {
  position: Position;
  private _color: string;
  private _width: number;
  private _height: number;
  private _inventory: Array<Plant> = [];
  private _boardReference: Board;

  sunlightLevel: number = generateRandomInt(0, 3);
  // after a turn sunlight should be lost
  waterLevel: number = generateRandomInt(0, 3);
  plantXP: number = 0;
  cropLevel: number = 0;
  harvestable: boolean = false;

  constructor(
    position: Position,
    _color: string,
    _width: number,
    _height: number,
    _board: Board
  ) {
    this._color = _color;
    this.position = position;
    this._width = _width;
    this._height = _height;
    this._boardReference = _board;
    console.log("Creating: " + this.position.x / 51 + ", " + this.position.y/51);
  }

  changeColor(color: string) {
    this._color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this._color;
    ctx.fillRect(this.position.x, this.position.y, this._width, this._height);
  }

  placeHere(ctx: CanvasRenderingContext2D, plant: Plant) {
    this._inventory.push(plant);
    this.cropLevel = 1;
    plant.draw(ctx, this.position, this._width, this._height, this.cropLevel);
  }

  removeHere(ctx: CanvasRenderingContext2D){
    this._inventory = [];
    this.cropLevel = 0;
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, this._width, this._height);
    ctx.fillStyle = this._color;
  }

  refreshSpace(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    for (const item of this._inventory) {
      item.draw(ctx, this.position, this._width, this._height, this.cropLevel);
    }
  }


  //This function will need to be edited.
  // Currently every plant just "levels" without any input.
  // We need to account for water/sun/nearby plants
  // We also need to update incoming water and sun to be randomly changed each turn
  advanceTime(ctx: CanvasRenderingContext2D) {
    // Increase the level of the crops on this plot
    for (const item of this._inventory) {
      if (this.cropLevel < 3 && this.cropLevel > 0) {
        if (this.waterLevel > 0 && this.sunlightLevel > 0) {
          this.plantXP += this.waterLevel + this.sunlightLevel;
        }
        if (this.plantXP > 5) {
          this.cropLevel += 1;
          this.plantXP = 0;
        }
      }
      // Adjust thte sunlight and water levels
      this.waterLevel = this.getAdjacentWaters();
      this.sunlightLevel = generateRandomInt(0, 3);

      // Redraw only the plant without resetting the space
      item.draw(ctx, this.position, this._width, this._height, this.cropLevel);
    }
  }

  getAdjacentWaters() {
    let adjWaters: number = 0;
    const tempX = this.position.x/51;
    const tempY = this.position.y/51;
    if (tempX > 1) {
      adjWaters += this._boardReference.spaces[tempX - 1][tempY].waterLevel;
    }
    if (tempX < 24) {
      adjWaters += this._boardReference.spaces[tempX + 1][tempY].waterLevel;
    }
    if (tempY > 1) {
      adjWaters += this._boardReference.spaces[tempX][tempY - 1].waterLevel;
    }
    if (tempY < 13) {
      adjWaters += this._boardReference.spaces[tempX][tempY + 1].waterLevel;
    }
    return adjWaters / 2 ;
  }

  getPlants() {
    return this._inventory;
  }

  getWidth(){
    return this._width;
  }

  getHeight(){
    return this._height;
  }
  

}