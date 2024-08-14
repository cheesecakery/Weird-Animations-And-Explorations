class Egg {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.m = m;
    this.r = sqrt(m) * 10;

    this.angle = 0;
    this.inc = 1;

    this.th = 0.2;

    this.cracked = false;
  }

  contain(sperm) {
    let dist = p5.Vector.sub(this.pos, sperm.pos);

    if (dist.mag() - sperm.r <= this.r) {
      return true;
    }
    return false;
  }

  // Exerts force to attract bubble
  attract(sperm) {
    // Find distance between the two
    let force = p5.Vector.sub(this.pos, sperm.pos);

    let min = 200;
    let max = 2000;

    let distanceSq = constrain(force.magSq(), min, max);

    let G = attraction;

    let constant = (G * (this.m * sperm.m)) / distanceSq;

    force.setMag(constant);

    sperm.applyForce(force);
  }

  crack() {
    this.th = 0.1;
    this.inc = 1;

    // Picks a random sperm
    setTimeout(() => {
      sperm.moving = true;
      sperm.inEgg = true;
    }, 2500);
  }

  draw() {
    stroke(255, 50);
    noFill(0);

    strokeWeight(this.th);

    let inc = random(0.01, this.inc);

    push();
    translate(this.pos.x, this.pos.y);
    rotate(map(noise(this.angle), 0, 1, -5, 5));
    beginShape();
    for (let a = 0; a < TWO_PI; a += inc) {
      let r1 = this.r;

      let x = r1 * cos(a);
      let y = r1 * sin(a);

      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    this.angle += 0.01;
  }
}
