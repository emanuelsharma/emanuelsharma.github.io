import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.div`
  flex-basis: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`;

const Header = styled.div`
  font-family: sans-serif;
  font-size: 0.15em;
  font-weight: bold;
  padding: 0.1em 0.5em;
  background-color: #fde8c6;
  color: #436b62;
  border-radius: 4px 4px 0 0;
  //font-weight: 800;
  //text-transform: uppercase;
`;

const Body = styled.div`
  font-size: 0.12em;
  padding: 0.5em;
  background-color: #63877c;
  border-radius: 0 0 4px 4px;
  font-family: sans-serif;
  display: flex;
  flex-direction: ${props => props.$column===true ? "column" : "row"};
  gap: 0.5em;
  align-items: stretch;
  flex-wrap: wrap;
  flex: 1;
`;

const Item = styled.div`
  background-color: #436b62;
  color: #fde8c6;
  padding: 0.5em;
  overflow: hidden;
  outline: #fde8c6 solid 2px;
  white-space: pre-line;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s;

  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */

  &:hover {
    background-color: #63877c;
    outline-color: #B9C1B0;
    transform: translate(0, -1px) scale(1.02);
  }
`;

const HighlightedItem = styled(Item)`
  //animation: float 4s ease-in-out infinite, flash 1s ease-in-out infinite;
  //animation-direction: normal, alternate;

  &:hover {
    //animation: float 4s ease-in-out infinite, flashhover 1s ease-in-out infinite;
    //animation-direction: normal, alternate;
  }

  background-color: hsl(162, 15%, 35%);
  color: #fff8d6;
  &:hover {
    background-color: hsl(162, 12%, 42%);
  }

  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.4);
      transform: rotate(0.5deg) translatey(0px);
    }
    20% {
      box-shadow: 0 15px 20px 0px rgba(0,0,0,0.2);
      transform: rotate(-1deg) translatey(-1px) scale(1.01);
    }
    50% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.4);
      transform: rotate(-0.5deg) translatey(0px);
    }
    70% {
      box-shadow: 0 15px 20px 0px rgba(0,0,0,0.2);
      transform: rotate(1deg) translatey(-1px) scale(1.01);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.4);
      transform: rotate(0.5deg) translatey(0px);
    }
  }

  @keyframes flash {
    0% {
      background-color: hsl(162, 15%, 38%);
    }
    100% {
      background-color: hsl(162, 12%, 42%);
    }
  }

  @keyframes flashhover {
    0% {
      background-color: hsl(162, 15%, 40%);
    }
    100% {
      background-color: hsl(162, 12%, 50%);
    }
  }
`

export default ({column, title, items, handleItemSelected}) => (
  <SectionContainer>
    <Header>{title}</Header>
    <Body $column={column}>
      {items.map(item => (<div key={item.id} onMouseDown={() => handleItemSelected(item)}>
        {item.highlighted ? 
          (<HighlightedItem>
            {item.text}
          </HighlightedItem>) : 
          (<Item>
            {item.text}
          </Item>)}
      </div>))}
    </Body>
  </SectionContainer>
);
