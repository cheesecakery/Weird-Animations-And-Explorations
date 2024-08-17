class Rotator {
  constructor(x, y, l, angle, start) {
    this.pos = createVector(x, y);
  
    this.l = l;
    
    this.angle = angle;
    this.angleV = 0;
    
    this.start = start;
    this.inc = 0.0001;
    
    this.rgb = randColour(0, 255);
  }
  
  move() {
    this.angleA = sin(this.start);

    this.angleV += this.angleA;
    this.angleV = constrain(this.angleV, -0.04, 0.04);
    this.angle += this.angleV;
    
    this.start += this.inc;
  }
  
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    rotate(this.angle);
    line(this.pos.x, this.pos.y, this.pos.x + this.l, 0);
    // line(0, this.pos.y, this.pos.x + this.l, this.pos.y);
    pop();
  }
}