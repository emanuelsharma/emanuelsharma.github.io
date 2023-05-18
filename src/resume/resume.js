import React from 'react';
import styled from 'styled-components';
import ResumeBody from './resumeBody';
import ResumeTitle from './resumeTitle';
import Portrait from '../hero/portrait';
import { IoMdMail } from '@react-icons/all-files/io/IoMdMail';
import { IoLogoLinkedin } from '@react-icons/all-files/io/IoLogoLinkedin';

const ResumeOut = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const ResumeLeft = styled.div`
  flex: 0.75;
  background-color: #436b62;
  padding: 4rem 8rem;
  color: #fde8c6;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ResumeRight = styled.div`
  background-color: black;
  opacity: 0.8;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
`;

const Blurb = styled.div`
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

const LinkBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #fde8c6;
`;

const Resume = () => {
  return (
    <ResumeOut>
      <ResumeLeft>
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
            {/*<LinkBox>
              Let's get in touch!
            <div style={{width: '0.5rem'}}/>
            <Link href="https://www.linkedin.com/in/emanuel-sharma-64a79a154/">
              <IoLogoLinkedin/>
            </Link>
            <Link href="mailto:send.emanuel@hotmail.com">
              <IoMdMail/>
            </Link>
            </LinkBox>*/}
          </Blurb>
        </Header>
        <ResumeBody/>
      </ResumeLeft>
      <ResumeRight>
      </ResumeRight>
    </ResumeOut>
  );
}

export default Resume;
