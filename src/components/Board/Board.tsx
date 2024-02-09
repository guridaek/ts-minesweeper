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
  areaOpen,
} from "../../redux/slice/minesweeperSlice";
import Cell from "../Cell/Cell";
import * as S from "./Board.styled";
import { CellState } from "../../lib/constants";

function Board() {
  const board = useAppSelector(selectBoard);
  const row = useAppSelector(selectBoardRow);
  const column = useAppSelector(selectBoardColumn);
  const cellStatus = useAppSelector(selectCellStatus);
  const gameStatus = useAppSelector(selectGameStatus);

  const dispatch = useAppDispatch();

  let leftButtonDown = false;
  let rightButtonDown = false;

  const handleMouseDown =
    ([x, y]: [number, number]) =>
    (e: MouseEvent<HTMLElement>) => {
      if (e.button === 0) {
        leftButtonDown = true;
      }

      if (e.button === 2) {
        rightButtonDown = true;
      }

      if (leftButtonDown && rightButtonDown) {
        leftButtonDown = false;
        rightButtonDown = false;

        if (cellStatus[x][y] === CellState.FLAGGED || cellStatus[x][y] === CellState.OPENED) {
          dispatch(areaOpen([x, y]));
        }
      }
    };

  const handleMouseUp =
    ([x, y]: [number, number]) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.button === 0 && leftButtonDown) {
        leftButtonDown = false;

        if (gameStatus === "IDLE") {
          dispatch(startGame([x, y]));
        }

        if (gameStatus === "IDLE" || gameStatus === "IN_PROGRESS") {
          dispatch(clickCell([x, y]));
        }
      }
    };

  const handleContextMenu =
    ([x, y]: [number, number]) =>
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();

      if (rightButtonDown) {
        rightButtonDown = false;

        if (gameStatus === "IDLE" || gameStatus === "IN_PROGRESS") {
          dispatch(toggleFlag([x, y]));
        }
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
            handleMouseDown={handleMouseDown([x, y])}
            handleMouseUp={handleMouseUp([x, y])}
            handleContextMenu={handleContextMenu([x, y])}
          />
        ))
      )}
    </S.Container>
  );
}

export default Board;
