import { createContext, Dispatch, SetStateAction } from 'react';

interface PlayerPos {
  x: number;
  y: number;
}

interface BoardSize {
    width: number;
    height: number;
}

export interface BoardContextType {
  playerPos: PlayerPos;
  setPlayerPos: Dispatch<SetStateAction<PlayerPos>>;

  boardSize: BoardSize;
  setBoardSize: Dispatch<SetStateAction<BoardSize>>;
}

const defaultState: BoardContextType = {
  playerPos: {
    x: 0,
    y: 0
  },
  setPlayerPos: () => {},

  boardSize: {
    width: 0,
    height: 0
  },
  setBoardSize: () => {}
};

const BoardContext = createContext(defaultState);

export default BoardContext;