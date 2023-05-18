import React from 'react';
import styled from 'styled-components';
import Background from './back/back.js';
import { RiMailFill } from '@react-icons/all-files/ri/RiMailFill';
import { RiLinkedinBoxFill } from '@react-icons/all-files/ri/RiLinkedinBoxFill';

const HeroContainer = styled.div`
    position: relative;
    transform-origin: top left;
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
`;

const Button = styled.button`
    position: relative;
    width: 100%;
    background-color: transparent;
    border: 3px solid #fde8c6;
    border-radius: 0 0 1rem 0;
    //box-shadow: #422800 4px 4px 0 0;
    color: #fde8c6;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 1.2rem;
    padding: 0 1em;
    line-height: 3em;
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
    height: 2rem;
    font-size: 2rem;
    color: #fde8c6;
    transition: all 0.75s;
    cursor: pointer;
    &:hover {
        transform: translateX(4px);
        color: #fff5e4;
    }
`;

const Hero = ({onResumeOpen}) => {
    return (
        <HeroContainer>
            <StyledBackground />
            <div style={{position: 'absolute', left: '2rem', top: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <TitleContainer>
                    <Title>
                        Emanuel<br/> Sharma
                        <Sub> Software Developer </Sub>
                    </Title>
                    <Contact>
                        <div style={{marginLeft:'0.1rem', position: 'absolute', top: 0, left: 0, display: 'flex', flexDirection: 'column', gap: '0rem'}}>
                            <Link href="https://www.linkedin.com/in/emanuel-sharma-64a79a154/" target="_blank">
                                <RiLinkedinBoxFill size='2rem'/>
                            </Link>
                            <Link href="mailto:send.emanuel@hotmail.com" target="_blank" style={{marginLeft:'0.05rem'}}>
                                <RiMailFill size='1.85rem'/>
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
