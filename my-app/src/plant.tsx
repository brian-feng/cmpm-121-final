import { Sprite} from '@pixi/react';
import React, {useState, useEffect} from 'react';
import BoardContext from './BoardContext';
import Position from './position';
import { BoardTile } from './boardTile';
import { Graphics } from '@pixi/react';
function Plant({ position}) { // fix later not reading position type?
    const { tile } = React.useContext(BoardContext);
    // obtain the tileinformation to grow plant
    const [plant, setPlant] = useState<PlantState>({
        index: null,
        color: '',
        name: '',
        plantID: 0,
        plantXP: 0,
        cropLevel: 1
    })


    const growPlant = (tile: BoardTile) => {
        console.log("Growing plant on tile:", tile);
        if (tile.waterLevel > 0 && tile.sunlightLevel > 0) {
            if (tile.plantId !== 0) { // Makes sure theres not a plant on tile already
                plantXP += 

            }
        }

    };



    return (
        <Graphics
            draw={g => {
            g.beginFill(0xffd900);
            g.drawRect(position.x, position.y, 50, 50);
            g.endFill();
         }}
        />
    )
}

export default Plant;