import { Container} from '@pixi/react';
import { BoardTile } from './boardTile';
import Tile from './boardTile';
import { Stage } from '@pixi/react';
const WIDTH = 800;
const HEIGHT = 600;
const width = WIDTH;
const height = HEIGHT;
const stageProps = {
  height,
  width,
  options: {
    backgroundAlpha: 0,
    antialias: true,
  },
};
function Board({boardTiles}: {boardTiles: BoardTile[]}) {
    // const {playerPos, setPlayerPos} = useContext(BoardContext);

    return (
        <Stage {...stageProps}>
            <Container>
                {boardTiles.map(boardTile=>(
                    <Tile key={`${boardTile.xPos}-${boardTile.yPos}`} tile={boardTile}></Tile>
                ))}         
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