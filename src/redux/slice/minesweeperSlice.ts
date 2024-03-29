import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createBoard, openCell } from "../../lib/minesweeper";
import { CellState, GameState } from "../../lib/constants";

export interface MineSweeperState {
  state: GameState;
  board: number[][];
  cellState: CellState[][];
  timer: number;
  row: number;
  column: number;
  mines: number;
  flags: number;
  openedCells: number;
}

const initialState: MineSweeperState = {
  state: GameState.IDLE,
  board: Array.from(Array(16), () => new Array(16).fill(0)),
  cellState: Array.from(Array(16), () => new Array(16).fill(CellState.CLOSED)),
  timer: 0,
  row: 16,
  column: 16,
  mines: 40,
  flags: 0,
  openedCells: 0,
};

interface DifficultyPayload {
  row: number;
  column: number;
  mines: number;
}

export const mineSweeperSlice = createSlice({
  name: "mineSweeper",
  initialState,
  reducers: {
    changeDifficulty: (state, action: PayloadAction<DifficultyPayload>) => {
      const { row, column, mines } = action.payload;

      state.state = GameState.IDLE;
      state.board = Array.from(Array(row), () => new Array(column).fill(0));
      state.cellState = Array.from(Array(row), () => new Array(column).fill(CellState.CLOSED));
      state.timer = 0;
      state.row = row;
      state.column = column;
      state.mines = mines;
      state.flags = 0;
      state.openedCells = 0;
    },
    resetGame: (state) => {
      state.state = GameState.IDLE;
      state.board = state.board.map((row) => row.map(() => 0));
      state.cellState = state.cellState.map((row) => row.map(() => CellState.CLOSED));
      state.timer = 0;
      state.flags = 0;
      state.openedCells = 0;
    },
    startGame: (state, action: PayloadAction<[number, number]>) => {
      if (state.state !== GameState.IDLE) return;

      const [startX, startY] = action.payload;

      state.board = createBoard({
        row: state.row,
        column: state.column,
        mines: state.mines,
        startCoords: [startX, startY],
      });

      state.state = GameState.IN_PROGRESS;
      state.timer = 0;
    },
    clickCell: (state, action: PayloadAction<[number, number]>) => {
      const [x, y] = action.payload;

      if (state.state === GameState.DEFEAT || state.state === GameState.WIN) return;
      if (state.cellState[x][y] !== CellState.CLOSED) return;

      const { updatedCellState, openCount } = openCell({
        x: x,
        y: y,
        board: state.board,
        cellState: state.cellState,
      });

      state.cellState = updatedCellState;
      state.openedCells += openCount;

      if (openCount < 1) {
        state.state = GameState.DEFEAT;
      }

      if (state.openedCells === state.row * state.column - state.mines) {
        state.state = GameState.WIN;
      }
    },
    tickTimer: (state) => {
      state.timer += 1;
    },
    toggleFlag: (state, action: PayloadAction<[number, number]>) => {
      const [x, y] = action.payload;

      if (state.state === GameState.DEFEAT || state.state === GameState.WIN) return;
      if (state.cellState[x][y] === CellState.OPENED) return;

      if (state.cellState[x][y] === CellState.FLAGGED) {
        state.cellState[x][y] = CellState.CLOSED;
        state.flags -= 1;

        return;
      }

      state.cellState[x][y] = CellState.FLAGGED;
      state.flags += 1;
    },
    areaOpen: (state, action: PayloadAction<[number, number]>) => {
      const [x, y] = action.payload;

      const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
      const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

      if (state.state !== GameState.IN_PROGRESS) return;

      for (let dir = 0; dir < 8; dir++) {
        const curX = x + dx[dir];
        const curY = y + dy[dir];

        if (curX < 0 || curX >= state.row || curY < 0 || curY >= state.column) continue;
        if (state.cellState[curX][curY] !== CellState.CLOSED) continue;

        const { updatedCellState, openCount } = openCell({
          x: curX,
          y: curY,
          board: state.board,
          cellState: state.cellState,
        });

        state.cellState = updatedCellState;
        state.openedCells += openCount;

        if (openCount < 1) {
          state.state = GameState.DEFEAT;

          return;
        }

        if (state.openedCells === state.row * state.column - state.mines) {
          state.state = GameState.WIN;
        }
      }
    },
  },
});

export const {
  changeDifficulty,
  resetGame,
  startGame,
  clickCell,
  tickTimer,
  toggleFlag,
  areaOpen,
} = mineSweeperSlice.actions;

export const selectBoard = (state: RootState) => state.mineSweeper.board;
export const selectBoardRow = (state: RootState) => state.mineSweeper.row;
export const selectBoardColumn = (state: RootState) => state.mineSweeper.column;
export const selectMines = (state: RootState) => state.mineSweeper.mines;
export const selectCellState = (state: RootState) => state.mineSweeper.cellState;
export const selectGameState = (state: RootState) => state.mineSweeper.state;

export const selectMinesLeft = (state: RootState) => {
  const minesLeft = state.mineSweeper.mines - state.mineSweeper.flags;

  return 0 <= minesLeft
    ? minesLeft.toString().padStart(3, "0")
    : `-${Math.abs(minesLeft).toString().padStart(2, "0")}`;
};
export const selectTimer = (state: RootState) =>
  state.mineSweeper.timer.toString().padStart(3, "0");

export default mineSweeperSlice.reducer;
