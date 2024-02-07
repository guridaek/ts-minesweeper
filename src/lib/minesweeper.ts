import { MINE_VALUE } from "./constants";

export const createBoard = ({
  width,
  height,
  mines,
  startCoords,
}: {
  width: number;
  height: number;
  mines: number;
  startCoords: [number, number];
}) => {
  const [startX, startY] = startCoords;

  const getRandomCoords = () => {
    const coords: Set<string> = new Set();

    while (coords.size < mines) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (x !== startX || y !== startY) {
        coords.add(`${x},${y}`);
      }
    }

    return Array.from(coords).map((coord) => coord.split(",").map(Number)) as [number, number][];
  };

  const mineCoords = getRandomCoords();

  const board: number[][] = Array.from(Array(width), () => new Array(height).fill(0));

  const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
  const dy = [-1, 0, 1, 1, 1, 0, -1, -1];

  mineCoords.forEach(([mineX, mineY]) => {
    board[mineX][mineY] = MINE_VALUE;

    for (let dir = 0; dir < 8; dir++) {
      const x = mineX + dx[dir];
      const y = mineY + dy[dir];

      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      if (board[x][y] === MINE_VALUE) continue;

      board[x][y] += 1;
    }
  });

  return board;
};
