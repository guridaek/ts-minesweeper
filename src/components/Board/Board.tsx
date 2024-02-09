import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clickCell,
  selectBoard,
  selectBoardRow,
  selectBoardColumn,
  selectCellState,
  startGame,
  selectGameState,
  toggleFlag,
  areaOpen,
} from "../../redux/slice/minesweeperSlice";
import Cell from "../Cell/Cell";
import * as S from "./Board.styled";
import { CellState, GameState } from "../../lib/constants";

function Board() {
  const board = useAppSelector(selectBoard);
  const row = useAppSelector(selectBoardRow);
  const column = useAppSelector(selectBoardColumn);
  const cellState = useAppSelector(selectCellState);
  const gameState = useAppSelector(selectGameState);

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

        if (cellState[x][y] === CellState.FLAGGED || cellState[x][y] === CellState.OPENED) {
          dispatch(areaOpen([x, y]));
        }
      }
    };

  const handleMouseUp =
    ([x, y]: [number, number]) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      if (e.button === 0 && leftButtonDown) {
        leftButtonDown = false;

        if (gameState === GameState.IDLE) {
          dispatch(startGame([x, y]));
        }

        if (gameState === GameState.IDLE || gameState === GameState.IN_PROGRESS) {
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

        if (gameState === GameState.IDLE || gameState === GameState.IN_PROGRESS) {
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
            state={cellState[x][y]}
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
