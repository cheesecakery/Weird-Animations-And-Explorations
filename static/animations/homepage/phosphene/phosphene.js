class Phosphene {
  constructor(x, y, l, r, n) {
    this.pos = createVector(x, y);
    
    this.l = l;
    this.r = r;
    
    this.no_of_rotators = n;
    this.rotators = [];
    
    this.createRotators();
  }

  createRotators() {
    for (let i = 0; i < this.no_of_rotators; i++) {
      let st_angle = i;

      // Set inner radius of circle
      let r = sin(this.r * st_angle);
      r *= 50;

      // spawn in a circle
      let pos = createVector(0, r);
      push();
      translate(this.pos.x, this.pos.y);
      pos.rotate(st_angle);
      pop();

      // length of each line
      let l = this.l;
      let angle = pos.heading();

      let strt = 0;

      let rotator = new Rotator(pos.x, pos.y, l, angle, strt);
      this.rotators.push(rotator);
    }
  }

  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    for (let rotator of this.rotators) {
      rotator.move();
      rotator.draw();
    }
    pop();
  }
}
