import useInterval from "../../hooks/useInterval";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectGameStatus,
  resetGame,
  selectTimer,
  tickTimer,
  selectMinesLeft,
} from "../../redux/slice/minesweeperSlice";
import * as S from "./StatusBar.styled";

function StatusBar() {
  const status = useAppSelector(selectGameStatus);
  const timer = useAppSelector(selectTimer);
  const minesLeft = useAppSelector(selectMinesLeft);

  const dispatch = useAppDispatch();

  useInterval(
    () => {
      dispatch(tickTimer());
    },
    status === "IN_PROGRESS" ? 1000 : null
  );

  const handleResetButtonClick = () => {
    dispatch(resetGame());
  };

  return (
    <S.Container>
      <S.Counter>
        {minesLeft.split("").map((value, idx) => (
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
