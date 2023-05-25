export default class OrbitSim {
  constructor(p5, palette, radiusMin, radiusMax, radiusGapMin, radiusGapMax, widthMin, widthMax, spaceMin, spaceMax, lengthMax) {
    this.palette = palette;
    this.orbits = [];

    for (let i = 0, radius = radiusMin; radius < radiusMax; i += 1) {
      const width = p5.random(widthMin, widthMax);
      radius += p5.random(radiusGapMin, radiusGapMax) + width;

      const lines = [];
      let theta = p5.random(0.25*p5.PI);
      while (theta < p5.TWO_PI) {
        lines.push({start: theta, progress: theta});
        theta += p5.random(spaceMax, lengthMax);
      }
      for (let j = 0; j < lines.length; j += 1) {
        const nextIndex = (j+1)%lines.length;

        lines[j].end = lines[nextIndex].start - p5.random(spaceMin, spaceMax);
        if (lines[j].end <= lines[j].start) {
          lines[j].end += p5.TAU;
        }
      }

      this.orbits.push({
        radius: radius - width/2,
        color: this.palette[p5.random(this.palette.length) >> 0],
        width,
        lines,
      });
    }
  }

  draw(p5, fbo, x, y, prog) {
    fbo.strokeCap(p5.SQUARE);
    for (const {width, radius, color, lines} of this.orbits) 
    {
      fbo.strokeWeight(width);
      fbo.stroke(
        p5.red(color),
        p5.green(color),
        p5.blue(color),
        80);
      for (const line of lines) 
      {
        if (!(line.progress>0)) continue;

        if (line.progress > line.end) {
          line.progress = -1;
          continue;
        }

        const prevRadius = radius + 500*(p5.noise(radius/2500, p5.sin(line.progress), 0)-0.5)*radius/1500;
        const nextRadius = radius + 500*(p5.noise(radius/2500, p5.sin(line.progress+prog), 0)-0.5)*radius/1500;

        const prevX = x + prevRadius*p5.cos(line.progress);
        const prevY = y + prevRadius*p5.sin(line.progress);
        line.progress += prog;
        const nextX = x + nextRadius*p5.cos(line.progress);
        const nextY = y + nextRadius*p5.sin(line.progress);

        const off = p5.createVector(nextX - prevX, nextY - prevY);
        off.normalize();

        for (let k = 0; k < 5; k += 1) {
          const a = 2*p5.PI * (p5.noise(prevX, prevY, p5.frameCount + 0.6*k)-0.5);
          const offA = off.copy();
          offA.rotate(a);
          offA.mult(p5.random(6,7));
          
          fbo.line(prevX-offA.x, prevY-offA.y, nextX+offA.x, nextY+offA.y);
        }
      }
    }
  }

  reset() {
    for (const {lines} of this.orbits) {
      for (const line of lines) {
        line.progress = line.start;
      }
    }
  }

  erase(p5, fbo, x, y, prog) {
    fbo.strokeCap(p5.SQUARE);
    fbo.erase(255, 255);
    for (const {width, radius, lines} of this.orbits) 
    {
      fbo.strokeWeight(width + 1);
      for (const line of lines) 
      {
        if (!(line.progress>0)) continue;

        if (line.progress > line.end) {
          line.progress = -1;
          continue;
        }

        const prevRadius = radius + 500*(p5.noise(radius/2000, p5.sin(line.progress), 0)-0.5)*radius/1500;
        const nextRadius = radius + 500*(p5.noise(radius/2000, p5.sin(line.progress+prog), 0)-0.5)*radius/1500;

        const prevX = x + prevRadius*p5.cos(line.progress);
        const prevY = y + prevRadius*p5.sin(line.progress);
        line.progress += prog;
        const nextX = x + nextRadius*p5.cos(line.progress);
        const nextY = y + nextRadius*p5.sin(line.progress);

        const off = p5.createVector(nextX - prevX, nextY - prevY);

        for (let k = 0; k < 5; k += 1) {
          const a = 0.5*p5.PI * (p5.noise(prevX, prevY, 0.5*k)-0.5);
          const offA = off.copy();
          offA.rotate(a);
          
          fbo.line(prevX-offA.x, prevY-offA.y, nextX+offA.x, nextY+offA.y);
        }
      }
    }
    fbo.noErase();
  }
}
