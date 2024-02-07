import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clickCell,
  selectBoard,
  selectBoardRow,
  selectBoardColumn,
  selectCellStatus,
  startGame,
} from "../../redux/slice/minesweeperSlice";
import Cell from "../Cell/Cell";
import * as S from "./Board.styled";

function Board() {
  const board = useAppSelector(selectBoard);
  const row = useAppSelector(selectBoardRow);
  const column = useAppSelector(selectBoardColumn);
  const cellStatus = useAppSelector(selectCellStatus);

  const dispatch = useAppDispatch();

  const handleClickCell =
    ([x, y]: [number, number]) =>
    () => {
      dispatch(startGame([x, y]));
      dispatch(clickCell([x, y]));
    };

  return (
    <S.Container $row={row} $column={column}>
      {Array.from(Array(row), () => new Array(column).fill(0)).map((row, x) =>
        row.map((_, y) => (
          <Cell
            key={y}
            value={board[x][y]}
            status={cellStatus[x][y]}
            handleClick={handleClickCell([x, y])}
          />
        ))
      )}
    </S.Container>
  );
}

export default Board;
