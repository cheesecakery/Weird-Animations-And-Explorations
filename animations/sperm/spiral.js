class Spiral {
  constructor(x, y, r, l, n, v) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    
    this.r = r;
    this.l = l;
    
    this.v = v;
    
    this.n = n;
    this.rotators = [];
    
    this.range = 50;
    this.col = random(this.range, 360 - this.range);

    this.createRotators();
  }

  createRotators() {
    for (let i = 0; i < this.n; i++) {
      let st_angle = 0.1 * (i + 1);

      // Set inner radius of circle
      let r = this.r;

      // spawn in a circle
      let pos = createVector(0, r);
      push();
      translate(width / 2, height / 2);
      pos.rotate(st_angle);
      pop();

      // length of each line
      let angle = pos.heading();

      let strt = 0;

      let rotator = new Rotator(pos.x, pos.y, this.l, angle, strt, this.vel, this.col, this.range);
      this.rotators.push(rotator);
    }
  }
  
  move() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0, 0);
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