import { Container} from '@pixi/react';
import { BoardTile } from './boardTile';
import Tile from './boardTile';

function Board({boardTiles}: {boardTiles: BoardTile[]}) {
    // const {playerPos, setPlayerPos} = useContext(BoardContext);

    return (
        <Container>
            {boardTiles.map(boardTile=>(
                <Tile key={`${boardTile.xPos}-${boardTile.yPos}`} tile={boardTile}></Tile>
                // <Graphics
                //     draw={g => {
                //         g.beginFill(0x000000); // Player color, black
                //         g.drawRect(playerPos.x, playerPos.y, 50, 50); // Adjust size as needed
                //         g.endFill();
                // }}
                // />
            ))}
                
        </Container>
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