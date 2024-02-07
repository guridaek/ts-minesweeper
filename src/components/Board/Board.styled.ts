import styled from "styled-components";

export const Container = styled.ul<{ $width: number; $height: number }>`
  display: grid;
  grid-template-rows: ${({ $height }) => `repeat(${$height}, 1fr)`};
  grid-template-columns: ${({ $width }) => `repeat(${$width}, 1fr)`};

  border: 2px solid gray;

  width: fit-content;
  height: fit-content;
`;
