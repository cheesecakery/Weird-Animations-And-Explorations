class Rotator {
  constructor(x, y, l, angle, start) {
    this.pos = createVector(x, y);
  
    this.l = l;
    
    this.angle = angle;
    this.angleV = 0;
    
    this.start = start;
    this.inc = 0.0001;
    
    this.constraint = 0.03;
    
    this.rgb = randColour(0, 255);
  }
  
  move() {
    this.angleA = tan(this.start);

    this.angleV += this.angleA;
    this.angleV = constrain(this.angleV, -this.constraint, this.constraint);
    this.angle += this.angleV;
    
    this.start += this.inc;
  }
  
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    rotate(this.angle);
    // line(0, 0, this.l, 0);
    line(10, 10, 10 + this.l, 10);
    pop();
  }
}