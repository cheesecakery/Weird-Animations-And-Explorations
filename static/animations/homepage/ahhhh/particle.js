class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    // this.acc = p5.Vector.random2D();
  }
  
  update() {
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
    
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
      this.acc.x *= -1;
    } else if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
      this.acc.y *= -1;
    }
  }
}