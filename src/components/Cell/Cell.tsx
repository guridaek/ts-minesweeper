import { MouseEvent } from "react";
import { CellState, MINE_VALUE } from "../../lib/constants";
import * as S from "./Cell.styled";
import { getCellIcon } from "../../lib/minesweeper";
import { useAppSelector } from "../../redux/hooks";
import { selectGameStatus } from "../../redux/slice/minesweeperSlice";

interface Props {
  value: number;
  status: CellState;
  handleMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  handleMouseUp: (e: MouseEvent<HTMLButtonElement>) => void;
  handleContextMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Cell({ value, status, handleMouseDown, handleMouseUp, handleContextMenu }: Props) {
  const gameStatus = useAppSelector(selectGameStatus);
  const icon = getCellIcon({ cellState: status, value: value, gameState: gameStatus });

  return (
    <S.Container>
      <S.Button
        $isOpen={status === CellState.OPENED || status === CellState.BURSTED}
        $isBursted={status === CellState.BURSTED}
        $number={value !== MINE_VALUE ? value : undefined}
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
