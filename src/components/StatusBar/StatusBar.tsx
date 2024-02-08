import useInterval from "../../hooks/useInterval";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectGameStatus,
  resetGame,
  selectTimer,
  tickTimer,
} from "../../redux/slice/minesweeperSlice";
import * as S from "./StatusBar.styled";

const ROW = 16;
const COLUMN = 16;
const MINES = 20;

function StatusBar() {
  const status = useAppSelector(selectGameStatus);
  const timer = useAppSelector(selectTimer);
  const dispatch = useAppDispatch();

  useInterval(
    () => {
      dispatch(tickTimer());
    },
    status === "IN_PROGRESS" ? 1000 : null
  );

  const handleResetButtonClick = () => {
    dispatch(resetGame({ row: ROW, column: COLUMN, mines: MINES }));
  };

  return (
    <S.Container>
      <S.Counter>
        {[0, 0, 0].map((value, idx) => (
          <S.Digit key={idx}>{value}</S.Digit>
        ))}
      </S.Counter>
      <S.ResetButton onClick={handleResetButtonClick}>
        {status === "WIN" ? "😎" : status === "DEFEAT" ? "😵" : "🙂"}
      </S.ResetButton>
      <S.Counter>
        {timer.split("").map((value, idx) => (
          <S.Digit key={idx}>{value}</S.Digit>
        ))}
      </S.Counter>
    </S.Container>
  );
}

export default StatusBar;
