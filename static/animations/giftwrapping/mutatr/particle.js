class Particle {
  constructor(x, y, vx, vy, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    
    this.angle = 0;

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

  applyForce(force) {
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0, 0);
    
    this.angle = this.vel.heading();
  }

  edges() {
    // Checks if touching bottom
    if (this.pos.y + this.r >= height) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y - this.r <= 0) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x + this.r >= width) {
      // Checks if touching sides
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x - this.r <= 0) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    push();
    fill(255);
    translate(this.pos.x, this.pos.y);
    // ellipse(0, 0, this.r * 2);
    rotate(this.angle);
    triangle(0, this.r, 0, -this.r, this.r * 3, 0);
    pop();
  }
}
