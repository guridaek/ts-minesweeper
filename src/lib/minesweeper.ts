import {
  CellState,
  DIFFICULTY_LOCAL_STORAGE_KEY,
  DIFFICULTY_SETTINGS,
  Difficulty,
  GameState,
  MINE_VALUE,
} from "./constants";

// 8방향 탐색
const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

export const createBoard = ({
  row,
  column,
  mines,
  startCoords,
}: {
  row: number;
  column: number;
  mines: number;
  startCoords: [number, number];
}) => {
  const [startX, startY] = startCoords;

  const getRandomCoords = () => {
    const coords: Set<string> = new Set();

    while (coords.size < mines) {
      const x = Math.floor(Math.random() * row);
      const y = Math.floor(Math.random() * column);

      if (x !== startX || y !== startY) {
        coords.add(`${x},${y}`);
      }
    }

    return Array.from(coords).map((coord) => coord.split(",").map(Number)) as [number, number][];
  };

  const mineCoords = getRandomCoords();

  const board: number[][] = Array.from(Array(row), () => new Array(column).fill(0));

  mineCoords.forEach(([mineX, mineY]) => {
    board[mineX][mineY] = MINE_VALUE;

    for (let dir = 0; dir < 8; dir++) {
      const x = mineX + dx[dir];
      const y = mineY + dy[dir];

      if (x < 0 || x >= row || y < 0 || y >= column) continue;
      if (board[x][y] === MINE_VALUE) continue;

      board[x][y] += 1;
    }
  });

  return board;
};

export const openCell = ({
  x,
  y,
  board,
  cellState,
}: {
  x: number;
  y: number;
  board: number[][];
  cellState: CellState[][];
}) => {
  const updatedCellState = cellState.map((row) => [...row]);

  if (board[x][y] === MINE_VALUE) {
    updatedCellState[x][y] = CellState.BURSTED;

    return {
      updatedCellState,
      openCount: 0,
    };
  }

  updatedCellState[x][y] = CellState.OPENED;
  let openCount = 1;

  const queue: [number, number][] = [];
  let head = 0;

  if (board[x][y] === 0) {
    queue.push([x, y]);
  }

  while (head < queue.length) {
    const [curX, curY] = queue[head];
    head += 1;

    for (let dir = 0; dir < 8; dir++) {
      const nextX = curX + dx[dir];
      const nextY = curY + dy[dir];

      if (nextX < 0 || nextX >= board.length || nextY < 0 || nextY >= board[0].length) continue;
      if (updatedCellState[nextX][nextY] !== CellState.CLOSED) continue;

      openCount += 1;
      updatedCellState[nextX][nextY] = CellState.OPENED;

      if (board[nextX][nextY] !== 0) continue;

      queue.push([nextX, nextY]);
    }
  }

  return { updatedCellState: updatedCellState, openCount: openCount };
};

interface DifficultySettings {
  difficulty: Difficulty;
  row: number;
  column: number;
  mines: number;
}

export const saveDifficultySettings = (settings: DifficultySettings) => {
  localStorage.setItem(DIFFICULTY_LOCAL_STORAGE_KEY, JSON.stringify(settings));
};

export const loadDifficultySettings = () => {
  const defaultSettings: DifficultySettings = {
    difficulty: "Intermediate",
    ...DIFFICULTY_SETTINGS.Intermediate,
  };

  const item = localStorage.getItem(DIFFICULTY_LOCAL_STORAGE_KEY);
  try {
    if (item) {
      const loadedSettings: DifficultySettings = JSON.parse(item);

      return loadedSettings;
    }
  } catch (e) {
    return defaultSettings;
  }

  return defaultSettings;
};

export const getCellIcon = ({
  cellState,
  value,
  gameState,
}: {
  cellState: CellState;
  value: number;
  gameState: GameState;
}) => {
  switch (cellState) {
    case CellState.CLOSED:
      return (gameState === GameState.WIN || gameState === GameState.DEFEAT) && value === MINE_VALUE
        ? "💣"
        : "";

    case CellState.FLAGGED:
      return gameState === GameState.IN_PROGRESS ? "🚩" : value === MINE_VALUE ? "🚩" : "🚫";

    case CellState.OPENED:
    case CellState.BURSTED:
      return value === MINE_VALUE ? "💣" : value > 0 ? value : "";
  }
};
