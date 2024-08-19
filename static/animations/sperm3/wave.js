class Wave {
  constructor(x, y, r, d, l, th, angleV) {
    this.pos = createVector(x, y);
    this.angle = 0;
    this.angleV = angleV;

    this.r = r;
    this.d = d;
    this.l = l;
    
    this.th = th;
  }

  move() {
    this.angle += this.angleV;
    this.angle = this.angle % ((this.l / this.d) + 5);
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);

    stroke(255);
    strokeWeight(this.th);

    let pos = createVector(this.angle, sin(this.angle));
    pos.mult(this.d);

    translate(pos.x, pos.y);

    noFill();
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let theta = map(a, 0, TWO_PI, 0, 30 * TWO_PI);

      let sin_v = 10 * sin(theta);

      let r1 = this.r + sin_v;

      let x = r1 * cos(a);
      let y = r1 * sin(a);

      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }
}
