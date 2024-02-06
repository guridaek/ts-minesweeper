import Cell from "../Cell/Cell";
import * as S from "./Board.styled";

const LENGTH = 24;

function Board() {
  return (
    <S.Container $length={LENGTH}>
      {Array.from({ length: LENGTH * LENGTH }).map((_, idx) => (
        <Cell key={idx} />
      ))}
    </S.Container>
  );
}

export default Board;
