const colorA = [82, 142, 146];
const colorB = [101, 167, 161];
const colorC = [126,191,173];
const palette = [colorB,colorC]

export default class OrbitSim {
  constructor(p5, color, radiusMin, radiusMax, radiusGapMin, radiusGapMax, widthMin, widthMax) {
    this.color = color;
    this.radii = [];
    this.lineCount = [];
    this.width = [];
    this.lineStarts = [];
    this.lineEnds = [];
    this.lines = [];
    this.colors = [];
    for (let i = 0, radius = radiusMin; radius < radiusMax; i += 1) {
      radius += p5.random(radiusGapMin, radiusGapMax);
      this.width[i] = p5.random(widthMin, widthMax);
      this.radii[i] = radius + this.width[i]/2;
      this.colors[i] = p5.random(palette.length) >> 0;
      radius += this.width[i];

      this.lineStarts[i] = [];
      this.lineEnds[i] = [];
      this.lines[i] = [];
      for (let j = 0, theta = p5.random(0.25*p5.PI); theta < p5.TWO_PI; j += 1) {
        this.lineStarts[i][j] = this.lines[i][j] = theta;
        theta += p5.random(0.05, 0.5*p5.PI);
      }
      for (let j = 0; j < this.lines[i].length; j += 1) {
        this.lineEnds[i][j] = this.lineStarts[i][(j+1)%this.lines[i].length] - 0.05;
        
        if (this.lineEnds[i][j] <= this.lineStarts[i][j]) {
          this.lineEnds[i][j] += p5.TWO_PI;
        }
      }
    }
  }

  draw(p5, fbo, x, y, prog, mask) {
    fbo.strokeCap(p5.SQUARE);

    for (let i = 0; i < this.radii.length; i+=1) 
    {
      fbo.strokeWeight(this.width[i]);
      for (let j = 0; j < this.lines[i].length; j += 1) 
      {
        if (this.lines[i][j] === false) continue;

        if (this.lines[i][j] > this.lineEnds[i][j]) {
          this.lines[i][j] = false;
          continue;
        }

        const prevX = x + this.radii[i]*p5.cos(this.lines[i][j]);
        const prevY = y + this.radii[i]*p5.sin(this.lines[i][j]);
        this.lines[i][j] += prog;
        const nextX = x + this.radii[i]*p5.cos(this.lines[i][j]);
        const nextY = y + this.radii[i]*p5.sin(this.lines[i][j]);

        const off = p5.createVector(nextX - prevX, nextY - prevY);

        if (p5.color(mask.get(nextX, nextY)).toString() !== 'rgba(0,0,0,0)') {
          continue;
        }

        for (let k = 0; k < 5; k += 1) {
          fbo.stroke(
            palette[this.colors[i]][0],
            palette[this.colors[i]][1],
            palette[this.colors[i]][2],
            50+k*3);

          const a = 0.5*p5.PI * (p5.noise(prevX*100, prevY*100, 2*k)-0.5);
          const offA = off.copy();
          offA.rotate(a);
          
          fbo.line(prevX-offA.x, prevY-offA.y, nextX+offA.x, nextY+offA.y);
        }
      }
    }
  }
}
