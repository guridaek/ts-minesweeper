import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    font-family: 'sans-serif';
  }

  body {
    background-color: ghostwhite;
  }
`;

export default GlobalStyle;
