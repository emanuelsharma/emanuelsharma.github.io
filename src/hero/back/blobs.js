export default class Blob {

  constructor(p5, _slices) {
    this.slices = _slices;
    this.vertices = [_slices];
    for(let i = 0; i < _slices ; i++){
      const theta = i*p5.TAU/_slices;
      const radius = 1 + 0.5*(p5.noise(1, 1*theta, 0)-0.5);
      //const radius = 1 + 0.85*(p5.noise(0.2, p5.sin(theta), 0)-0.5);
      this.vertices[i] = p5.createVector(radius*p5.cos(theta), radius*p5.sin(theta));
    }
  }

  drawBlob(p5, fbo, scale, color, numIterations) {
    fbo.clear();
    fbo.noStroke();
    for (let i = 0; i < numIterations; i++) {
      fbo.fill(p5.red(color),p5.green(color),p5.blue(color),50);
      fbo.push();
        fbo.translate(fbo.width/2, fbo.height/2);
        fbo.scale(1*scale);
        fbo.rotate(p5.random(-0.1, 0.1));
        fbo.translate(0.02*p5.random(-1,1),0.0*p5.random(-1,1));
        fbo.beginShape();
          for(let v of this.vertices){
            fbo.curveVertex(v.x, v.y);
          }
          for(let v of this.vertices.slice(0,3)){
            fbo.curveVertex(v.x, v.y);
          }
        fbo.endShape();
      fbo.pop();
    }
    fbo.fill(p5.red(color),p5.green(color),p5.blue(color),255);
    fbo.push();
      fbo.translate(fbo.width/2, fbo.height/2);
      fbo.scale(scale);
      fbo.beginShape();
        for(let v of this.vertices){
          fbo.curveVertex(v.x, v.y);
        }
        for(let v of this.vertices.slice(0,3)){
          fbo.curveVertex(v.x, v.y);
        }
      fbo.endShape();
    fbo.pop();
  }
} 
