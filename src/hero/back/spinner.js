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
  console.log(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight);
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  p5.createCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight).parent(canvasParentRef);
  reset(p5);
}

function reset(p5) {
  const canvasSize = p5.max(p5.height, p5.width);
  orbitLayer = p5.createGraphics(canvasSize, canvasSize);
  orbitSim = new OrbitSim(p5, [p5.color(greenC), p5.color(greenB)], 1, canvasSize, 5, 10, 1, 20, 0.04, 0.05, 2);
}

function draw(p5) {
  p5.clear();
  orbitSim.draw(p5, orbitLayer, orbitLayer.width/2, orbitLayer.height/2, 0.005);

  p5.push();
    p5.translate(p5.width/2, p5.height/2);
    p5.rotate(0.00005*p5.millis());
    p5.translate(-orbitLayer.width/2, -orbitLayer.height/2);
    p5.image(orbitLayer, 0, 0);
  p5.pop();
}

export default (props) => <Sketch setup={setup} draw={draw}/>;
