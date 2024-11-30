import "./style.css";
import Board from "./board.ts";
import Plant from "./plant.ts";
import Player from "./player.ts";

// Select or create the container where the button will be added
const container = document.getElementById("app") || document.body;
const canvas = document.createElement("canvas");
// Set up canvas
canvas.width = 1280;
canvas.height = 720;
container.appendChild(canvas);

const currentPlantChange = new Event("current-plant-changed");
const plantSpecies: Plant[] = [
  new Plant("purple", "flower1"),
  new Plant("brown", "flower2"),
  new Plant("white", "flower3"),
];

plantSpecies.map((plant) => {
  const button = document.createElement("button");
  button.innerHTML = plant.name;
  button.addEventListener("click", () => {
    dispatchEvent(currentPlantChange);
    currentPlant = plant;
  });
  container.appendChild(button);
});

// Setting Up Board and Player
const board = new Board(canvas);
const ctx = canvas.getContext("2d");
const player = new Player(board);
let currentPlant: Plant = plantSpecies[0];

if (ctx) {
  board.draw(ctx);
  player.draw(ctx, { x: 0, y: 0 });
}

// Handle player movement
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
        board.getSpace(player.position)?.placeHere(ctx, currentPlant);
        break;
    }
  }
});
