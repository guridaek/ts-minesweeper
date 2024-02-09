import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clickCell,
  selectBoard,
  selectBoardRow,
  selectBoardColumn,
  selectCellStatus,
  startGame,
  selectGameStatus,
  toggleFlag,
} from "../../redux/slice/minesweeperSlice";
import Cell from "../Cell/Cell";
import * as S from "./Board.styled";

function Board() {
  const board = useAppSelector(selectBoard);
  const row = useAppSelector(selectBoardRow);
  const column = useAppSelector(selectBoardColumn);
  const cellStatus = useAppSelector(selectCellStatus);
  const gameStatus = useAppSelector(selectGameStatus);

  const dispatch = useAppDispatch();

  const handleLeftClick =
    ([x, y]: [number, number]) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (gameStatus === "IDLE") {
        dispatch(startGame([x, y]));
      }

      if (gameStatus === "IDLE" || gameStatus === "IN_PROGRESS") {
        dispatch(clickCell([x, y]));
      }
    };

  const handleRightClick =
    ([x, y]: [number, number]) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (gameStatus === "IDLE" || gameStatus === "IN_PROGRESS") {
        dispatch(toggleFlag([x, y]));
      }
    };

  return (
    <S.Container $row={row} $column={column}>
      {Array.from(Array(row), () => new Array(column).fill(0)).map((row, x) =>
        row.map((_, y) => (
          <Cell
            key={y}
            value={board[x][y]}
            status={cellStatus[x][y]}
            handleLeftClick={handleLeftClick([x, y])}
            handleRightClick={handleRightClick([x, y])}
          />
        ))
      )}
    </S.Container>
  );
}

export default Board;
