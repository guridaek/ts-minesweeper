import { useAppSelector } from "../../redux/hooks";
import {
  selectBoard,
  selectBoardHeight,
  selectBoardWidth,
} from "../../redux/slice/minesweeperSlice";
import Cell from "../Cell/Cell";
import * as S from "./Board.styled";

function Board() {
  const board = useAppSelector(selectBoard);
  const width = useAppSelector(selectBoardWidth);
  const height = useAppSelector(selectBoardHeight);

  return (
    <S.Container $width={width} $height={height}>
      {Array.from(Array(height), () => new Array(width).fill(0)).map((row, x) =>
        row.map((_, y) => <Cell key={y} value={board[x][y]} />)
      )}
    </S.Container>
  );
}

export default Board;
