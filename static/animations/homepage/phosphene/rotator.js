class Rotator {
  constructor(x, y, l, angle, start) {
    this.pos = createVector(x, y);

    this.l = l;

    this.angle = angle;
    this.angleV = 0;

    this.start = start;
    this.inc = 0.001;

    this.constraint = 0.02;

    let hue = random(360);
    let sat = random(10, 30);
    let bright = 100;

    this.rgb = [hue, sat, bright, 0.2];
    this.rgb1 = [hue, sat, bright, 1];
  }

  move() {
    this.angleA = sin(this.start);

    this.angleV += this.angleA;
    this.angleV = constrain(this.angleV, -this.constraint, this.constraint);
    this.angle += this.angleV;

    this.start += this.inc;
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    strokeWeight(10);
    rotate(this.angle);
    // line(0, 0, this.l, 0);
    line(this.pos.x, this.pos.y, this.pos.x + this.l, this.pos.y);

    strokeWeight(0.3);
    stroke(this.rgb1);
    line(this.pos.x, this.pos.y, this.pos.x + this.l, this.pos.y);
    pop();
  }
}
