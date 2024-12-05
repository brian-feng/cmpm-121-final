import "./style.css";
import Board from "./board.ts";
import Plant from "./plant.ts";
import Player from "./player.ts";
import { saveGame, loadGame } from "./aos.ts";
import BoardTile from "./boardTile.ts";

// Create the wrapper container
const container = document.getElementById("app") || document.body;
const wrapper = document.createElement("div");
wrapper.style.display = "flex";
wrapper.style.flexDirection = "column";
wrapper.style.alignItems = "center";
container.appendChild(wrapper);

// Set up canvas
const canvas = document.createElement("canvas");
canvas.width = 1280;
canvas.height = 720;
wrapper.appendChild(canvas);

// Show current plant
const currentPlantText = document.createElement("p");
currentPlantText.textContent = "Current Plant: None";
currentPlantText.style.marginTop = "10px";
currentPlantText.style.fontSize = "18px";
currentPlantText.style.fontWeight = "bold";
wrapper.appendChild(currentPlantText);

// Create a button container
const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.marginTop = "10px";
wrapper.appendChild(buttonContainer);

const currentPlantChange = new Event("current-plant-changed");
const plantSpecies: Plant[] = [
  new Plant(1, 1), //1 is purple
  new Plant(2, 2), //2 is brown
  new Plant(3, 3), //3 is white
];

let currentPlantID: number;

plantSpecies.map((plant) => {
  const button = document.createElement("button");
  let name = "";

  if(plant.name == 1) name = "Purple";
  else if (plant.name == 2) name = "Brown";
  else name = "White";

  button.innerHTML = name;
  button.style.margin = "5px";
  button.addEventListener("click", () => {
    dispatchEvent(currentPlantChange);
    currentPlantID = plant.color;
    currentPlantText.textContent = "Current Plant: " + name;
  });
  buttonContainer.appendChild(button);
});


// Old Setting Up Board and Player
// const board = new Board(canvas);
// const ctx = canvas.getContext("2d");
// const player = new Player(board);
// let currentPlant: Plant = plantSpecies[0];

/*
this would be the new board, save state 1 loaded initially but can be changed later
const board = loadGame(1, canvas);
const ctx = canvas.getContext("2d");
let currentPlant: Plant = plantSpecies[0];
*/

const boardTiles = loadGame(1, canvas);
const ctx = canvas.getContext("2d");
const board = new Board(ctx!, boardTiles);

console.log('boardtiles', boardTiles);
if (board.tiles.length > 0) {
  board.tiles.forEach(tile => {
    board.addTile(tile);
    if(tile.cropLevel > 0) board.drawPlant(ctx!, tile);
  });
  board.drawPlayer(ctx!);
}
// const player = new Player(canvas,board);
let currentPlant: Plant = plantSpecies[0];
// Set initial current plant text
currentPlantText.textContent = "Current Plant: " + "Purple";

// if (ctx) {
//   board.draw(ctx);
//   player.draw(ctx, { x: 0, y: 0 });
// }

// // Handle player movement

document.addEventListener("keydown", (event) => {
  if (ctx) {
    switch (event.key) {
      case "ArrowUp":
        board.playerMove(ctx, 0, -1);
        break;
      case "ArrowDown":
        board.playerMove(ctx, 0, 1);
        break;
      case "ArrowLeft":
        board.playerMove(ctx, -1, 0);
        break;
      case "ArrowRight":
        board.playerMove(ctx, 1, 0);
        break;
      case "w":
        board.playerMove(ctx, 0, -1);
        break;
      case "a":
        board.playerMove(ctx, -1, 0);
        break;
      case "s":
        board.playerMove(ctx, 0, 1);
        break;
      case "d":
        board.playerMove(ctx, 1, 0);
        break;
      case " ":
        event.preventDefault(); // Prevent the default spacebar action (scrolling, etc.)
        // if(board.getSpace(board.playerPos)?.getPlants().length == 0) {
        //   board.getSpace(board.playerPos)?.placeHere(ctx, currentPlant);
        // }
        // else{
        //   board.getSpace(board.playerPos)?.removeHere(ctx);
        // }
        // break;

        board.placeHere(ctx, currentPlantID, currentPlantID);
    }

    //draw plant here
    const space = board.getSpace(board.playerPos);
    // if (space) {
    //     plant.draw(ctx, {x: space.xPos, y: space.yPos}, space.width, space.height, space.cropLevel);
    //   };
    }
  }
);
const saveButton = document.createElement("button");
saveButton.innerHTML = "Save game";
saveButton.addEventListener("click", () => {
    saveGame(board.tiles, 1);
});
wrapper.appendChild(saveButton);

// // Advance time
// const timeButton = document.createElement("button");
// timeButton.innerHTML = "Advance Time";
// timeButton.addEventListener("click", () => {
//   if(ctx){
//     board.advanceTime(ctx);
//   }
//   if (board.getLevel3Plants() >= 10) {
//     alert("You win!");
//   }
// });
// wrapper.appendChild(timeButton);