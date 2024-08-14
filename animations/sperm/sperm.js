class Sperm {
  constructor(x, y, m, d, l, th, angleV) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.max_height = y + 50;
    this.min_height = y - 50;

    this.angle = 0;
    this.angleV = angleV;

    this.m = m;
    this.r = sqrt(m) * 5;
    this.d = d;
    this.l = l;

    this.th = th;

    this.moving = true;
    this.inEgg = false;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }

  move() {
    if (this.moving) {
      if (this.inEgg) {
        let dist = p5.Vector.sub(egg.pos, this.pos);
        this.vel = dist.copy();
        this.vel.mult(0.1);
        this.vel.limit(1);
        this.pos.add(this.vel);
      } else {
        this.vel.limit(0.98);

        this.vel.add(this.acc);
        this.vel.limit(1.0);
        this.pos.add(this.vel);

        this.acc.set(0, 0);
      }

      this.pos.x += this.angleV;
      this.pos.y += 0.2 * sin(this.angle);

      this.angle += this.angleV;
    }
  }

  contain(spiral) {
    let dist = p5.Vector.sub(spiral.pos, this.pos);

    if (dist.mag() <= this.r + this.l) {
      return true;
    }
    return false;
  }

  eat(spiral) {
    let push = createVector(1, 0);
    this.applyForce(push);

    // Remove spiral from array
    let index = spirals.indexOf(spiral);
    spirals.splice(index, 1);
  }

  stopMoving() {
    this.moving = false;

    this.acc.set(0, 0);
    this.vel.set(0, 0);
  }

  settle() {
    let dist = p5.Vector.sub(this.pos, egg.pos);
    if (dist.mag < 5) {
      sperm.stopMoving();
    }
  }

  wrap() {
    if (this.pos.x <= -this.r) {
      this.pos.x = width + this.r;
    } else if (this.pos.x >= width + this.r) {
      this.pos.x = -this.r;
    }

    if (this.pos.y <= -this.r) {
      this.pos.y = height + this.r;
    } else if (this.pos.y >= height + this.r) {
      this.pos.y = -this.r;
    }
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    stroke(255);
    strokeWeight(this.th);

    noFill();
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let theta = map(a, 0, TWO_PI, 0, 30 * TWO_PI);

      let sin_v = this.l * sin(theta);

      let r1 = this.r + sin_v;

      let x = r1 * cos(a);
      let y = r1 * sin(a);

      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
