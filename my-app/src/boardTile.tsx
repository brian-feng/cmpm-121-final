import { Graphics } from "@pixi/react";
export interface BoardTile {
    tileColor: number; //color of tile; numbers represent different colors
    cropLevel: number; //crop level (0 means no plant here)
    waterLevel: number;
    sunlightLevel: number;
    xPos: number;
    yPos: number;
    width: number;
    height: number;
    hasPlayer: boolean; //true if player is on this tile
    plantID: number; //our plant names are just "Plant X" anyway; save as number
    index: number; //index in the autoSaveStack e.g. saveFile1.index
    plantXP: number;
}

function Tile({tile}: {tile: BoardTile}) 
    {
        console.log(tile.xPos, tile.yPos)
    return (
        <Graphics
            key={`${tile.xPos}-${tile.yPos}`}
            draw={g => {
                g.beginFill(tile.tileColor);
                g.lineStyle(2, 0xffd900, 2);
                g.drawRect(tile.xPos, tile.yPos, tile.width, tile.height);
                g.endFill();
            }}
        />
    )
}

export default Tile;