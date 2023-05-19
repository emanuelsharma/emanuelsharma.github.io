import React from "react";
import Sketch from "react-p5";
import OrbitSim from "./orbitSim";

const greenA = '#436b62';
const greenB = '#63877c';
const greenC = '#c5edd0';

var orbitLayer;
var orbitSim;

var blobRadius;
var orbitSimRadius;

var state = 0;

function setup(p5, canvasParentRef) {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  reset(p5);
}

function reset(p5) {
  const canvasSize = 2.5*p5.max(p5.height, p5.width);
  blobRadius = p5.max(p5.height, p5.width) > 1000
    ? p5.min(0.7*p5.height, 0.7*p5.width) 
    : p5.max(0.65*p5.height, 0.65*p5.width);
  orbitSimRadius = 4*blobRadius;

  orbitLayer = p5.createGraphics(canvasSize, canvasSize);
  orbitSim = new OrbitSim(p5, [p5.color(greenA), p5.color(greenB)], blobRadius + 20, 3*blobRadius, 10, 20, 2, 40, 0.03, 0.05, 2);

  createBlob(p5);
}

function createBlob(p5) {
  const blobSimA = new OrbitSim(p5, [p5.color(greenA)], 0, 0.5*blobRadius, -8, -4, 5, 20, 0, 0, 7);
  const blobSimB = new OrbitSim(p5, [p5.color(greenA)], 0.5*blobRadius, blobRadius, -6, -4, 10, 30, 0, 0, 7);
  {
    let theta = 0;
    const delta = 0.05;
    while (theta < p5.TAU+1) {
      blobSimA.draw(p5, orbitLayer, orbitLayer.width/2, orbitLayer.height/2, delta);
      theta += delta;
    }
  }
  {
    let theta = 0;
    const delta = 0.01;
    while (theta < p5.TAU+1) {
      blobSimB.draw(p5, orbitLayer, orbitLayer.width/2, orbitLayer.height/2, delta);
      theta += delta;
    }
  }
}

function windowResized(p5) {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  reset(p5);
}

function draw(p5) {
  p5.clear();
  if (state === 0) {
    orbitSim.draw(p5, orbitLayer, orbitLayer.width/2, orbitLayer.height/2, 0.005);
  }
  else {
    orbitSim.erase(p5, orbitLayer, orbitLayer.width/2, orbitLayer.height/2, 0.01);
  }

  p5.push();
    p5.rotate(0.00005*p5.millis());
    p5.translate(-orbitLayer.width/2, -orbitLayer.height/2);
    p5.image(orbitLayer, 0, 0);
  p5.pop();
}

export const doTransition = (_state) => {
  state = _state;
  orbitSim?.reset();
}

export default (props) => <Sketch setup={setup} draw={draw} windowResized={windowResized}/>;
