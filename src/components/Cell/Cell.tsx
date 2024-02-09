import { MouseEvent } from "react";
import { CellState } from "../../lib/constants";
import * as S from "./Cell.styled";
import { getCellIcon } from "../../lib/minesweeper";

interface Props {
  value: number;
  status: CellState;
  handleMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  handleMouseUp: (e: MouseEvent<HTMLButtonElement>) => void;
  handleContextMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Cell({ value, status, handleMouseDown, handleMouseUp, handleContextMenu }: Props) {
  const icon = getCellIcon(status, value);

  return (
    <S.Container>
      <S.Button
        $isOpen={status === CellState.OPENED || status === CellState.BURSTED}
        $isBursted={status === CellState.BURSTED}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
      >
        {icon}
      </S.Button>
    </S.Container>
  );
}

export default Cell;
