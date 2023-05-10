export default class Particle{
  constructor(_loc, _color){
    this.loc = _loc;
    this.color = _color;
  }
  move(p5, mask){
    let vel = p5.createVector(-this.loc.y, this.loc.x);
    vel.normalize();
    vel.mult(2);
    const coll = this.checkCollisions(p5, this.loc, vel, mask);
    if (coll) vel.sub(coll);
    this.prev = this.loc;
    this.loc.add(vel);
  }
  checkCollisions(p5, pos, vel, mask){
    for (let i = -3.145/8; i < 3.145/8; i += 3.145/8) {
      const posToCheck = pos.copy();
      const velToCheck = vel.copy();
      velToCheck.rotate(i);
      for (let j = 0; j < 2; j += 1) {
        posToCheck.add(velToCheck);
        if (this.checkCollision(p5, posToCheck, mask)) return velToCheck;
      }
    }
    return false;
  }
  checkCollision(p5, posToCheck, mask){
    let colorToCheck = p5.color(mask.get(posToCheck.x, posToCheck.y));
    return colorToCheck.levels[1] > 200;
  }
  checkEdges(){
    if (this.loc.x<-p5.width || this.loc.x>p5.width || this.loc.y<-p5.height || this.loc.y>p5.height) {  
      this.dead = true;
    }
  }
  draw(fbo) {
    fbo.stroke(this.color);
    fbo.strokeWeight(15);
    fbo.line(this.prev.x, this.prev.y, this.loc.x, this.loc.y);
  }
}
