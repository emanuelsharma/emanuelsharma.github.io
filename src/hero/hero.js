import React from 'react';
import styled from 'styled-components';
import Background from './back/back.js';
import { RiMailFill } from '@react-icons/all-files/ri/RiMailFill';
import { RiLinkedinBoxFill } from '@react-icons/all-files/ri/RiLinkedinBoxFill';

const HeroContainer = styled.div`
    position: relative;
    transform-origin: top left;
    font-size: calc(max(16vw, 16vh));
    @media screen and (min-width: 1000px), screen and (min-height: 1000px) {
        font-size: calc(min(18vw, 18vh));
    }
`;

const StyledBackground = styled(Background)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;

const TitleContainer = styled.div`
    display: flex;
    color: #fde8c6;

    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`;

const Title = styled.div`
    position: relative;
    text-align: left;
    font-family: 'Arges', sans-serif;
    text-transform: uppercase;
    font-size: 1em;
    line-height: 0.8em;
`;

const Sub = styled.div`
    font-size: 0.4em;
    line-height: 0.85em;
`;

const Contact = styled.div`
    position: relative;
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
    font-size: 0.1em;
`;

const Button = styled.button`
    position: relative;
    width: 100%;
    background-color: transparent;
    border: 3px solid #fde8c6;
    border-radius: 0 0 1em 0;
    //box-shadow: #422800 4px 4px 0 0;
    color: #fde8c6;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 0.12em;
    padding: 0em 1em;
    line-height: 2.5em;
    text-align: left;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition: all 0.15s;
    &:hover {
        background-color: #fde8c6;
        color: #436b62;
    }
`;

const Link = styled.a`
    height: 0.2em;
    color: #fde8c6;
    transition: all 0.15s;
    cursor: pointer;
    &:hover {
        transform: translateX(4px);
        color: #fff5e4;
    }
    * {
        position: absolute;
    }
`;

const Hero = ({onResumeOpen}) => {
    return (
        <HeroContainer>
            <StyledBackground />
            <div style={{position: 'absolute', left: 'calc(min(3vw, 3vh))', top: 'calc(min(3vw, 3vh))', display: 'flex', flexDirection: 'column', gap: '0.1em'}}>
                <TitleContainer>
                    <Title>
                        Emanuel<br/> Sharma
                        <Sub> Software Developer </Sub>
                    </Title>
                    <Contact>
                        <div style={{position: 'absolute', top: '-0.025em', left: 0, display: 'flex', flexDirection: 'column'}}>
                            <Link href="https://www.linkedin.com/in/emanuel-sharma-64a79a154/" target="_blank">
                                <RiLinkedinBoxFill size='0.2em'/>
                            </Link>
                            <Link href="mailto:send.emanuel@hotmail.com" target="_blank" style={{marginLeft:'0.015em'}}>
                                <RiMailFill size='0.18em'/>
                            </Link>
                        </div>
                        <ContactElement>Montreal, Quebec</ContactElement>
                    </Contact>
                </TitleContainer>
                <Button onClick={onResumeOpen}>See Resume</Button>
            </div>
        </HeroContainer>
    );
}

export default Hero;
