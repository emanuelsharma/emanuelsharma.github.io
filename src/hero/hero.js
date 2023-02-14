import React, { useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { EffectComposer, SSAO, HueSaturation } from "react-postprocessing"

const portraitPath = require('./portrait.glb');

const Title = styled.h1`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.05em;
  font-family: 'Arges', sans-serif;
  font-size: 30em;
  line-height: 0.8em;
  text-transform: uppercase;
  text-align: left;
  color: black;
  margin: 0;
`;

const HeroContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PortraitContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40em;
  height: 100%;
`;
const Divider = styled.hr`
  border: 10px solid black;
  width: 20%;
  margin-top: 0.1em;
  margin-left: 0.01em;
`;

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

    console.log(nodes);
    console.log(materials);
    
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
        <Title>
            Emanuel
            <br/>
            Sharma
            <Divider/>
        </Title>
        <PortraitContainer>
            <Canvas camera={{near: 0.00001}}>
                <Portrait/>
            </Canvas>
        </PortraitContainer>
    </HeroContainer>
);

export default Hero;
