class Triangular extends Particle {
    constructor(x, y, vx, vy, m) {
    super(x, y, m);
    this.vel = createVector(vx, vy);
    this.angle = 0;
  }

  move() {
    super.move();
    this.angle = this.vel.heading();
  }

  attract(particle) {
    let force = p5.Vector.sub(this.pos, particle.pos);

    let distSq = constrain(force.magSq(), 10, 1000);

    let strength = (G * (this.m * particle.m)) / distSq;

    force.setMag(strength);

    particle.applyForce(force);
  }

  update() {
    push();
    noFill();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    triangle(0, this.r, 0, -this.r, this.r * SIZE, 0);
    pop();
  }
}