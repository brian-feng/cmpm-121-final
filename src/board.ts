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
        const color = Math.random() > 0.5 ? "green" : "aqua";
        const newPosition = { x: x, y: y };
        row.push(new BoardSpace(newPosition, color, this.width, this.height));
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

  sunlightLevel: number = generateRandomInt(0, 3);
  // after a turn sunlight should be lost
  waterLevel: number = generateRandomInt(0, 3);
  cropLevel: number = 0;
  harvestable: boolean = false;

  constructor(
    position: Position,
    _color: string,
    _width: number,
    _height: number,
  ) {
    this._color = _color;
    this.position = position;
    this._width = _width;
    this._height = _height;
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
        this.cropLevel++;
      }
      // Redraw only the plant without resetting the space
      item.draw(ctx, this.position, this._width, this._height, this.cropLevel);
    }
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