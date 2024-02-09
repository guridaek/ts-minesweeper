import useInterval from "../../hooks/useInterval";
import { GameState } from "../../lib/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectGameState,
  resetGame,
  selectTimer,
  tickTimer,
  selectMinesLeft,
} from "../../redux/slice/minesweeperSlice";
import * as S from "./StatusBar.styled";

function StatusBar() {
  const gameState = useAppSelector(selectGameState);
  const timer = useAppSelector(selectTimer);
  const minesLeft = useAppSelector(selectMinesLeft);

  const dispatch = useAppDispatch();

  useInterval(
    () => {
      dispatch(tickTimer());
    },
    gameState === GameState.IN_PROGRESS ? 1000 : null
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
        {gameState === GameState.WIN ? "😎" : gameState === GameState.DEFEAT ? "😵" : "🙂"}
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
