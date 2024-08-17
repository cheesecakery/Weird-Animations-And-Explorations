class Attractor {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.m = m;
    this.r = sqrt(m) * 3;
  }
  
    attract(particle) {
    let force = p5.Vector.sub(this.pos, particle.pos);

    let distSq = constrain(force.magSq(), 10, 1000);

    let strength = (G * (this.m * particle.m)) / distSq;

    force.setMag(strength);

    particle.applyForce(force);
  }
  
  update() {
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}