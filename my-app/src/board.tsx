import { Container} from '@pixi/react';
import { BoardTile } from './boardTile';
import Tile from './boardTile';
import { Stage } from '@pixi/react';
import Player from './player';
import BoardContext from './BoardContext';
import { useContext } from 'react';
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
    const {playerPos, setPlayerPos} = useContext(BoardContext);

    return (
        <Stage {...stageProps}>
            <Container>
                {boardTiles.map(boardTile=>(
                    <Tile key={`${boardTile.xPos}-${boardTile.yPos}`} tile={boardTile}></Tile>
                ))}
                <Player></Player>   
            </Container>
        </Stage>
    );
};

export default Board;