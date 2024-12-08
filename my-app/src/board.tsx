import React, { useEffect, useState } from 'react';
import { Stage, Container, Graphics, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { BoardTile } from './boardTile';
import Position from './position';
import BoardContext from './BoardContext';

const WIDTH: number = 50;
const HEIGHT: number = 50;

function Board({boardTiles}) {
    const [tiles, setTiles] = useState<BoardTile[]>([
        { xPos: 0, yPos: 0, width: WIDTH, height: HEIGHT, color: 0x00ff00, hasPlayer: false },
        { xPos: 50, yPos: 0, width: WIDTH, height: HEIGHT, color: 0xff0000, hasPlayer: false },
        { xPos: 100, yPos: 0, width: WIDTH, height: HEIGHT, color: 0xff0000, hasPlayer: false },

        // this will be set by AoS
    ]);

    // pass in some sort of board context here for later
    // AoS will most likely be passed into BoardContext and then spawn in Board from there it'll build BoardTiles
    
    const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const drawTile = (tile: BoardTile) => {
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
        );
    };

    return (
        <Stage width={800} height={600} options={{ background: 0x1099bb }}>
            <Container>

                {/* <BoardContext.Provider value={{
                    playerPos, 
                }}>
                    <Plant>
                </BoardContext.Provider> */}
                {tiles.map(drawTile)}
                    <Graphics
                        draw={g => {
                            g.beginFill(0x000000); // Player color, black
                            g.drawRect(playerPos.x, playerPos.y, 50, 50); // Adjust size as needed
                            g.endFill();
                    }}
                />
            </Container>
        </Stage>
    );
};

export default Board;
  

    // const handleKeyDown = (event: KeyboardEvent) => {
    //     switch (event.key) {
    //         case 'ArrowUp':
    //             setPlayerPos(pos => ({ x: pos.x, y: pos.y - 50 }));
    //             break;
    //         case 'ArrowDown':
    //             setPlayerPos(pos => ({ x: pos.x, y: pos.y + 50 }));
    //             break;
    //         case 'ArrowLeft':
    //             setPlayerPos(pos => ({ x: pos.x - 50, y: pos.y }));
    //             break;
    //         case 'ArrowRight':
    //             setPlayerPos(pos => ({ x: pos.x + 50, y: pos.y }));
    //             break;
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);