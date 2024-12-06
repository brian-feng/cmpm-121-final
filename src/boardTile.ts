export default interface BoardTile {
    tileColor: number; //color of tile; numbers represent different colors
    cropLevel: number; //crop level (0 means no plant here)
    waterLevel: number;
    sunlightLevel: number;
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    hasPlayer: boolean; //true if player is on this tile
    plantName: number; //our plant names are just "Plant X" anyway; save as number
    index: number; //index in the autoSaveStack e.g. saveFile1.index
    plantXP: number; // the level of the plant
  }
