import * as S from "./CustomGameModal.styled";

function CustomGameModal() {
  return (
    <S.Container>
      <S.BackDrop />
      <S.ModalViewContainer>
        <S.Title>Custom Game Setup</S.Title>
        <S.OptionList>
          <S.Option>
            세로: <S.Input />
          </S.Option>
          <S.Option>
            가로: <S.Input />
          </S.Option>
          <S.Option>
            지뢰의 수: <S.Input />
          </S.Option>
        </S.OptionList>
        <S.ButtonContainer>
          <S.PrimaryButton>적용</S.PrimaryButton>
          <S.SecondaryButton>취소</S.SecondaryButton>
        </S.ButtonContainer>
      </S.ModalViewContainer>
    </S.Container>
  );
}

export default CustomGameModal;
