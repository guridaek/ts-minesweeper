import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createBoard, openCell } from "../../lib/minesweeper";
import { CellState } from "../../lib/constants";

export interface MineSweeperState {
  status: "IDLE" | "IN_PROGRESS" | "WIN" | "DEFEAT";
  board: number[][];
  cellStatus: CellState[][];
  timer: number;
  row: number;
  column: number;
  mines: number;
  flags: number;
  openedCells: number;
}

const initialState: MineSweeperState = {
  status: "IDLE",
  board: Array.from(Array(16), () => new Array(16).fill(0)),
  cellStatus: Array.from(Array(16), () => new Array(16).fill(CellState.CLOSED)),
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
    resetGame: (state, action: PayloadAction<DifficultyPayload>) => {
      const { row, column, mines } = action.payload;

      state.status = "IDLE";
      state.board = Array.from(Array(row), () => new Array(column).fill(0));
      state.cellStatus = Array.from(Array(row), () => new Array(column).fill(CellState.CLOSED));
      state.timer = 0;
      state.row = row;
      state.column = column;
      state.mines = mines;
      state.flags = 0;
      state.openedCells = 0;
    },
    startGame: (state, action: PayloadAction<[number, number]>) => {
      if (state.status !== "IDLE") return;

      const [startX, startY] = action.payload;

      state.board = createBoard({
        row: state.row,
        column: state.column,
        mines: state.mines,
        startCoords: [startX, startY],
      });

      state.status = "IN_PROGRESS";
      state.timer = 0;
    },
    clickCell: (state, action: PayloadAction<[number, number]>) => {
      const [x, y] = action.payload;

      if (state.status === "DEFEAT" || state.status === "WIN") return;
      if (state.cellStatus[x][y] !== CellState.CLOSED) return;

      const { updatedCellStatus, openCount } = openCell({
        x: x,
        y: y,
        board: state.board,
        cellStatus: state.cellStatus,
      });

      state.cellStatus = updatedCellStatus;
      state.openedCells += openCount;

      if (openCount < 1) {
        state.status = "DEFEAT";
      }

      if (state.openedCells === state.row * state.column - state.mines) {
        state.status = "WIN";
      }
    },
    tickTimer: (state) => {
      state.timer += 1;
    },
  },
});

export const { resetGame, startGame, clickCell, tickTimer } = mineSweeperSlice.actions;

export const selectBoard = (state: RootState) => state.mineSweeper.board;
export const selectBoardRow = (state: RootState) => state.mineSweeper.row;
export const selectBoardColumn = (state: RootState) => state.mineSweeper.column;
export const selectCellStatus = (state: RootState) => state.mineSweeper.cellStatus;
export const selectGameStatus = (state: RootState) => state.mineSweeper.status;
export const selectTimer = (state: RootState) =>
  state.mineSweeper.timer.toString().padStart(3, "0");

export default mineSweeperSlice.reducer;
