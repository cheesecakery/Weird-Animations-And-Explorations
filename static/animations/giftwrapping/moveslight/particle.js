class Particle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
    
    this.start = random(100);
    this.inc = 0.01;
  }
  
  move() {
    this.pos.x += sin(this.start * 3) * 2; 
    this.pos.y += cos(this.start * 3) * 2;
    
    
    // this.pos.x += map(sin(this.start), 0, 1, -0.1, 0.1);
    // this.pos.y += map(cos(this.start), 0, 1, -0.1, 0.1);
    
    this.start += this.inc;
  }
  
  update() {
    strokeWeight(2);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}