import './App.css';
import Board from './board';
import BoardContext from './BoardContext';
import { BoardTile } from './boardTile';
// possibly use here?

const App = () => {
  const boardTiles: Array<BoardTile> = [];
  return (
    <div>
        <Board boardTiles={boardTiles}></Board>
    </div>
  );
};
export default App;