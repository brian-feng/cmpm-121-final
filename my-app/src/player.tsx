import React from 'react';
import { Sprite } from '@pixi/react';
import BoardContext from './BoardContext';
function Player() {
    const {playerPos} = React.useContext(BoardContext);

    React.useEffect(() => {
        // change the location of the player
        return () => {
            // should call a function to change the tile that hasTile
        }
    }, [playerPos]);
    return (
        <Sprite
                image="/pixi-react/img/coin.png"
                scale={{ x: 0.5, y: 0.5 }}
                anchor={0.5}
                x={playerPos.x}
                y={playerPos.y}
            />
    )
}
export default Player;