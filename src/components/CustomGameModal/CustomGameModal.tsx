import * as S from "./CustomGameModal.styled";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectBoardColumn, selectBoardRow, selectMines } from "../../redux/slice/minesweeperSlice";

interface Props {
  applyDifficulty: ({ row, column, mines }: { row: number; column: number; mines: number }) => void;
  closeModal: () => void;
}

function CustomGameModal({ applyDifficulty, closeModal }: Props) {
  const [row, setRow] = useState(useAppSelector(selectBoardRow));
  const [column, setColumn] = useState(useAppSelector(selectBoardColumn));
  const [mines, setMines] = useState(useAppSelector(selectMines));

  const handleRowChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value));
  };

  const handleColumnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColumn(Number(e.target.value));
  };

  const handleMinesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMines(Number(e.target.value));
  };

  const handleApplyButtonClick = () => {
    applyDifficulty({ row, column, mines });
  };

  return (
    <S.Container>
      <S.BackDrop onClick={closeModal} />
      <S.ModalViewContainer>
        <S.Title>Custom Game Setup</S.Title>
        <S.OptionList>
          <S.Option>
            세로:
            <S.Input value={row} onChange={handleRowChange} />
          </S.Option>
          <S.Option>
            가로:
            <S.Input value={column} onChange={handleColumnChange} />
          </S.Option>
          <S.Option>
            지뢰의 수:
            <S.Input value={mines} onChange={handleMinesChange} />
          </S.Option>
        </S.OptionList>
        <S.ButtonContainer>
          <S.PrimaryButton onClick={handleApplyButtonClick}>적용</S.PrimaryButton>
          <S.SecondaryButton onClick={closeModal}>취소</S.SecondaryButton>
        </S.ButtonContainer>
      </S.ModalViewContainer>
    </S.Container>
  );
}

export default CustomGameModal;
