import { CellState, MINE_VALUE } from "../../lib/constants";
import * as S from "./Cell.styled";

interface Props {
  value: number;
  status: CellState;
  handleClick: () => void;
}

function Cell({ value, status, handleClick }: Props) {
  const icon = value === MINE_VALUE ? "💣" : value > 0 ? value : "";

  return (
    <S.Container>
      <S.Button
        $isOpen={status !== CellState.CLOSED}
        $isBursted={status === CellState.BURSTED}
        onClick={handleClick}
      >
        {status !== CellState.CLOSED && icon}
      </S.Button>
    </S.Container>
  );
}

export default Cell;
