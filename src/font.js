import { createGlobalStyle } from "styled-components";
import BabasNeue from "./fonts/BebasNeue-Regular.ttf";
import Arges from "./fonts/Arges.woff";

const FontStyles = createGlobalStyle`

  @font-face {
    font-family: 'Babas Neue';
    src: url(${BabasNeue}) format('ttf');
  }

  @font-face {
    font-family: 'Arges';
    src: url(${Arges}) format('woff');
  }

`;

export default FontStyles;