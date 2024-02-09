import styled from "styled-components";
import { CELL_NUMBER_COLORS } from "../../lib/constants";

export const Container = styled.li`
  width: 18px;
  height: 18px;
`;

export const Button = styled.button<{ $isOpen: boolean; $isBursted: boolean; $number?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 2px outset #ececec;
  border: ${({ $isOpen }) => ($isOpen ? "1px inset lightgray" : "2px outset #ececec")};

  background-color: ${({ $isOpen }) => ($isOpen ? "silver" : "lightgray")};
  background-color: ${({ $isBursted }) => $isBursted && "red"};

  font-weight: bold;
  color: ${({ $number }) => $number && CELL_NUMBER_COLORS[$number]};

  &:hover {
    border-color: ${({ $isOpen }) => !$isOpen && "ivory"};
    background-color: ${({ $isOpen }) => !$isOpen && "ivory"};
  }
`;
