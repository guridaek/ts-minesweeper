import { MouseEvent } from "react";
import { CellState } from "../../lib/constants";
import * as S from "./Cell.styled";
import { getCellIcon } from "../../lib/minesweeper";

interface Props {
  value: number;
  status: CellState;
  handleLeftClick: (e: MouseEvent<HTMLButtonElement>) => void;
  handleRightClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Cell({ value, status, handleLeftClick, handleRightClick }: Props) {
  const icon = getCellIcon(status, value);

  return (
    <S.Container>
      <S.Button
        $isOpen={status === CellState.OPENED || status === CellState.BURSTED}
        $isBursted={status === CellState.BURSTED}
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
      >
        {icon}
      </S.Button>
    </S.Container>
  );
}

export default Cell;
