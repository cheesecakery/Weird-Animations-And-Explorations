export class Particle {
  constructor(x, y, m, size, sketch) {
    this.sketch = sketch; 

    this.pos = sketch.createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = sketch.createVector(0, 0);

    this.m = m;
    this.r = sketch.sqrt(m) * size;
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
    // Bounce if touching top or bottom
    if (this.pos.y + this.r >= this.sketch.height) {
      this.pos.y = this.sketch.height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y - this.r <= 0) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }

    // Bounce if touching sides
    if (this.pos.x + this.r >= this.sketch.width) {
      this.pos.x = this.sketch.width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x - this.r <= 0) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.sketch.ellipse(this.pos.x, this.pos.y, this.r*2);
  }
}
