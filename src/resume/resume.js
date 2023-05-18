import React from 'react';
import styled from 'styled-components';
import ResumeBody from './resumeBody';
import ResumeTitle from './resumeTitle';
import Portrait from '../hero/portrait';

const ResumeOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: ${props => props.$open===true ? "flex" : "flex"};
  pointer-events: ${props => props.$open===true ? "auto" : "none"};
  background-color: ${props => props.$open===true ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)"};
  transition: background-color 0.5s;
`;

const ResumeLeft = styled.div`
  flex: 0.75;
  background-color: #436b62;
  padding: 4rem 8rem;
  color: #fde8c6;
  display: flex;
  transform: ${props => props.$open===true ? "" : "translateX(-100%)"};
  transition: all 1s ease-in-out;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: ${props => props.$open===true ? "2rem 0 4rem 0rem rgba(0,0,0,0.4)" : "0rem 0 1rem 0rem rgba(0,0,0,0.2)"};
`;

const ResumeRight = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const Blurb = styled.div`
  height: 100%;
  text-align: left;
  font-family: sans-serif;
  font-size: 1.25rem;
  line-height: 1em;
  align-self: end;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;

const Resume = ({open, onResumeClose}) => {
  return (
    <ResumeOut $open={open}>
      <ResumeLeft $open={open}>
        <Header>
          <ResumeTitle/>
          <Blurb>
            <div style={{width: '100%', flex: '1'}}>
              <Portrait/>
            </div>
            <div>
              I make games and websites with an emphasis on proceduralism and interactivity.
            </div>
            <strong>
              Currently open to work!
            </strong>
          </Blurb>
        </Header>
        <ResumeBody/>
      </ResumeLeft>
      <ResumeRight onClick={onResumeClose}>
      </ResumeRight>
    </ResumeOut>
  );
}

export default Resume;
