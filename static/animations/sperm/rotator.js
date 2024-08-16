class Rotator {
  constructor(x, y, l, angle, start, vel, col, range) {
    this.pos = createVector(x, y);

    this.l = l;

    this.angle = angle;
    this.angleV = 0;

    this.start = start;
    this.vel = vel;

    this.constraint = 0.03;

    let hue = random(col - range, col + range);
    let sat = random(100);
    let bright = random(60, 80);

    this.rgb = [hue, sat, bright];
  }

  move() {
    this.angleA = cos(this.start);

    this.angleV += this.angleA;
    this.angleV = constrain(this.angleV, -this.constraint, this.constraint);
    this.angle += this.angleV;

    this.start += 0.01;
  }

  draw() {
    push();
    strokeWeight(0.5);
    
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    rotate(this.angle);
    line(0, 0, this.l, 0);
    pop();
  }
}
