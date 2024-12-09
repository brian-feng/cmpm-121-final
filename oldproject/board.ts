import generateRandomInt from "./random.ts";
import "./plant.ts";
import Position from "../my-app/src/position.tsx";
import { BoardTile } from "./boardTile.ts";
import { getPlantColorByIndex, getXPIncreaseByIndex } from "./plant.ts";
import { type GameSettings } from "./externalDSLParser.ts";

const SPACEWIDTH: number = 50;
const SPACEHEIGHT: number = 50;

export default class Board {
  width: number = SPACEWIDTH;
  height: number = SPACEHEIGHT;
  tiles: BoardTile[];
  ctx: CanvasRenderingContext2D;
  playerPos: Position;
  gameSettings: GameSettings | null;

  constructor(
    ctx: CanvasRenderingContext2D,
    tiles: BoardTile[],
    gameSettings: GameSettings,
  ) {
    this.gameSettings = gameSettings;
    this.tiles = tiles;
    this.ctx = ctx;
    this.playerPos = this.findPlayerPosition(tiles);
    this.drawPlayer(ctx);
  }

  // Helper function to find the player’s initial position
  private findPlayerPosition(tiles: BoardTile[]): Position {
    const playerTile = tiles.find((tile) => tile.hasPlayer);
    return playerTile ? { x: playerTile.xPos, y: playerTile.yPos } : { x: 0, y: 0 };
  }

  // Adds a tile to the board and renders it
  addTile(tile: BoardTile) {
    this.tiles.push(tile);
    this.renderTile(tile);
  }

  // Draws a single tile on the board
  drawTile(ctx: CanvasRenderingContext2D, tile: BoardTile) {
    this.renderTile(tile);
  }

  private renderTile(tile: BoardTile) {
    const color = this.getTileColor(tile.tileColor);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(tile.xPos, tile.yPos, tile.width, tile.height);
    if (tile.cropLevel > 0) this.drawPlant(this.ctx, tile);
  }

  // Advances time by updating tiles' crop levels and other properties
  advanceTime(ctx: CanvasRenderingContext2D) {
    this.tiles.forEach((tile) => {
      if (tile.cropLevel > 0 && tile.cropLevel < 3) {
        this.growPlant(tile);
      }
      tile.waterLevel = this.getAdjacentWaters(tile);
      tile.sunlightLevel = generateRandomInt(0, 3);
      this.refreshSpace(ctx, tile);
    });
  }

  // Grows the plant by checking its water and sunlight levels and updating its crop level
  private growPlant(tile: BoardTile) {
    if (tile.waterLevel > 0 && tile.sunlightLevel > 0) {
      if (tile.plantID !== 0) {
        tile.plantXP += getXPIncreaseByIndex(tile.plantID, this, tile);
      }
      if (tile.plantXP >= 10) {
        tile.cropLevel += 1;
        tile.plantXP = 0;
      }
    }
  }

  // Counts the number of level 3 plants
  getLevel3Plants(): number {
    return this.tiles.filter(tile => tile.cropLevel === 3).length;
  }

  // Gets adjacent tiles to the given tile
  getAdjacentTiles(tile: BoardTile): BoardTile[] {
    const adjTiles: BoardTile[] = [];
    const directions: Position[] = [
      { x: -51, y: 0 },  // Left
      { x: 51, y: 0 },   // Right
      { x: 0, y: -51 },  // Up
      { x: 0, y: 51 },   // Down
    ];
    
    directions.forEach(({ x, y }) => {
      const adjTile = this.getSpace({ x: tile.xPos + x, y: tile.yPos + y });
      if (adjTile) adjTiles.push(adjTile);
    });

    return adjTiles;
  }

  // Calculates the adjacent water levels
  private getAdjacentWaters(tile: BoardTile): number {
    const adjacentTiles = this.getAdjacentTiles(tile);
    const totalWater = adjacentTiles.reduce((sum, adjTile) => sum + adjTile.waterLevel, 0);
    return totalWater / 1.7;
  }

  // Finds a tile at the given position
  getSpace(pos: Position): BoardTile | undefined {
    return this.tiles.find(tile => tile.xPos === pos.x && tile.yPos === pos.y);
  }

  // Refreshes the space by redrawing the tile and its plant
  refreshSpace(ctx: CanvasRenderingContext2D, tile: BoardTile) {
    this.drawTile(ctx, tile);
    if (tile.cropLevel > 0) {
      this.drawPlant(ctx, tile);
    }
    if (tile.hasPlayer) {
      this.drawPlayer(ctx);
    }
  }

  // Moves the player by the specified x and y offsets
  playerMove(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const currPos = this.getSpace(this.playerPos);
    if (currPos) {
      const newPos = this.getSpace({ x: this.playerPos.x + x * 51, y: this.playerPos.y + y * 51 });
      if (newPos) {
        this.playerPos.x += x * 51;
        this.playerPos.y += y * 51;
        this.refreshSpace(ctx, currPos);
        this.drawPlayer(ctx);
        currPos.hasPlayer = false;
        newPos.hasPlayer = true;
      }
    }
  }

  // Draws the player on the canvas
  drawPlayer(ctx: CanvasRenderingContext2D) {
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile) { // Check if currentTile is defined
      currentTile.hasPlayer = true;
      ctx.fillStyle = "black";
      ctx.fillRect(this.playerPos.x, this.playerPos.y, this.width, this.height);
  
      if (currentTile.cropLevel > 0) { // Ensure cropLevel is accessed only if currentTile is defined
        this.drawPlant(ctx, currentTile);
      }
    } else {
      console.warn("Player's current tile not found!");
    }
  }  

  // Harvests the plant on the current tile
  harvestHere(ctx: CanvasRenderingContext2D) {
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile && currentTile.cropLevel > 0) {
      currentTile.plantID = 0;
      currentTile.plantXP = 0;
      currentTile.cropLevel = 0;
      this.refreshSpace(ctx, currentTile);
    }
  }

  // Places a plant on the current tile or harvests it if already planted
  placeHere(ctx: CanvasRenderingContext2D, plantID: number) {
    const currentTile = this.getSpace(this.playerPos);
    if (currentTile) {
      if (currentTile.plantID === 0) {
        currentTile.plantID = plantID;
        currentTile.cropLevel = 1;
        this.drawPlant(ctx, currentTile);
      } else {
        this.harvestHere(ctx);
      }
    }
  }

  // Draws the plant on the tile based on its level
  public drawPlant(ctx: CanvasRenderingContext2D, tile: BoardTile) {
    if (tile.plantID !== 0) {
      ctx.fillStyle = getPlantColorByIndex(tile.plantID);
      const sizePercentage = this.getPlantSizeByLevel(tile.cropLevel);
      const newWidth = tile.width * sizePercentage;
      const newHeight = tile.height * sizePercentage;

      ctx.fillRect(
        tile.xPos + (tile.width - newWidth) / 2,
        tile.yPos + (tile.height - newHeight) / 2,
        newWidth,
        newHeight
      );
    }
  }

  // Returns the plant size percentage based on its level
  private getPlantSizeByLevel(level: number): number {
    switch (level) {
      case 1: return 0.4;
      case 2: return 0.6;
      case 3: return 0.8;
      default: return 0.4;
    }
  }

  // Sets the board tiles
  setTiles(tiles: BoardTile[]) {
    this.tiles = tiles;
  }

  // Retrieves the color for a given tile
  private getTileColor(tileColor: number): string {
    const colorIndex = tileColor === 1 ? 0 : 1;
    return this.gameSettings!.board_info.board_colors[colorIndex]!;
  }
}