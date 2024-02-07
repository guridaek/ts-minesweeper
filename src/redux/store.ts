import { configureStore } from "@reduxjs/toolkit";
import minesweeperReducer from "./slice/minesweeperSlice";

export const store = configureStore({
  reducer: {
    mineSweeper: minesweeperReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
