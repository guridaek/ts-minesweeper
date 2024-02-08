export const MINE_VALUE = -1;

export enum CellState {
  CLOSED,
  OPENED,
  FLAGGED,
  FLAGGED_MINE,
  BURSTED,
}

export const DIFFICULTIES = ["Beginner", "Intermediate", "Expert", "Custom"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const DIFFICULTY_SETTINGS = {
  [DIFFICULTIES[0]]: { row: 8, column: 8, mines: 10 },
  [DIFFICULTIES[1]]: { row: 16, column: 16, mines: 40 },
  [DIFFICULTIES[2]]: { row: 16, column: 32, mines: 100 },
};

export const MIN_SIZE = 8;
export const MAX_SIZE = 100;
