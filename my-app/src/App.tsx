import { useState } from 'react';
import './App.css';
import BoardContext from './BoardContext';
import GameBoard from './gameboard';
import { Stage } from '@pixi/react';
const WIDTH = 800;
const HEIGHT = 600;

const App = () => {
  const [playerPos, setPlayerPos] = useState({});

  return (
    <Stage
      width={WIDTH}
      height={HEIGHT}
      raf={false}
      renderOnComponentChange={false}
      options={{ backgroundColor: 0xFF0000, antialias: true }}
    >
        <BoardContext.Provider value={{ playerPos, setPlayerPos }}>
        <GameBoard canvaswidth={WIDTH} canvasheight={HEIGHT} />
      </BoardContext.Provider>
    </Stage>
  );
};

// App.propTypes = {

// }

export default App;