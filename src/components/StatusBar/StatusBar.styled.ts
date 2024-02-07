import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 45px;

  border-bottom: 1px solid gray;
  margin-bottom: 20px;
`;

export const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  border-color: #ececec;

  background-color: lightgray;
  font-size: 24px;

  &:hover {
    cursor: pointer;
  }
`;
