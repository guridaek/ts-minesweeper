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

export const Counter = styled.ul`
  display: flex;

  width: 58px;
  height: 30px;

  box-sizing: border-box;
  padding: 0 2px 0 2px;

  background-color: #2c3338;
`;

export const Digit = styled.li`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  padding-top: 2px;

  color: crimson;
  font-size: 28px;
  font-weight: bold;
`;
