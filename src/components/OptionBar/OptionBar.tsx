import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DIFFICULTIES, DIFFICULTY_SETTINGS, Difficulty } from "../../lib/constants";
import * as S from "./OptionBar.styled";
import { useAppDispatch } from "../../redux/hooks";
import { changeDifficulty } from "../../redux/slice/minesweeperSlice";
import CustomGameModal from "../CustomGameModal/CustomGameModal";

function OptionBar() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Intermediate");
  const [menuIsShown, setMenuIsShown] = useState(false);
  const [modalIsShown, setModalIsShown] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const dispatch = useAppDispatch();

  const handleChangeDifficulty = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDifficulty = e.target.value as Difficulty;

    setMenuIsShown(false);

    if (selectedDifficulty === "Custom") {
      openModal();

      return;
    }

    setDifficulty(selectedDifficulty);
    dispatch(changeDifficulty(DIFFICULTY_SETTINGS[selectedDifficulty]));
  };

  const handleMenuClick = () => {
    setMenuIsShown(!menuIsShown);
  };

  const openModal = () => {
    setModalIsShown(true);
  };

  const closeModal = () => {
    setModalIsShown(false);
  };

  const applyCustomDifficulty = ({
    row,
    column,
    mines,
  }: {
    row: number;
    column: number;
    mines: number;
  }) => {
    closeModal();
    setDifficulty("Custom");
    dispatch(changeDifficulty({ row, column, mines }));
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
      {modalIsShown && (
        <CustomGameModal applyDifficulty={applyCustomDifficulty} closeModal={closeModal} />
      )}
    </S.Container>
  );
}

export default OptionBar;
