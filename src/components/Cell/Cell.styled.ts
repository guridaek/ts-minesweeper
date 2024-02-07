import styled from "styled-components";

export const Container = styled.li`
  width: 18px;
  height: 18px;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 2px outset #ececec;
  background-color: lightgray;

  font-weight: bold;

  &:hover {
    border-color: ivory;
    background-color: ivory;
  }
`;
