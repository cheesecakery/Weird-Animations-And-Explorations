class Particle {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);

    this.m = m;
    this.r = sqrt(m) * SIZE;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }

  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
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
    translate(this.pos.x, this.pos.y);
    ellipse(0, 0, this.r*2);
    pop();
  }

}
