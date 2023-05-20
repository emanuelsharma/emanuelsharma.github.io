import React, {useState} from 'react';
import { createGlobalStyle } from 'styled-components';
import Hero from "./hero/hero";
import Resume from "./resume/resume";
import './font.css';

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  body {
    position: relative;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #c5edd0;
    width: 100vw;
    height: 100vh; 
    height: -webkit-fill-available; 
    min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    min-height: -webkit-fill-available; 
  }
`;

const App = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <GlobalStyle/>
      <Hero onResumeOpen={() => setResumeOpen(true)}/>
      <Resume open={resumeOpen} onResumeClose={() => setResumeOpen(false)}/>
    </>
  );
}

export default App;
