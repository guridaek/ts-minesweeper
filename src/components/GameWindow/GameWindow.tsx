import Board from "../Board/Board";
import OptionBar from "../OptionBar/OptionBar";
import StatusBar from "../StatusBar/StatusBar";
import * as S from "./GameWindow.styled";

function GameWindow() {
  return (
    <S.Container>
      <OptionBar />
      <StatusBar />
      <Board />
    </S.Container>
  );
}

export default GameWindow;
