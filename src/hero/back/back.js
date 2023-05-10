import React from "react";
import Sketch from "react-p5";
import Blob from "./blobs";
import OrbitSim from "./orbitSim";

const greenA = '#7abdae';
const greenB = '#c5edd0';
const orange = '#fde8c6';

var blob;
var blobLayer;

var orbitLayer;
var orbitSim;
var mask;

function setup(p5, canvasParentRef) {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  blob = new Blob(p5, 10);
  reset(p5);
}

function reset(p5) {
  const canvasSize = 3*p5.max(p5.height, p5.width);
  const blobSize = p5.min(p5.height/2, p5.width/2);

  orbitLayer = p5.createGraphics(canvasSize, canvasSize);
  orbitSim = new OrbitSim(p5, greenA, 1.5*blobSize, 5*blobSize, 10, 20, 2, 40);

  blobLayer = p5.createGraphics(canvasSize, canvasSize);
  blob.drawBlob(p5, blobLayer, 1.5*blobSize, p5.color(greenA));

  mask = p5.createGraphics(canvasSize, canvasSize);
  blob.drawBlob(p5, mask, 1.55*blobSize, p5.color('#000000'));
}

function windowResized(p5) {
  p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  reset(p5);
}

function draw(p5) {
  p5.background(greenB);
  const canvasRadius = 1.5*p5.max(p5.height, p5.width);

  orbitSim.draw(p5, orbitLayer, orbitLayer.width/2, orbitLayer.height/2, 0.01, mask);
  
  p5.push();
    p5.rotate(0.00005*p5.millis());
    p5.translate(-canvasRadius, -canvasRadius);
    p5.image(orbitLayer, 0, 0);
    p5.image(blobLayer, 0, 0);
  p5.pop();
}

export default (props) => <Sketch setup={setup} draw={draw} windowResized={windowResized}/>;
