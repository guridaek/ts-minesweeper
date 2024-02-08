import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  align-items: center;

  width: 100%;
  height: 24px;

  padding-bottom: 4px;
  border-bottom: 1px solid gray;
`;

export const MenuContainer = styled.div`
  position: relative;

  :hover {
    cursor: pointer;
  }
`;

export const MenuButton = styled.button`
  width: 60px;

  border-color: #ececec;

  background-color: lightgray;
  font-size: 15px;
`;

export const Menu = styled.ul<{ $isShown: boolean }>`
  position: absolute;

  display: ${({ $isShown }) => ($isShown ? "flex" : "none")};
  flex-direction: column;
  gap: 2px;

  width: 100px;

  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
  border: 1.5px solid black;
  padding: 2px;

  background-color: lightgray;
`;

export const MenuItem = styled.li`
  font-size: 14px;

  &:hover {
    background-color: ivory;
  }
`;

export const CheckedMark = styled.span<{ $isChecked: boolean }>`
  visibility: ${({ $isChecked }) => ($isChecked ? "visible" : "hidden")};

  width: 20px;

  margin-right: 2px;

  font-size: 12px;
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Label = styled.label`
  font-size: 14px;
`;
