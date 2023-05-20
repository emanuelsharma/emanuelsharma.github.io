import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: relative;
  display: flex;

  font-size: calc(max(14vw, 14vh));
  @media screen and (min-width: 1000px), screen and (min-height: 1000px) {
      font-size: calc(min(16vw, 16vh));
  }

  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

const Back = styled.div`
  position: relative;
  padding: 0.15em;
  padding-right: 0.1em;
  background-color: #fde8c6;
  color: #436b62;
  height: fit-content;
  //--clip: circle(50% at 10% 10%);
  //-webkit-clip-path: var(--clip);
  //clip-path: var(--clip);
`;

const Front = styled.div`
  position: relative;
  background-color: #436b62;
  color: #fde8c6;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
`;

const Title = styled.div`
  position: relative;
  text-align: left;
  font-family: 'Arges', sans-serif;
  text-transform: uppercase;
  font-size: 1em;
  line-height: 0.8;
`;

const Sub = styled.div`
  font-size: 0.4em;
  line-height: 0.85;
`;

const Contact = styled.div`
  font-size: 0.1em; 
  line-height: 0.5em;
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
    <Back>
      <ResumeHeader/>
    </Back>
  </HeaderContainer>
);
