import React, { useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Background from './back/back.js';

const portraitPath = require('./portrait.glb');

const Title = styled.div`
    width: 30vw;
    position: relative;
    z-index: 1;
    padding: 1rem;
    font-family: 'Arges', sans-serif;
    font-size: 15rem;
    line-height: 0.8em;
    text-transform: uppercase;
    color: #fde8c6;
`;

const Button = styled.button`
position: relative;
    width: 150px;
    margin-right: 1rem;
    background-color: transparent;
    border: 3px solid #fde8c6;
    border-radius: 0.5em;
    //box-shadow: #422800 4px 4px 0 0;
    color: #fde8c6;
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    font-size: 1.2rem;
    padding: 0 1em;
    line-height: 3em;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition: all 0.15s;
    &:hover {
      background-color: transparent;
      color: #fde8c6;
      border-color: #fde8c6;
    }
`;

const Body = styled.div`
    font-size: 5rem;
    line-height: 0.8em;
    text-transform: uppercase;
    color: #fde8c6;
`;

const HeroContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #c5edd0;
`;

const PortraitContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
`;
const Divider = styled.div`
    float: left;
    width: 40%;
    height: 32px;
    margin: 0.1em;
    margin-left: 0.01em;
    background-color: #fde8c6;
`;

const AnimatedBackground = () => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg" 
        xmlnsXlink="http://www.w3.org/1999/xlink" 
        style={{width: "80%", height: "100%", margin: 'auto', display: 'block', zIndex: '1', position: 'absolute'}} 
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 1920 1080">
            <g transform="translate(960,540) scale(1,1) translate(-960,-540)">
                <g transform="translate(-250, 0) scale(120)" opacity="1">
                    <path 
                    d="M13.392000000000001 0 C13.392000000000001 2.88 15.131713485299045 4.09049031276437 13.882128316640477 6.685280652323337 S10.601450096000088 8.674636583858703 8.349775426492162 10.470287213211856 S6.236394937482546 14.380828981103356 3.4286025503988937 15.021689270897541 S-0.17220796045931008 13.697094889733169 -2.980000347542962 13.056234599938984 S-7.355056197531441 13.84211011122056 -9.606730867039367 12.046459481867407 S-10.816189910290628 8.405361373821307 -12.065775078949196 5.81057103426234 S-15.408000000000003 2.8800000000000017 -15.408000000000003 1.886935788126242e-15 S-13.315360247607765 -3.2157806947033705 -12.065775078949198 -5.810571034262337 S-11.858405536547297 -10.25080885251425 -9.60673086703937 -12.046459481867403 S-5.787792734626617 -12.415374310144799 -2.980000347542965 -13.056234599938984 S0.6208101633152383 -15.662549560691726 3.42860255039889 -15.021689270897541 S6.098100756984232 -12.265937842565009 8.349775426492158 -10.470287213211858 S12.632543147981908 -9.280070991882306 13.882128316640475 -6.68528065232334 S13.392000000000001 -2.880000000000003 13.392000000000001 -3.280093986836271e-15"
                    fill="#7abdae" 
                    strokeWidth="0">
                        <animateTransform 
                        attributeName="transform" 
                        type="rotate"
                        dur="40s" 
                        repeatCount="indefinite" 
                        values="0;51.42857142857143"
                        />
                    </path>
                </g>
                {/*
                <animateTransform 
                attributeName="transform" 
                type="scale" 
                dur="3s" 
                repeatCount="indefinite" 
                values="1 1; 1.1 1; 1 1"
                keySplines="
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1;
                    0.1 0.8 0.2 1"
                keyTimes="0;0.5;1"
                calcMode="spline"
                />
                */}
            </g>
        </svg>
    );
}

const Portrait = () => {
    const ref = useRef();
    const {nodes, materials} = useLoader(GLTFLoader, portraitPath)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        ref.current.rotation.x = Math.PI / 2.25 + Math.cos(t / 4) / 16
        ref.current.rotation.y = Math.sin(t / 4) / 8
        ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20 + Math.PI / 64
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10 - 2
    });
    
    const scale = 1.5;

    if (true) {
        return (
            <group ref={ref}>
                <ambientLight intensity={1}/>
                <mesh geometry={nodes.Emanuel.geometry} material={materials.Emanuel} rotation={[0,0,Math.PI]} position={[0,0,0]} scale={[scale, scale, scale]}>
                    <meshBasicMaterial attach="material" map={materials.Emanuel.map}/>
                </mesh>
            </group>
        );
    }
    return (
        <group ref={ref}>
            <ambientLight color={0xffffff} intensity={0.75}/>
            <directionalLight color={0xffcccc} position={[3, 7, -5]} intensity={2}/>
            <mesh geometry={nodes.Emanuel.geometry} rotation={[0,0,Math.PI]} position={[0,0,0]} scale={[scale, scale, scale]}>
                <meshToonMaterial attach="material" color={0x999999}/>
            </mesh>
        </group>
    );
}


const Hero = () => (
    <HeroContainer>
        <PortraitContainer>
            <Background />
        </PortraitContainer>
        {/*<AnimatedBackground/>*/}
        <Title>
            Emanuel
            Sharma
            <Body>
                Software Developer
            </Body>
        </Title>
        <div style={{padding: '1rem', display: 'flex', height: '64px'}}>
            <Button>See Details</Button>
            <Button>Contact</Button>
        </div>
    </HeroContainer>
);

export default Hero;
