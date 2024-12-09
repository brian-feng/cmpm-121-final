import { useState } from 'react';
import './App.css';
import BoardContext from './BoardContext';
import GameBoard from './gameboard';
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
const App = () => {
  const [playerPos, setPlayerPos] = useState({});

  return (
    <Stage {...stageProps}>
        <BoardContext.Provider value={{ playerPos, setPlayerPos }}>
        <GameBoard canvaswidth={WIDTH} canvasheight={HEIGHT} />
      </BoardContext.Provider>
    </Stage>
  );
};

// App.propTypes = {

// }

export default App;