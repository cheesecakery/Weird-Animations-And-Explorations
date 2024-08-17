class Particle {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    let vx = randomGaussian(0, 0.40);
    let vy = randomGaussian(0, 0.40);
    this.vel = createVector(vx, vy);
    // this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);

    this.r = 50;

    this.lifetime = 255;
  }
  
  emit() {
    
  }
  
  lifeOver() {
    return (this.lifetime < 0);
  }

  applyForce(force) {
    // Add to acceleration
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0, 0);
    
    this.lifetime -= 10;
  }

  show() {
    stroke(255, this.lifetime);
    fill(255, this.lifetime);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
