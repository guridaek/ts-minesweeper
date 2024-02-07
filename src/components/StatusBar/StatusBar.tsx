import { useAppDispatch } from "../../redux/hooks";
import { setDifficulty, startGame } from "../../redux/slice/minesweeperSlice";
import * as S from "./StatusBar.styled";

const WIDTH = 16;
const HEIGHT = 16;

function StatusBar() {
  const dispatch = useAppDispatch();

  return (
    <S.Container>
      <div>지뢰</div>
      <S.ResetButton
        onClick={() => {
          dispatch(setDifficulty({ width: WIDTH, height: HEIGHT, mines: 40 }));

          dispatch(startGame([1, 1]));
        }}
      >
        🙂
      </S.ResetButton>
      <div>타이머</div>
    </S.Container>
  );
}

export default StatusBar;
