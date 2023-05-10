import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Hero from "./hero/hero";
import FontStyles from "./font";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
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
