import { MINE_VALUE } from "../../lib/constants";
import * as S from "./Cell.styled";

interface Props {
  value: number;
}

function Cell({ value }: Props) {
  return (
    <S.Container>
      <S.Button>{value === MINE_VALUE ? "💣" : 0 < value ? value : ""}</S.Button>
    </S.Container>
  );
}

export default Cell;
