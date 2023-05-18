import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Background, {doTransition} from './back/back.js';

const HeroContainer = styled.div`
    position: absolute;
    transform-origin: top left;
`;

const StyledBackground = styled(Background)`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: scale(-1, 1);
`;

const Title = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: fit-content;
    padding: 1rem;
    text-align: left;
    font-family: 'Arges', sans-serif;
    font-size: calc(min(20vh, 50vw));
    line-height: 0.8em;
    text-transform: uppercase;
    color: #fde8c6;
    cursor: pointer;
`;

const Body = styled.div`
    width: 100%;
    font-size: 0.3em;
    line-height: 1em;
    text-transform: uppercase;
    color: #FDE8C6;
    vertical-align: bottom;

    display: flex;
    flex-direction: row;
    gap: 0.5rem;
`;

const Hero = () => {
    const [state, setState] = useState(0);

    useEffect(() => {
        doTransition(state);
    }, [state])

    return (
        <HeroContainer>
            <div style={{position: 'relative'}}>
                {state == 0 && <StyledBackground />}
                <Title onClick={() => setState(state === 0 ? 1 : 0)}>
                    Emanuel <br/> Sharma
                    <Body> Software Developer</Body>
                </Title>
            </div>
        </HeroContainer>
    );
}

export default Hero;
