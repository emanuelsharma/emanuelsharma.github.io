import React from "react";
import Sketch from "react-p5";

//https://www.openprocessing.org/sketch/157576

var noiseScale=0.5;
var strokeWidth = 25;
var maskWidth = strokeWidth*1.25;

var particleIndex = 0;
var numParticles = 100;
var particles = [];
var fbo = [4];
var fboMask = [4];

var animateIndex = 0;

var p5;

function getCoords(index) {
    const theta = p5.randomGaussian(p5.PI/4-p5.radians(0.05 * p5.frameCount),p5.PI/4);
    const r = p5.randomGaussian(p5.width, p5.width/2);
    let x = r * p5.cos(theta);
    let y = r * p5.sin(theta);/*
    for (let quad = 0; quad < 4; quad++)
    {
      const origin = getOrigin(quad);
      fbo[quad].strokeWeight(5);
      fbo[quad].stroke(255);
      fbo[quad].point(x-origin.x, y-origin.y);
    }*/
    return p5.createVector(x,y);
}
function getQuad(loc) {
  if(loc.x>0) return (loc.y>0) ? 0 : 1;
    return (loc.y>0) ? 3 : 2;
}

function resetQuad(index) {
  let crrtFbo = fbo[index];
  let crrtFboMask = fboMask[index];
  crrtFbo.noStroke();
  crrtFbo.fill(197, 237, 208, 255);
  crrtFbo.rect(0, 0, p5.width, p5.height);
  crrtFboMask.noStroke();
  crrtFboMask.fill(0, 255);
  crrtFboMask.rect(0, 0, p5.width, p5.height);
}

function setup(p5c, canvasParentRef) {
  p5 = p5c;
  p5.noiseDetail(4, 0.4);
  p5.createCanvas(2*p5.windowWidth, 2*p5.windowHeight).parent(canvasParentRef);
  for (let i=0; i<4; i++) {
    fbo[i] = p5.createGraphics(p5.width, p5.height);
    fbo[i].smooth();
    fboMask[i] = p5.createGraphics(p5.width, p5.height);
    fboMask[i].noSmooth();
    resetQuad(i);
  }
  for (; particleIndex < numParticles;) {
    spawnParticle();
  }
}

function windowResized() {
  p5.resizeCanvas(2*p5.windowWidth, 2*p5.windowHeight);
}

function getOrigin(quadIndex) {
      let isLeft = quadIndex/2>>0;
      let isRight = 1-isLeft;
  let v = p5.createVector(-p5.width*(quadIndex/2 >> 0),-p5.height*(isLeft*(1-quadIndex%2)+isRight*(quadIndex%2)));
  return v;
}

function draw() {
  const prog = 0.05 * p5.frameCount;
  
  const newAnimateIndex = (prog/90)%4 >> 0;
  if (newAnimateIndex != animateIndex) {
    resetQuad((animateIndex+3)%4);
    animateIndex = newAnimateIndex;
  }
  animate();
  
  p5.fill(197, 237, 208, 255);
  p5.rect(0, 0, p5.width, p5.height);
  for (let i=0; i<4; i++) {
    p5.push();
      p5.rotate(p5.radians(prog));
      const origin = getOrigin(i);
      p5.translate(origin);
      p5.image(fbo[i],0,0);
    p5.pop();
  }
}

function spawnParticle() {
  particleIndex += 1;
  particles.push(new Particle(getCoords(particleIndex), particleIndex));
}

function animate() {
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
}

var startLifeA = 150;
var startLifeB = 200;

class Particle{
  constructor(_loc, _index){
    this.dead = false;
    this.loc = _loc;
    this.index = _index;
    this._color = p5.color(p5.random(1,255), p5.random(0,255), p5.random(0,255));
    this.life = p5.random(startLifeA,startLifeB);
  }
  run() {
    if (this.dead) {
      this.dead = false;
      this.loc = getCoords(particleIndex);
      this.life = p5.random(startLifeA,startLifeB);
    }
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle=getNoise(this.loc);
    let originalVel = p5.createVector(2*p5.cos(angle), 2*p5.sin(angle));
    let offVel = originalVel.copy();
    offVel.mult(1*maskWidth);
    
    var potLoc = this.loc.copy();
    var off = offVel.copy();
    off.rotate(p5.PI/2);
    potLoc.add(off);
    this.checkCollision(potLoc);
    
    potLoc = this.loc.copy();
    off = offVel.copy();
    off.rotate(-p5.PI/2);
    potLoc.add(off);
    this.checkCollision(potLoc);
    
    potLoc = this.loc.copy();
    off = offVel.copy();
    potLoc.add(off);
    this.checkCollision(potLoc);
    
    this.loc.add(originalVel);
    this.loc = p5.createVector(((this.loc.x + p5.width) % (2 * p5.width)) - p5.width, ((this.loc.y + p5.height) % (2 * p5.height)) - p5.height);
    this.checkCollision(this.loc);
  }
  checkCollision(collCheck){
    const quad = getQuad(collCheck);
    const origin = getOrigin(quad);
    let v = fboMask[quad].get(collCheck.x - origin.x, collCheck.y - origin.y);
    let testColor = p5.color(v);
    if (v[0] != 0 && testColor.toString() != this._color.toString())
      this.dead = v[0] != 0 && testColor.toString() != this._color.toString();
  }
  checkEdges(){
    if (this.loc.x<-p5.width || this.loc.x>p5.width || this.loc.y<-p5.height || this.loc.y>p5.height) {  
      this.dead = true;
    }
  }
  update(){
    if (this.dead) return;
    let from = p5.color('#7abdae');
    let to = p5.color(253, 232, 198);
    let inter = p5.lerpColor(from, to, this.index%4/3);
    this.life += 1;
    for (let quad = 0; quad < 4; quad++)
    {
      const origin = getOrigin(quad);
      fbo[quad].fill(inter);
      //fbo[quad].rect(this.loc.x - origin.x - strokeWidth/2, this.loc.y - origin.y + strokeWidth/2, strokeWidth, strokeWidth);
      fbo[quad].ellipse(this.loc.x - origin.x, this.loc.y - origin.y, p5.min(this.life/10,strokeWidth), p5.min(this.life/10,strokeWidth));
      fboMask[quad].fill(this._color);
      fboMask[quad].rect(this.loc.x - origin.x - maskWidth/2, this.loc.y - origin.y - maskWidth/2, maskWidth, maskWidth);
      fboMask[quad].fill(100);
      //fboMask[quad].ellipse(this.loc.x - origin.x, this.loc.y - origin.y, 10, 10);
    }
  }
}

function getNoise(loc) {
  const n = p5.noise(loc.x/(p5.width * noiseScale), loc.y/(p5.height * noiseScale), p5.frameCount*0.00001)*2*p5.PI;
  return n;
}

export default (props) => <Sketch setup={setup} draw={draw} />;
