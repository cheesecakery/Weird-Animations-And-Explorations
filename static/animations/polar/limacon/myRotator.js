class myRotator extends Rotator {
  constructor(x, y, l, angle, start) {
    super(x, y, l, angle, start)
    this.inc = 0.001;
  }
  
  move() {
    this.angleA = sin(this.start);

    this.angleV += this.angleA;
    this.angleV = constrain(this.angleV, -this.constraint, this.constraint);
    this.angle += this.angleV;
    
    this.start += this.inc;
  }
}