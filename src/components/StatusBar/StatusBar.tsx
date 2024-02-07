import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectGameStatus, resetGame } from "../../redux/slice/minesweeperSlice";
import * as S from "./StatusBar.styled";

const ROW = 16;
const COLUMN = 16;
const MINES = 20;

function StatusBar() {
  const status = useAppSelector(selectGameStatus);
  const dispatch = useAppDispatch();

  const handleResetButtonClick = () => {
    dispatch(resetGame({ row: ROW, column: COLUMN, mines: MINES }));
  };

  return (
    <S.Container>
      <div>지뢰</div>
      <S.ResetButton onClick={handleResetButtonClick}>
        {status === "WIN" ? "😎" : status === "DEFEAT" ? "😵" : "🙂"}
      </S.ResetButton>
      <div>타이머</div>
    </S.Container>
  );
}

export default StatusBar;
