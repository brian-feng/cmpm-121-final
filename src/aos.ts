import generateRandomInt from "./random.ts";
import BoardTile from "./boardTile.ts";
import Board from "./board.ts";

const autoSaveStack: string[] = [];
let index = 0;

function encodeTile(tile: BoardTile, buffer: DataView, offset: number): number {
  let start = offset;

  buffer.setInt32(start, tile.tileColor, true); start += 4;
  buffer.setInt32(start, tile.cropLevel, true); start += 4;
  buffer.setInt32(start, tile.waterLevel, true); start += 4;
  buffer.setInt32(start, tile.sunlightLevel, true); start += 4;
  buffer.setInt32(start, tile.xPos, true); start += 4;
  buffer.setInt32(start, tile.yPos, true); start += 4;
  buffer.setInt32(start, tile.width, true); start += 4;
  buffer.setInt32(start, tile.height, true); start += 4;

  buffer.setUint8(start++, tile.hasPlayer ? 1 : 0);

  buffer.setInt32(start, tile.plantName, true); start += 4;
  buffer.setInt32(start, tile.index, true); start += 4;
  buffer.setInt32(start, tile.plantXP, true); start += 4;

  return start;
}

function decodeTile(buffer: DataView, offset: number): [BoardTile, number] {
  let start = offset;

  const tileColor = buffer.getInt32(start, true); start += 4;
  const cropLevel = buffer.getInt32(start, true); start += 4;
  const waterLevel = buffer.getInt32(start, true); start += 4;
  const sunlightLevel = buffer.getInt32(start, true); start += 4;
  const xPos = buffer.getInt32(start, true); start += 4;
  const yPos = buffer.getInt32(start, true); start += 4;
  const width = buffer.getInt32(start, true); start += 4;
  const height = buffer.getInt32(start, true); start += 4;

  const hasPlayer = buffer.getUint8(start++) === 1;

  const plantName = buffer.getInt32(start, true); start += 4;
  const index = buffer.getInt32(start, true); start += 4;
  const plantXP = buffer.getInt32(start, true); start += 4;

  const tile: BoardTile = {
      tileColor,
      cropLevel,
      waterLevel,
      sunlightLevel,
      xPos,
      yPos,
      width,
      height,
      hasPlayer,
      plantName,
      index,
      plantXP,
  };

  return [tile, start];
}

function serializeBoard(tiles: BoardTile[]): Uint8Array {
  const tileSize = (4 * 11) + 1; // 11 integers @ 4 bytes each, 1 boolean @ 1 byte
  const buffer = new ArrayBuffer(tileSize * tiles.length);
  const dataView = new DataView(buffer);
  console.log('dataView: ', dataView, "buffer: " ,buffer);
  let offset = 0;
  for (const tile of tiles) {
      offset = encodeTile(tile, dataView, offset);
  }

  return new Uint8Array(buffer);
}


function deserializeBoard(data: Uint8Array): BoardTile[] {
  console.log('data: ', data);

  // Use the buffer directly from the input Uint8Array
  const arrayBuffer: ArrayBuffer = data.buffer;

  // Use the byteOffset and byteLength from the original Uint8Array
  const buffer: DataView = new DataView(arrayBuffer, data.byteOffset, data.byteLength);

  console.log('arrayBuffer type: ', arrayBuffer);
  console.log('DataView type: ', typeof buffer);
  console.log('buffer byteLength: ', buffer.byteLength);

  const tiles: BoardTile[] = [];
  let offset = 0;

  // Decode while ensuring bounds
  while (offset < buffer.byteLength) {
      const [tile, newOffset] = decodeTile(buffer, offset);
      tiles.push(tile);
      offset = newOffset;
  }

  console.log('deserialized tiles: ', tiles);
  return tiles;
}

export function saveGame(board: BoardTile[], fileNumber: number): void {
  
  const saveFile = "saveData" + fileNumber.toString(); // File key for saving

  // Convert the serialized board into a Base64 string
  const data = serializeBoard(board);
  const base64Data = encodeToBase64(data);

  // Store in localStorage
  localStorage.setItem(saveFile, base64Data);

  console.log("Game saved under save file: " + saveFile);
}

export function autoSave(board: BoardTile[]): void {
  const saveFile = "autoSave" + autoSaveStack.length; // File key for saving

  // Convert the serialized board into a Base64 string
  const data = serializeBoard(board);
  const base64Data = encodeToBase64(data);

  // Store in localStorage
  localStorage.setItem(saveFile, base64Data);

  console.log("Game auto-saved under save file: " + saveFile);
}

export function loadGame(fileNumber: number, canvas: HTMLCanvasElement): BoardTile[] {
  if (fileNumber == -1) {
      console.warn("No load file provided. Creating a new board");
      return initializeBoard(canvas);
  }
  const saveFile = "saveData" + fileNumber.toString(); // File key to load

  // Retrieve Base64 string from localStorage
  const base64Data = localStorage.getItem(saveFile);

  // If no save file exists, initialize a new board
  if (!base64Data) {
      console.warn("No save data found. Creating a new save.");
      return initializeBoard(canvas);
  }

  // Decode Base64 string back into Uint8Array
  const data = decodeFromBase64(base64Data);

  // Deserialize the binary data back into BoardTile[]
  return deserializeBoard(data);
}

function encodeToBase64(data: Uint8Array): string {
  let binaryString = '';

  // Loop through Uint8Array and build the string incrementally
  for (let i = 0; i < data.length; i++) {
      binaryString += String.fromCharCode(data[i]);
  }

  // Convert the resulting binary string to Base64
  return btoa(binaryString);
}

function decodeFromBase64(data: string): Uint8Array {
  return Uint8Array.from(atob(data), (char) => char.charCodeAt(0));
}

const SPACEWIDTH: number = 50;
const SPACEHEIGHT: number = 50;
// initializes the board with default values
function initializeBoard(canvas: HTMLCanvasElement): BoardTile[] {
  const tiles: BoardTile[] = [];
  const ctx = canvas.getContext("2d");

  if(ctx) console.log('ctx found in aos');
  else console.log('ctx null in aos');
  
  const board = new Board(ctx!, tiles);
  for (let x = 0; x < canvas.width - SPACEWIDTH; x += SPACEWIDTH + 1) {
    for (let y = 0; y < canvas.height - SPACEHEIGHT; y += SPACEHEIGHT + 1) {
      // Select a random color
      const tileColor = generateRandomInt(1,3); // color is an int, we can choose the color from the int later
      const cropLevel = 0;
      const waterLevel = generateRandomInt(0, 3);
      const sunlightLevel = generateRandomInt(0, 3);
      const xPos = x;
      const yPos = y;
      const width = SPACEWIDTH;
      const height = SPACEHEIGHT;
      const hasPlayer = false;
      const plantName = 0; // plant name 0 since no plant here
      const plantXP = 0; // plant has no XP since no plant here

      const tile: BoardTile = {
        tileColor,
        cropLevel,
        waterLevel,
        sunlightLevel,
        xPos,
        yPos,
        width,
        height,
        hasPlayer,
        plantName,
        index,
        plantXP,
      };

      board.addTile(tile);
    }
  }
  board.tiles[0].hasPlayer = true;
  return board.tiles;
}