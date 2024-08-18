class Peach extends Flower {
  constructor(x, y, v, r, pace, strt) {
    super(x, y, v, r, pace);
    this.start = strt;
  }

  shape(step) {
    beginShape();
    for (let i = 0; i < this.v * 2; i++) {
      let angle = i * step;
      let r = cos(50 * angle) + sin(angle);

      let pos = createVector(r * cos(angle), r * sin(angle));
           
      pos.mult(this.r);

      vertex(pos.x, pos.y);
    }
    endShape();
  }
}
