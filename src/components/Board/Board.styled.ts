import styled from "styled-components";

export const Container = styled.ul<{ $row: number; $column: number }>`
  display: grid;
  grid-template-rows: ${({ $row }) => `repeat(${$row}, 1fr)`};
  grid-template-columns: ${({ $column }) => `repeat(${$column}, 1fr)`};

  border: 2px solid gray;

  width: fit-content;
  height: fit-content;
`;
