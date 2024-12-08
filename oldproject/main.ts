import "./style.css";
import Board from "./board.ts";
import "./plant.ts";
import Player from "./player.ts";
import { loadGame, redo, saveGame, undo } from "./aos.ts";
import BoardTile from "./boardTile.ts";
import { getPlantByIndex, getPlantsArray } from "./plant.ts";
import { GameSettings, initGameSettings } from "./externalDSLParser.ts";

// Call the function to initialize the settings
const gameSettings = await initGameSettings();

// Create the wrapper container
const container = document.getElementById("app") || document.body;
const wrapper = document.createElement("div");
wrapper.style.display = "flex";
wrapper.style.flexDirection = "column";
wrapper.style.alignItems = "center";
container.appendChild(wrapper);

// Set up canvas
const canvas = document.createElement("canvas");
canvas.width = gameSettings?.board_info.board_size_pixels[0]!;
canvas.height = gameSettings?.board_info.board_size_pixels[1]!;
wrapper.appendChild(canvas);

// Show current plant
const currentPlantText = document.createElement("p");
currentPlantText.textContent = "Current Plant: None";
currentPlantText.style.marginTop = "10px";
currentPlantText.style.fontSize = "18px";
currentPlantText.style.fontWeight = "bold";
wrapper.appendChild(currentPlantText);

// win condition text
const winText = document.createElement("p");
winText.textContent = gameSettings?.win.human_instructions!;
winText.style.marginTop = "10px";
winText.style.fontSize = "18px";
winText.style.fontWeight = "bold";
wrapper.appendChild(winText);

// Create a button container
const buttonContainer = document.createElement("div");
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.marginTop = "10px";
wrapper.appendChild(buttonContainer);

const currentPlantChange = new Event("current-plant-changed");

let currentPlantID: number;
currentPlantID = 1;

getPlantsArray().map((plant) => {
  const button = document.createElement("button");
  const name = plant.name;

  button.innerHTML = name;
  button.style.margin = "10px";
  button.addEventListener("click", () => {
    dispatchEvent(currentPlantChange);
    currentPlantID = plant.index;
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

const loadSave: number = getFileNumber();
const boardTiles = loadGame(loadSave, canvas, gameSettings!);
//saveGame(boardTiles, loadSave);
const ctx = canvas.getContext("2d");
const board = new Board(ctx!, boardTiles, gameSettings!);

console.log("boardtiles", boardTiles);
if (board.tiles.length > 0) {
  board.tiles.forEach((tile) => {
    board.drawTile(ctx!, tile);
    if (tile.cropLevel > 0) board.drawPlant(ctx!, tile);
  });
  board.drawPlayer(ctx!);
}

// const player = new Player(canvas,board);
let currentPlant = getPlantByIndex(0);
// Set initial current plant text
currentPlantText.textContent = "Current Plant: White";
// if(board.getSpace(board.playerPos)?.plantName == 1) currentPlantText.textContent += "Purple";
// else if(board.getSpace(board.playerPos)?.plantName == 2) currentPlantText.textContent += "Brown";
// else currentPlantText.textContent += "White";
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
        board.placeHere(ctx, currentPlantID);
    }

    //draw plant here
    const space = board.getSpace(board.playerPos);
    // if (space) {
    //     plant.draw(ctx, {x: space.xPos, y: space.yPos}, space.width, space.height, space.cropLevel);
    //   };
  }
});

function getFileNumber(): number {
  let playerInput = prompt("Enter the save file number (1-3): ");
  if (playerInput === null) {
    return -1;
  }
  let fileNumber = parseInt(playerInput);
  while (isNaN(fileNumber) || fileNumber < 1 || fileNumber > 3) {
    playerInput = prompt("Invalid input. Enter the save file number (1-3): ");
    if (playerInput === null) {
      return -1;
    }
    fileNumber = parseInt(playerInput);
  }
  console.log("fileNumber: ", fileNumber);
  return fileNumber;
}

function addSpacing(button: HTMLButtonElement) {
  button.style.marginTop = "10px";
}

const saveButton = document.createElement("button");
saveButton.innerHTML = "Save game";
saveButton.addEventListener("click", () => {
  const number = getFileNumber();
  if (number != -1) saveGame(board.tiles, number);
});
wrapper.appendChild(saveButton);

// Advance time
const timeButton = document.createElement("button");
timeButton.innerHTML = "Advance Time";
timeButton.addEventListener("click", () => {
  if (ctx) {
    board.advanceTime(ctx);
    saveGame(board.tiles, loadSave);
  }
  if (board.getLevel3Plants() >= gameSettings?.win.win_condition!) {
    alert("You win!");
  }
  1;
});
addSpacing(timeButton);
wrapper.appendChild(timeButton);

// Undo and Redo Buttons
const undoRedoDiv = document.createElement("div");
wrapper.appendChild(undoRedoDiv);

const undoButton = document.createElement("button");
undoButton.innerHTML = "Undo";
undoButton.style.marginRight = "5px";
addSpacing(undoButton);
undoRedoDiv.appendChild(undoButton);

const redoButton = document.createElement("button");
redoButton.innerHTML = "Redo";
undoButton.style.marginLeft = "5px";
addSpacing(redoButton);
undoRedoDiv.appendChild(redoButton);

undoButton.addEventListener("click", () => {
  const newTiles = undo(loadSave, canvas, gameSettings!);
  if (newTiles.length > 0) {
    board.setTiles(newTiles);
    board.tiles.forEach((tile) => {
      board.drawTile(ctx!, tile);
      if (tile.cropLevel > 0) board.drawPlant(ctx!, tile);
    });
    board.drawPlayer(ctx!);
  }
});

redoButton.addEventListener("click", () => {
  const newTiles = redo(loadSave, canvas, gameSettings!);
  if (newTiles.length > 0) {
    board.setTiles(newTiles);
    board.tiles.forEach((tile) => {
      board.drawTile(ctx!, tile);
      if (tile.cropLevel > 0) board.drawPlant(ctx!, tile);
    });
    board.drawPlayer(ctx!);
  }
});
