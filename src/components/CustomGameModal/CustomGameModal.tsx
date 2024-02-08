import * as S from "./CustomGameModal.styled";
import { FocusEvent, KeyboardEvent, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectBoardColumn, selectBoardRow, selectMines } from "../../redux/slice/minesweeperSlice";
import { useNumberValidator } from "../../hooks/useNumberValidator";
import { MAX_SIZE, MIN_SIZE } from "../../lib/constants";

interface Props {
  applyDifficulty: ({ row, column, mines }: { row: number; column: number; mines: number }) => void;
  closeModal: () => void;
}

function CustomGameModal({ applyDifficulty, closeModal }: Props) {
  const [row, setRow] = useState(useAppSelector(selectBoardRow).toString());
  const [column, setColumn] = useState(useAppSelector(selectBoardColumn).toString());
  const [mines, setMines] = useState(useAppSelector(selectMines).toString());

  const { isValid: isRowValid, errorMessage: rowErrorMessage } = useNumberValidator({
    numberState: row,
    min: MIN_SIZE,
    max: MAX_SIZE,
  });

  const { isValid: isColumnValid, errorMessage: columnErrorMessage } = useNumberValidator({
    numberState: column,
    min: MIN_SIZE,
    max: MAX_SIZE,
  });

  const { isValid: isMinesValid, errorMessage: minesErrorMessage } = useNumberValidator({
    numberState: mines,
    min: 1,
    max: Math.floor((Number(row) * Number(column)) / 3),
  });

  const handleRowChange = (e: FocusEvent<HTMLInputElement>) => {
    setRow(e.target.value);
  };

  const handleColumnChange = (e: FocusEvent<HTMLInputElement>) => {
    setColumn(e.target.value);
  };

  const handleMinesChange = (e: FocusEvent<HTMLInputElement>) => {
    setMines(e.target.value);
  };

  const handleApplyButtonClick = () => {
    if (!isRowValid || !isColumnValid || !isMinesValid) return;

    applyDifficulty({ row: Number(row), column: Number(column), mines: Number(mines) });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyButtonClick();
    }
  };

  return (
    <S.Container>
      <S.BackDrop onClick={closeModal} />
      <S.ModalViewContainer>
        <S.Title>Custom Game Setup</S.Title>
        <S.OptionList>
          <S.Option>
            세로:
            <S.Input
              value={row}
              onChange={handleRowChange}
              onKeyDown={handleEnter}
              $isValid={isRowValid}
            />
          </S.Option>
          <S.Option>
            가로:
            <S.Input
              value={column}
              onChange={handleColumnChange}
              onKeyDown={handleEnter}
              $isValid={isColumnValid}
            />
          </S.Option>
          <S.Option>
            지뢰의 수:
            <S.Input
              value={mines}
              onChange={handleMinesChange}
              onKeyDown={handleEnter}
              $isValid={isMinesValid}
            />
          </S.Option>
          <S.ErrorMessage>
            {rowErrorMessage || columnErrorMessage || minesErrorMessage}
          </S.ErrorMessage>
        </S.OptionList>
        <S.ButtonContainer>
          <S.PrimaryButton
            onClick={handleApplyButtonClick}
            disabled={!isRowValid || !isColumnValid || !isMinesValid}
          >
            적용
          </S.PrimaryButton>
          <S.SecondaryButton onClick={closeModal}>취소</S.SecondaryButton>
        </S.ButtonContainer>
      </S.ModalViewContainer>
    </S.Container>
  );
}

export default CustomGameModal;
