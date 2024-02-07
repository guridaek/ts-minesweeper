import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createBoard } from "../../lib/minesweeper";

export interface MineSweeperState {
  board: number[][];
  state: "IDLE" | "IN_PROGRESS" | "WIN" | "DEFEAT";
  time: number;
  width: number;
  height: number;
  mines: number;
  flags: number;
  openedCells: number;
}

const initialState: MineSweeperState = {
  state: "IDLE",
  time: 0,
  width: 16,
  height: 16,
  board: Array.from(Array(16), () => new Array(16).fill(0)),
  mines: 40,
  flags: 0,
  openedCells: 0,
};

interface DifficultyPayload {
  width: number;
  height: number;
  mines: number;
}

export const mineSweeperSlice = createSlice({
  name: "mineSweeper",
  initialState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<DifficultyPayload>) => {
      const { width, height, mines } = action.payload;

      state.board = Array.from(Array(height), () => new Array(width).fill(0));
      state.width = width;
      state.height = height;
      state.mines = mines;
    },
    startGame: (state, action: PayloadAction<[number, number]>) => {
      const [startX, startY] = action.payload;

      state.board = createBoard({
        width: state.width,
        height: state.height,
        mines: state.mines,
        startCoords: [startX, startY],
      });
      state.state = "IN_PROGRESS";
      state.time = 0;
      state.openedCells = 0;
    },
  },
});

export const { setDifficulty, startGame } = mineSweeperSlice.actions;

export const selectBoard = (state: RootState) => state.mineSweeper.board;
export const selectBoardWidth = (state: RootState) => state.mineSweeper.width;
export const selectBoardHeight = (state: RootState) => state.mineSweeper.height;

export default mineSweeperSlice.reducer;
