import styled from "styled-components";

export const Container = styled.div``;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.5);
`;

export const ModalViewContainer = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  width: 260px;
  height: 200px;

  margin: 0;

  border: none;
  border-radius: 8px;
  background: white;
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.3);

  z-index: 999;
  transform: translate(-50%, -50%);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 160px;
`;

export const Option = styled.li`
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input<{ $isValid: boolean }>`
  width: 30px;

  border: ${({ $isValid }) => ($isValid ? "1px solid black" : "1px solid red")};
  outline: ${({ $isValid }) => ($isValid ? "" : "1px solid red")};
`;

export const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;

  gap: 10px;
`;

export const PrimaryButton = styled.button`
  width: 60px;
  height: 20px;

  border: 1px solid black;
  border-radius: 2px;

  background-color: lightgray;
  font-weight: bold;

  cursor: pointer;

  :disabled {
    color: gray;
  }
`;

export const SecondaryButton = styled.button`
  width: 60px;
  height: 20px;

  background-color: white;

  border: 1px solid black;
  border-radius: 2px;

  cursor: pointer;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 70%;

  color: red;
  font-size: 14px;
`;
