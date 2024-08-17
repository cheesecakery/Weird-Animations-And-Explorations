class Flower {
  constructor(x, y, v, r, pace, strt) {
    this.pos = createVector(x, y);
    this.v = v;
    this.r = r;

    this.start = strt;
    this.inc = 0.01;
    
    this.pace = pace;
    
    this.rgb = randColour(0, 255);
  }

  draw() {
    stroke(this.rgb);
    strokeWeight(2);
    
    push();
    translate(this.pos.x, this.pos.y);
    
    let step = (2 * PI) / this.v;

    // fill(37, 42, 48);
    noFill();

    rotate(this.pace * cos(this.start));
    beginShape();
    for (let i = 0; i < this.v * 2; i++) {
      let angle = i * step;
      let r = cos(50 * angle) + sin(angle);

      let pos = createVector(r * cos(angle), r * sin(angle));
           
      pos.mult(this.r);

      vertex(pos.x, pos.y);
    }
    endShape();

    this.start += this.inc;
    pop();
  }
}
