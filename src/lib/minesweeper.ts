import { CellState, MINE_VALUE } from "./constants";

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
  cellStatus,
}: {
  x: number;
  y: number;
  board: number[][];
  cellStatus: CellState[][];
}) => {
  const updatedCellStatus = cellStatus.map((row) => [...row]);

  if (board[x][y] === MINE_VALUE) {
    return {
      updatedCellStatus: updatedCellStatus.map((row, curX) =>
        row.map((status, curY) => {
          if (curX === x && curY === y) {
            return CellState.BURSTED;
          }

          return board[curX][curY] === MINE_VALUE ? CellState.OPENED : status;
        })
      ),

      openCount: 0,
    };
  }

  updatedCellStatus[x][y] = CellState.OPENED;
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
      if (updatedCellStatus[nextX][nextY] !== CellState.CLOSED) continue;

      openCount += 1;
      updatedCellStatus[nextX][nextY] = CellState.OPENED;

      if (board[nextX][nextY] !== 0) continue;

      queue.push([nextX, nextY]);
    }
  }

  return { updatedCellStatus: updatedCellStatus, openCount: openCount };
};
