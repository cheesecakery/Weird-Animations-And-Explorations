class Rotator {
  constructor(x, y, l, angle, start) {
    this.pos = createVector(x, y);
  
    this.l = l;
    
    this.angle = angle;
    this.angleV = 0;
    
    this.start = start;
    this.inc = 0.01;
    
    this.rgb = randColour(0, 255);
  }
  
  move() {
    this.angleA = pow(sin(1/2 * this.start), 3);

    this.angleV += this.angleA;
    this.angleV = constrain(this.angleV, -0.025, 0.025);
    this.angle += this.angleV;
    
    this.start += this.inc;
  }
  
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    rotate(this.angle);
    line(0, 0, this.l, 0);
    // line(0, this.pos.y, this.pos.x + this.l, this.pos.y);
    pop();
  }
}