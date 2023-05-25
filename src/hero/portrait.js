import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const portraitPath = require('./portrait.glb');

let timeHover = -1;
const hoverDuration = 2;

const Portrait = ({scale = 3, flat = false}) => {
  const ref = useRef();
  const {nodes, materials} = useLoader(GLTFLoader, portraitPath);
  const { camera, size } = useThree();
  camera.near = 10;
  camera.zoom = 3;

  useFrame((state) => {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.x = 1.75 + Math.cos(t / 4) / 16;
      ref.current.rotation.y =  Math.sin(t / 4) / 8 - 0.2;
      ref.current.rotation.z = (Math.sin(t / 1.5)) / 20 - 0.5;
      ref.current.position.y = -2 + Math.sin(t / 1.5) / 10 - state.size.height/200;
      ref.current.position.x = -state.size.height/800-state.size.width/60;
      ref.current.position.z = -15;

      const crrtTime = new Date().getTime()/1000;
      const hoverProgress = Math.min(Math.max((crrtTime-timeHover)/hoverDuration, 0), 1);
      ref.current.position.x += 2*Math.sin(Math.PI*hoverProgress);
      ref.current.position.y += 0.5*Math.sin(4*Math.PI*hoverProgress);
      ref.current.rotation.y += 0.25*Math.sin(2*Math.PI*hoverProgress);
      ref.current.rotation.z += 0.75*Math.sin(Math.PI*hoverProgress)
      ref.current.rotation.x += 0.1*Math.sin(4*Math.PI*hoverProgress);
      scale *=  0.25 * Math.sin(2*hoverProgress) + 1
  });

  if (flat) {
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
  return (
    <group ref={ref}>
        <ambientLight intensity={1}/>
        <mesh geometry={nodes.Emanuel.geometry} material={materials.Emanuel} rotation={[0,0,Math.PI]} position={[0,0,0]} scale={[scale, scale, scale]}>
            <meshBasicMaterial attach="material" map={materials.Emanuel.map}/>
        </mesh>
    </group>
  );
}

const handleHover = () => {
  const crrtTime = new Date().getTime()/1000;
  if (crrtTime - hoverDuration > timeHover) {
    timeHover = crrtTime;
  }
  console.log(crrtTime);
}

export default (props) => (
  <Canvas style={{position: 'absolute'}} onMouseOver={handleHover}>
    <Portrait props={props}/>
  </Canvas>
)
