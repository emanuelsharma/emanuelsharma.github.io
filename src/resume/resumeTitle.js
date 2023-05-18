import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  margin: 2rem;

  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
`;

const Back = styled.div`
  position: absolute;
  top: -2rem;
  left: -2rem;
  padding: 2rem;
  padding-right: 1rem;
  background-color: #fde8c6;
  color: #436b62;
  //--clip: circle(50% at 10% 10%);
  //-webkit-clip-path: var(--clip);
  //clip-path: var(--clip);
`;

const Front = styled.div`
  position: relative;
  background-color: #436b62;
  color: #fde8c6;
`;

const Title = styled.div`
  position: relative;
  text-align: left;
  font-family: 'Arges', sans-serif;
  text-transform: uppercase;
  font-size: 10rem;
  line-height: 0.8em;
`;

const Sub = styled.div`
  font-size: 0.4em;
  line-height: 0.85em;
`;

const Contact = styled.div`
  padding: 3px;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  justify-content: flex-end;
`;

const ContactElement = styled.div`
  writing-mode: vertical-rl;
  text-orientation: mixed;
  align-items: end;
`;

const ResumeHeader = () => {
  return (
    <TitleContainer>
      <Title>
        Emanuel<br/> Sharma
        <Sub> Software Developer </Sub>
      </Title>
      <Contact>
        <ContactElement>Montreal, Quebec</ContactElement>
      </Contact>
    </TitleContainer>
  );
}

export default () => (
  <HeaderContainer>
    <Front>
      <ResumeHeader/>
    </Front>
    <Back>
      <ResumeHeader/>
    </Back>
  </HeaderContainer>
);
