import "./style.css";

const SpaceWidth = 50;
const SpaceHeight = 50;



// Select or create the container where the button will be added
const container = document.getElementById("app") || document.body;
const canvas = document.createElement("canvas");

canvas.width = 1280;
canvas.height = 720;
container.appendChild(canvas);

class BoardSpace {
  private _x: number;
  private _y: number;
  private _color: string;

  sunlightLevel: number = 0;
  waterLevel: number = 0;
  cropLevel: number = 0;
  harvestable: boolean = false;

  constructor(x: number, y: number, color: string) {
    this._x = x;
    this._y = y;
    this._color = color;
  }

  changeColor(color: string) {
    this._color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this._color;
    ctx.fillRect(this._x, this._y, SpaceWidth, SpaceHeight);
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this._x + SpaceWidth/4, this._y + SpaceHeight/4, SpaceWidth/2, SpaceHeight/2);
  }

  erasePlayer(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this._color;
    ctx.fillRect(this._x, this._y, SpaceWidth, SpaceHeight);
  }
}

class Board {
  private _spaces: BoardSpace[][] = [];
  playerPosition = { x: 0, y: 0 };

  constructor() {
    for (let x = 0; x < canvas.width - SpaceWidth; x += SpaceWidth + 1) {
      const row: BoardSpace[] = [];
      for (let y = 0; y < canvas.height - SpaceHeight; y += SpaceHeight + 1) {
        // Select a random color
        const color = Math.random() > 0.5 ? "green" : "aqua";
        row.push(new BoardSpace(x, y, color));
      }
      this._spaces.push(row);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this._spaces.forEach((row) => row.forEach((space) => space.draw(ctx)));
  }

  movePlayer(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Check if the new position is inside the board
    if (this.playerPosition.x + x >= 0 && this.playerPosition.x + x < this._spaces.length && this.playerPosition.y + y >= 0 && this.playerPosition.y + y < this._spaces[0].length) {
      this._spaces[this.playerPosition.x][this.playerPosition.y].erasePlayer(ctx);
      this.playerPosition.x += x;
      this.playerPosition.y += y;
      this._spaces[this.playerPosition.x][this.playerPosition.y].drawPlayer(ctx);
    }
  }

  getCurrentSpace() {
    return this._spaces[this.playerPosition.x][this.playerPosition.y];
  }
}

const board = new Board();
const ctx = canvas.getContext("2d");

if (ctx) {
  board.draw(ctx);
  board.movePlayer(ctx, 0, 0);
}

document.addEventListener("keydown", (event) => {
  if (ctx) {
    switch (event.key) {
      case "ArrowUp":
        board.movePlayer(ctx, 0, -1);
        break;
      case "ArrowDown":
        board.movePlayer(ctx, 0, 1);
        break;
      case "ArrowLeft":
        board.movePlayer(ctx, -1, 0);
        break;
      case "ArrowRight":
        board.movePlayer(ctx, 1, 0);
        break;
      case " ":
        board.getCurrentSpace().changeColor("yellow");
        board.getCurrentSpace().draw(ctx);
        board.getCurrentSpace().drawPlayer(ctx);
        break;
    }
  }
});