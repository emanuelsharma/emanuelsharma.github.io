import React from 'react';
import styled from 'styled-components';
import ResumeBody from './resumeBody';
import ResumeTitle from './resumeTitle';
import Portrait from '../hero/portrait';

const ResumeOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: ${props => props.$open===true ? "flex" : "flex"};
  pointer-events: ${props => props.$open===true ? "auto" : "none"};
  background-color: ${props => props.$open===true ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)"};
  transition: background-color 0.5s;
  font-family: sans-serif;

  font-size: calc(max(14vw, 14vh));
  @media screen and (min-width: 1000px) {
      font-size: calc(min(12.25vw, 12.25vh));
  }
`;

const ResumeLeft = styled.div`
  flex: 0.75;
  background-color: #436b62;
  padding: calc(5 * min(1vw, 1vh));
  color: #fde8c6;
  display: flex;
  transform: ${props => props.$open===true ? "" : "translateX(-100%)"};
  transition: all 1s ease-in-out;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: ${props => props.$open===true ? "2rem 0 4rem 0rem rgba(0,0,0,0.4)" : "0rem 0 1rem 0rem rgba(0,0,0,0.2)"};

  @media screen and (max-width: 1000px) {
    position: absolute;
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    transform: ${props => props.$open===true ? "" : "translateY(-100%)"};
  }
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
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  flex: 1;
`;

const WideBio = styled.div`
  font-size: calc(max(0.125em,1.25rem));
  padding: 0 1em;
  display: none;
  @media screen and (min-width: 500px) {
    display: block;
  }
  @media screen and (min-width: 1000px) {
    display: none;
  }
  @media screen and (min-width: 1500px) {
    display: block;
  }
`

const NarrowBio = styled.div`
  font-size: 0.175em;
  display: block;
  @media screen and (min-width: 500px) {
    display: none;
  }
  @media screen and (min-width: 1000px) {
    display: block;
  }
  @media screen and (min-width: 1500px) {
    display: none;
  }
`

const PortraitContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
`

const Resume = ({open, onResumeClose}) => {
  return (
    <ResumeOut $open={open}>
      <ResumeLeft $open={open}>
        <Header>
          <ResumeTitle/>
          <Blurb>
            <PortraitContainer>
              <Portrait/>
            </PortraitContainer>
            <WideBio>
              <div>
                I make games and websites with an emphasis on proceduralism and interactivity.
              </div>
              <strong>
                Currently open to work!
              </strong>
            </WideBio>
          </Blurb>
        </Header>
        <NarrowBio>
          <div>
            I make games and websites with an emphasis on proceduralism and interactivity.
          </div>
          <strong>
            Currently open to work!
          </strong>
        </NarrowBio>
        <ResumeBody/>
      </ResumeLeft>
      <ResumeRight onClick={onResumeClose}>
      </ResumeRight>
    </ResumeOut>
  );
}

export default Resume;
