import { MouseEvent } from "react";
import { CellState, MINE_VALUE } from "../../lib/constants";
import * as S from "./Cell.styled";
import { getCellIcon } from "../../lib/minesweeper";
import { useAppSelector } from "../../redux/hooks";
import { selectGameState } from "../../redux/slice/minesweeperSlice";

interface Props {
  value: number;
  state: CellState;
  handleMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  handleMouseUp: (e: MouseEvent<HTMLButtonElement>) => void;
  handleContextMenu: (e: MouseEvent<HTMLButtonElement>) => void;
}

function Cell({ value, state, handleMouseDown, handleMouseUp, handleContextMenu }: Props) {
  const gameState = useAppSelector(selectGameState);
  const icon = getCellIcon({ cellState: state, value: value, gameState: gameState });

  return (
    <S.Container>
      <S.Button
        $isOpen={state === CellState.OPENED || state === CellState.BURSTED}
        $isBursted={state === CellState.BURSTED}
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
