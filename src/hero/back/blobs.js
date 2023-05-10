export default class Blob {

  constructor(p5, _slices) {
    this.slices = _slices;
    this.randomWeights = [_slices];
    for(let i = 0; i < _slices ; i++){
      this.randomWeights[i] = p5.random(1, 1 + i%2 * 0.6);
    }
  }

  drawBlob(p5, fbo, scale, color) {
    fbo.clear();
    fbo.fill(color);
    fbo.noStroke();
    fbo.push();
    fbo.translate(fbo.width/2, fbo.height/2);
    fbo.scale(scale);
    fbo.beginShape();
      for(var i = 0, j = 0; i < p5.TWO_PI; i += p5.TWO_PI/this.slices, j++){
        const radius = this.randomWeights[j];
        fbo.curveVertex(radius*p5.cos(i), radius*p5.sin(i));
      }
      {
        const radius = this.randomWeights[0];
        fbo.curveVertex(radius*p5.cos(0), radius*p5.sin(0));
      }
      {
        const radius = this.randomWeights[1];
        fbo.curveVertex(radius*p5.cos(p5.TWO_PI/this.slices), radius*p5.sin(p5.TWO_PI/this.slices));
      }
      {
        const radius = this.randomWeights[2];
        fbo.curveVertex(radius*p5.cos(2*p5.TWO_PI/this.slices), radius*p5.sin(2*p5.TWO_PI/this.slices));
      }
    fbo.endShape();
    fbo.pop();
  }
} 
