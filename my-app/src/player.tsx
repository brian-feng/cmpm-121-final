import React, { useContext, useEffect, useState } from 'react';
import { Graphics } from '@pixi/react';
import BoardContext from './BoardContext';
import Position from './position';

function Player() {
    // const { playerPos, setPlayerPos } = useContext(BoardContext);
    const [playerPos, setPlayerPos]: Position = useState({
        x: 0, y: 0
    })

    const {boardSize} = useContext(BoardContext);
    
    const changePlayerPosition = (x: number, y: number) => {
        setPlayerPos((prevPos: Position) => ({
            x: prevPos.x + x,
            y: prevPos.y + y,
        }));
        
    };
    useEffect(() => {
        console.log('playerPos: ', playerPos);
        if (playerPos.x < 0) {
            changePlayerPosition(50, 0);
        }
        if (playerPos.y < 0)
            changePlayerPosition(0,50)
        // if (boardSize) {
        //     if (playerPos.x >= boardSize.width)
        //         changePlayerPosition(-50, 0)
        //     if (playerPos.y >= boardSize.height)
        //         changePlayerPosition(0,-50)
        // }
        
    }, [playerPos])

    const handlePlayerMovement = (e: KeyboardEvent) => {    
        if (e.key === 'w') {
            changePlayerPosition(0,-50)
        } else if (e.key === 'a') {
            changePlayerPosition(-50, 0)

        } else if (e.key === 's') {
            changePlayerPosition(0, 50)

        } else if (e.key === 'd') {
            changePlayerPosition(50, 0)

        }    
    };
    useEffect(() => {
        window.addEventListener('keydown', handlePlayerMovement);
        return () => {
          window.removeEventListener('keydown', handlePlayerMovement);
        };
    }, []);

    return (
        <Graphics
            draw={(g) => {
                g.beginFill(0xffd900);
                g.drawRect(0, 0, 50, 50);
                g.endFill();
            }}
            x={playerPos.x} 
            y={playerPos.y} 
        />
    );
}

export default Player;