import React, {useState} from 'react';
import { createGlobalStyle } from 'styled-components';
import Hero from "./hero/hero";
import Resume from "./resume/resume";
import FontStyles from "./font";

const GlobalStyle = createGlobalStyle`
  body {
    position: relative;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #c5edd0;
    width: 100vw;
    height: 100vh;
  }
`;

const App = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <GlobalStyle/>
      <FontStyles/>
      <Hero onResumeOpen={() => setResumeOpen(true)}/>
      <Resume open={resumeOpen} onResumeClose={() => setResumeOpen(false)}/>
    </>
  );
}

export default App;
