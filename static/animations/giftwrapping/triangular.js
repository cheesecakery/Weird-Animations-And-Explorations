import { Particle } from './particle.js'

export class Triangular extends Particle {
    constructor(x, y, vx, vy, m, SIZE, G, sketch) {
    super(x, y, m, SIZE, sketch);
    this.vel = sketch.createVector(vx, vy);
    this.angle = 0;

    this.G = G;
  }

  move() {
    super.move();
    this.angle = this.vel.heading();
  }

  attract(particle) {
    let force = p5.Vector.sub(this.pos, particle.pos);
    let distSq = this.sketch.constrain(force.magSq(), 10, 1000);
    let strength = (this.G * (this.m * particle.m)) / distSq;
    force.setMag(strength);
    particle.applyForce(force);
  }

  update() {
    this.sketch.push();
    this.sketch.noFill();
    this.sketch.translate(this.pos.x, this.pos.y);
    this.sketch.rotate(this.angle);
    this.sketch.triangle(0, this.r, 0, -this.r, this.r * 3, 0);
    this.sketch.pop();
  }
}