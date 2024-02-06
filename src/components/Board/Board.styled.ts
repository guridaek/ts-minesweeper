import styled from "styled-components";

export const Container = styled.ul<{ $length: number }>`
  display: grid;
  grid-template-rows: ${({ $length }) => `repeat(${$length}, 1fr)`};
  grid-template-columns: ${({ $length }) => `repeat(${$length}, 1fr)`};

  width: fit-content;
  height: fit-content;
`;
