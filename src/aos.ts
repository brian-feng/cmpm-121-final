import generateRandomInt from "./random.ts";

export default interface boardTile{
  tileColor: number, //color of tile, numbers represent different colors
  cropLevel: number, //crop level (0 means no plant here)
  waterLevel: number,
  sunlightLevel: number,
  xPos: number,
  yPos: number,
  width: number,
  height: number,
  hasPlayer: boolean, //true if player is on this tile
  plantName: number, //our plant names are just "Plant X" anyway, save as number
  plantColor: number, //color of plant, numbers represent different colors
}

function encodeTile(tile: boardTile, buffer: DataView, offset: number): number {
    let start = offset;

    buffer.setInt32(start, tile.tileColor); start += 4;
    buffer.setInt32(start, tile.cropLevel); start += 4;
    buffer.setInt32(start, tile.waterLevel); start += 4;
    buffer.setInt32(start, tile.sunlightLevel); start += 4;
    buffer.setInt32(start, tile.xPos); start += 4;
    buffer.setInt32(start, tile.yPos); start += 4;
    buffer.setInt32(start, tile.width); start += 4;
    buffer.setInt32(start, tile.height); start += 4;

    buffer.setUint8(start++, tile.hasPlayer ? 1 : 0);

    buffer.setInt32(start, tile.plantName); start += 4;
    buffer.setInt32(start, tile.plantColor); start += 4;

    return start;
}

function serializeBoard(tiles: boardTile[]): Uint8Array {
    const tileSize = (4 * 10) + 1; // 10 integers @ 4 bytes each, 1 boolean @ 1 byte
    const buffer = new ArrayBuffer(tileSize * tiles.length);
    const dataView = new DataView(buffer);

    let offset = 0;
    for (const tile of tiles) {
        offset = encodeTile(tile, dataView, offset);
    }

    return new Uint8Array(buffer);
}

function decodeTile(buffer: DataView, offset: number): [boardTile, number] {
    let start = offset;

    const tileColor = buffer.getInt32(start); start += 4;
    const cropLevel = buffer.getInt32(start); start += 4;
    const waterLevel = buffer.getInt32(start); start += 4;
    const sunlightLevel = buffer.getInt32(start); start += 4;
    const xPos = buffer.getInt32(start); start += 4;
    const yPos = buffer.getInt32(start); start += 4;
    const width = buffer.getInt32(start); start += 4;
    const height = buffer.getInt32(start); start += 4;

    const hasPlayer = buffer.getUint8(start++) === 1;

    const plantName = buffer.getInt32(start); start += 4;
    const plantColor = buffer.getInt32(start); start += 4;

    const tile: boardTile = {
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
        plantColor,
    };

    return [tile, start]; // Return the tile and new offset
}

function deserializeBoard(data: Uint8Array): boardTile[] {
    const buffer = new DataView(data.buffer);
    const tiles: boardTile[] = [];
    let offset = 0;

    while (offset < buffer.byteLength) {
        const [tile, newOffset] = decodeTile(buffer, offset);
        tiles.push(tile);
        offset = newOffset;
    }

    return tiles;
}

export function saveGame(board: boardTile[], fileNumber: number){
    const saveFile = "saveData" + fileNumber.toString(); //to handle multiple saves
    
    //convert the board into Uint8Array and save this to localStorage
    const data = serializeBoard(board);
    localStorage.setItem(saveFile, JSON.stringify(data));
    console.log("Game saved under save file" + saveFile.toString());
}

export function loadGame(fileNumber: number, canvas: HTMLCanvasElement): boardTile[] {
    const saveFile = "saveData" + fileNumber.toString(); //load this save file
    const json = localStorage.getItem(saveFile);

    //return a new board if no save data found
    if (!json) {
        console.warn("No save data found. Creating new save.");
        return initializeBoard(canvas);
    }

    //get the data and return it
    const data = JSON.parse(json) as Uint8Array;
    return deserializeBoard(data);
}

const SPACEWIDTH: number = 50;
const SPACEHEIGHT: number = 50;
// initializes the board with default values
function initializeBoard(canvas: HTMLCanvasElement): boardTile[] {
    const board: boardTile[] = [];
    for (let x = 0; x < canvas.width - SPACEWIDTH; x += SPACEWIDTH + 1) {
      for (let y = 0; y < canvas.height - SPACEHEIGHT; y += SPACEHEIGHT + 1) {
        // Select a random color
        const tileColor = generateRandomInt(1,2); // color is an int, we can choose the color from the int later
        const cropLevel = 0;
        const waterLevel = generateRandomInt(0, 3);
        const sunlightLevel = generateRandomInt(0, 3);
        const xPos = x;
        const yPos = y;
        const width = SPACEWIDTH;
        const height = SPACEHEIGHT;
        const hasPlayer = false;
        const plantName = 0; // plant name 0 since no plant here
        const plantColor = 0; // plant color 0 since no plant here

        const tile: boardTile = {
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
          plantColor,
        };

        board.push(tile);
      }
    }
    board[0].hasPlayer = true;
    return board;
  }