import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Hero from "./hero/hero";
import FontStyles from "./font";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const App = () => (
    <>
        <GlobalStyle/>
        <FontStyles/>
        <Hero/>
    </>
)

export default App;
