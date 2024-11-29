import "./style.css";

const SpaceWidth = 50;
const SpaceHeight = 50;

// Select or create the container where the button will be added
const container = document.getElementById("app") || document.body;
const canvas = document.createElement("canvas");

canvas.width = 1280;
canvas.height = 720;
container.appendChild(canvas);

interface Position {
  x: number;
  y: number;
}

const currentPlantChange = new Event("current-plant-changed");

class Plant {
  color: string;
  name: string;
  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
    const button = document.createElement("button");
    button.innerHTML = this.name;
    container.append(button);
    button.addEventListener("click", () => {
      console.log(this.name, "has been clicked");
      dispatchEvent(currentPlantChange);
    });
  }
  placePlant() {
  }
}

const plantSpecies: Plant[] = [
  new Plant("purple", "flower1"),
  new Plant("brown", "flower2"),
  new Plant("white", "flower3"),
];

let currentPlant: Plant = plantSpecies[0];

class BoardSpace {
  private _x: number;
  private _y: number;
  private _color: string;
  position: Position;

  sunlightLevel: number = generateRandomInt(0, 3);
  // after a turn sunlight should be lost
  waterLevel: number = generateRandomInt(0, 3);
  cropLevel: number = 0;
  harvestable: boolean = false;
  plant: Plant = currentPlant;

  constructor(x: number, y: number, color: string) {
    this._x = x;
    this._y = y;
    this._color = color;
    this.position = { x: x, y: y };
  }

  changeColor(color: string) {
    this._color = color;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this._color;
    ctx.fillRect(this._x, this._y, SpaceWidth, SpaceHeight);
  }

  refreshSpace(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this._color;
    ctx.fillRect(this._x, this._y, SpaceWidth, SpaceHeight);
  }
}

class Player {
  position: Position = { x: 0, y: 0 };

  move(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const currentSpace = board.getSpace(this.position.x, this.position.y);
    this.position.x += x;
    this.position.y += y;
    const newSpace = board.getSpace(this.position.x, this.position.y);
    if (currentSpace && newSpace) {
      currentSpace.refreshSpace(ctx);
      console.log("playerPos: ", this.position);
      this.draw(ctx, newSpace.position);
    } else {
      this.position.x -= x;
      this.position.y -= y;
    }
  }

  draw(ctx: CanvasRenderingContext2D, spacePosition: Position) {
    ctx.fillStyle = "black";
    // refactor to have specific player size
    ctx.fillRect(
      spacePosition.x + SpaceWidth / 4,
      spacePosition.y + SpaceHeight / 4,
      SpaceWidth / 2,
      SpaceHeight / 2,
    );
  }
}

class Board {
  spaces: BoardSpace[][] = [];
  constructor() {
    for (let x = 0; x < canvas.width - SpaceWidth; x += SpaceWidth + 1) {
      const row: BoardSpace[] = [];
      for (let y = 0; y < canvas.height - SpaceHeight; y += SpaceHeight + 1) {
        // Select a random color
        const color = Math.random() > 0.5 ? "green" : "aqua";
        row.push(new BoardSpace(x, y, color));
      }
      this.spaces.push(row);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.spaces.forEach((row) => row.forEach((space) => space.draw(ctx)));
  }

  getSpace(x: number, y: number) {
    console.log("position: ", x, y);
    if (this.spaces[x] && this.spaces[x][y] !== undefined) {
      // check if space exists
      return this.spaces[x][y];
    }
  }
}

// Setting Up Board and Player
const board = new Board();
const ctx = canvas.getContext("2d");
const player = new Player();
if (ctx) {
  board.draw(ctx);
  player.draw(ctx, { x: 0, y: 0 });
}

document.addEventListener("keydown", (event) => {
  if (ctx) {
    switch (event.key) {
      case "ArrowUp":
        player.move(ctx, 0, -1);
        break;
      case "ArrowDown":
        player.move(ctx, 0, 1);
        break;
      case "ArrowLeft":
        player.move(ctx, -1, 0);
        break;
      case "ArrowRight":
        player.move(ctx, 1, 0);
        break;
      case " ":
        board.getSpace(player.position.x, player.position.y)!
          .changeColor("yellow");
        break;
    }
  }
});

function generateRandomInt(min: number, max: number) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
