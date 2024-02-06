import * as S from "./App.styled";
import GameWindow from "./components/GameWindow/GameWindow";

function App() {
  return (
    <S.Container>
      <S.Body>
        <GameWindow />
      </S.Body>
    </S.Container>
  );
}

export default App;
