import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DIFFICULTIES, DIFFICULTY_SETTINGS, Difficulty } from "../../lib/constants";
import * as S from "./OptionBar.styled";
import { useAppDispatch } from "../../redux/hooks";
import { changeDifficulty } from "../../redux/slice/minesweeperSlice";

function OptionBar() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Intermediate");
  const [menuIsShown, setMenuIsShown] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const handleChangeDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDifficulty = e.target.value as Difficulty;

    setDifficulty(selectedDifficulty);
    setMenuIsShown(false);

    dispatch(
      changeDifficulty(
        selectedDifficulty !== "Custom"
          ? DIFFICULTY_SETTINGS[selectedDifficulty]
          : { row: 10, column: 10, mines: 10 }
      )
    );
  };

  const handleMenuClick = () => {
    setMenuIsShown(!menuIsShown);
  };

  useEffect(() => {
    const handleOutsideMenuClick = (e: MouseEvent) => {
      if (!menuIsShown) return;

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuIsShown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideMenuClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideMenuClick);
    };
  }, [menuIsShown, menuRef]);

  return (
    <S.Container>
      <S.MenuContainer>
        <S.MenuButton onClick={handleMenuClick}>Game</S.MenuButton>
        <S.Menu ref={menuRef} $isShown={menuIsShown}>
          {DIFFICULTIES.map((value) => (
            <S.MenuItem key={value}>
              <S.Label htmlFor={value}>
                <S.HiddenInput
                  type="radio"
                  id={value}
                  name="difficulty"
                  value={value}
                  checked={value === difficulty}
                  onChange={handleChangeDifficulty}
                />
                <S.CheckedMark $isChecked={value === difficulty}>✔️</S.CheckedMark>
                {value}
              </S.Label>
            </S.MenuItem>
          ))}
        </S.Menu>
      </S.MenuContainer>
    </S.Container>
  );
}

export default OptionBar;
