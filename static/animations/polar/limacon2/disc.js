class Disc {
  constructor(x, y, r, l, n) {
    this.pos = createVector(x, y);
    
    this.r = r;
    this.l = l;

    this.no_of_rotators = n;
    this.rotators = [];

    this.createRotators();
  }

  createRotators() {
    for (let i = 0; i < this.no_of_rotators; i++) {
      // spawn in a circle
      let pos = p5.Vector.random2D();
      pos.mult(this.r);

      let angle = pos.heading();
      
      let strt = 0;

      let rotator = new Rotator(pos.x, pos.y, this.l, angle, strt);
      this.rotators.push(rotator);
    }
  }

  move() {
    for (let rotator of this.rotators) {
      rotator.move();
    }
  }

  draw() {
    translate(this.pos.x, this.pos.y);
    for (let rotator of this.rotators) {
      rotator.draw();
    }
  }
}
