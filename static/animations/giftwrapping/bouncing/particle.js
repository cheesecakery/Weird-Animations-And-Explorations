class Particle {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    // this.vel.mult(random(1, 3));
    this.acc = createVector(0, 0);

    this.m = m;
    this.r = sqrt(m) * 10;
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0, 0);
    this.vel.mult(0.999);
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

  friction() {
    // Check if they are on floor
    let dif = height - (this.pos.y + this.r);
    if (dif < 1) {
      // Apply friction !!

      // Formula: -1 * mu * N * vel
      let mu = 0.4;

      let normal = this.m;

      let friction = this.vel.copy();
      friction.normalize();
      friction.mult(-1);

      friction.setMag(normal * mu);
      this.applyForce(friction);
    }
  }

  update() {
    push();
    // fill(255);
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.r*2);
    // rotate(this.angle);
    // triangle(0, this.r, 0, -this.r, this.r * 3, 0);
    pop();
  }
}
