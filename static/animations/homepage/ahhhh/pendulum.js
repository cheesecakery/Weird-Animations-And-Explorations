class Pendulum {
  constructor(m1, m2, r1, r2, a1, a2) {

    this.m1 = m1;
    this.m2 = m2;

    this.r1 = r1;
    this.r2 = r2;

    this.a1 = a1;
    this.a2 = a2;
    this.a1V = 0;
    this.a2V = 0;
    this.a1A = 0;
    this.a2A = 0;
    
    this.px1 = -1;
    this.py1 = -1;
    
    this.px2 = -1;
    this.py2 = -1;
    
    this.hue = 0;
  }

  // calculate acc of both points
  evaluate() {
    // calculate a1 & a2
    let num1 = -G * (2 * this.m1 + this.m2) * sin(this.a1);
    let num2 = -this.m2 * G * sin(this.a1 - 2 * this.a2);
    let num3 = -2 * sin(this.a1 - this.a2) * this.m2;
    let num4 =
      this.a2V * this.a2V * this.r2 +
      this.a1V * this.a1V * this.r1 * cos(this.a1 - this.a2);

    let den =
      this.r1 *
      (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));

    this.a1A = (num1 + num2 + num3 * num4) / den;

    num1 = 2 * sin(this.a1 - this.a2);
    num2 = this.a1V * this.a1V * this.r1 * (this.m1 + this.m2);
    num3 = G * (this.m1 + this.m2) * cos(this.a1);
    num4 = this.a2V * this.a2V * this.r2 * this.m2 * cos(this.a1 - this.a2);

    den =
      this.r2 *
      (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));

    this.a2A = (num1 * (num2 + num3 + num4)) / den;
  }

  move() {
    // calculate vel, calculate angle
    this.a1V += this.a1A;
    this.a1 += this.a1V;

    this.a2V += this.a2A;
    this.a2 += this.a2V;
  }

  draw() {
    // this.hue += 1;
    // this.hue = this.hue % 360
    let hue = random(178, 237)
    let sat = 90;
    let bright = 80;

    let rgb = [hue, sat, bright];
    
    stroke(rgb);
    fill(rgb);
    
    // draw pendulums
    let x1 = this.r1 * sin(this.a1);
    let y1 = this.r1 * cos(this.a1);

    let x2 = x1 + this.r2 * sin(this.a2);
    let y2 = y1 + this.r2 * cos(this.a2);

    strokeWeight(0.3);
    line(0, 0, x1, y1);
    // ellipse(x1, y1, this.m1 * 0.2);

    line(x1, y1, x2, y2);
    ellipse(x2, y2, this.m2 * 0.2);
    
    this.px1 = x1;
    this.py1 = y1;
    
    this.px2 = x2;
    this.py2 = y2;
  }
}
