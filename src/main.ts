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
  new Plant("purple", "flower1"),
  new Plant("brown", "flower2"),
  new Plant("white", "flower3"),
];

plantSpecies.map((plant) => {
  const button = document.createElement("button");
  button.innerHTML = plant.name;
  button.style.margin = "5px";
  button.addEventListener("click", () => {
    dispatchEvent(currentPlantChange);
    currentPlant = plant;
    currentPlantText.textContent = "Current Plant: " + plant.name;
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

const board = loadGame(1, canvas);
const ctx = canvas.getContext("2d");
// const player = new Player(canvas,board);
let currentPlant: Plant = plantSpecies[0];
// Set initial current plant text
currentPlantText.textContent = "Current Plant: " + currentPlant.name;

// if (ctx) {
//   board.draw(ctx);
//   player.draw(ctx, { x: 0, y: 0 });
// }

// // Handle player movement

// document.addEventListener("keydown", (event) => {
//   if (ctx) {
//     switch (event.key) {
//       case "ArrowUp":
//         player.move(ctx, 0, -1);
//         break;
//       case "ArrowDown":
//         player.move(ctx, 0, 1);
//         break;
//       case "ArrowLeft":
//         player.move(ctx, -1, 0);
//         break;
//       case "ArrowRight":
//         player.move(ctx, 1, 0);
//         break;
//       case "w":
//         player.move(ctx, 0, -1);
//         break;
//       case "a":
//         player.move(ctx, -1, 0);
//         break;
//       case "s":
//         player.move(ctx, 0, 1);
//         break;
//       case "d":
//         player.move(ctx, 1, 0);
//         break;
//       case " ":
//         event.preventDefault(); // Prevent the default spacebar action (scrolling, etc.)
//         if(board.getSpace(player.position)?.getPlants().length == 0) {
//           board.getSpace(player.position)?.placeHere(ctx, currentPlant);
//         }
//         else{
//           board.getSpace(player.position)?.removeHere(ctx);
//         }
//         break;
//     }

//     //draw plant here
//     const space = board.getSpace(player.position);
//     if (space) {
//       space.getPlants().forEach((plant) => {
//         plant.draw(ctx, space.position, space.getWidth(), space.getHeight(), space.cropLevel);
//       });
//     }
//   }
// });


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