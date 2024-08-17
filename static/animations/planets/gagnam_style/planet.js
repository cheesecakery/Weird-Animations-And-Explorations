class Planet {
  constructor(x, y, m, img) {
    this.pos = createVector(x, y);
    this.vel = this.pos.copy().normalize();
    this.acc = createVector(0, 0);

    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0, 10));

    this.m = m;
    this.r = sqrt(m) * 3;

    this.img = img;

    this.a = 0;
    this.aV = 0.005;
  }

  applyForce(force) {
    // Scale according to weight
    let f = p5.Vector.div(force, this.m);

    // Add to acceleration
    this.acc.add(f);
  }

  move() {
    // Move the bubble
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.acc.set(0, 0);

    this.a += this.aV;
  }

  edges() {
    // Checks if touching bottom
    if (this.pos.y + this.r >= height / 2) {
      this.pos.y = height / 2 - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y - this.r <= -height / 2) {
      this.pos.y = -height / 2 + this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x + this.r >= width / 2) {
      // Checks if touching sides
      this.pos.x = width / 2 - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x - this.r <= -width / 2) {
      this.pos.x = -width / 2 + this.r;
      this.vel.x *= -1;
    }
  }

  display() {
    // push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    image(this.img, 0, 0, this.r * 2, this.r * 2);
    // pop();
  }
}
