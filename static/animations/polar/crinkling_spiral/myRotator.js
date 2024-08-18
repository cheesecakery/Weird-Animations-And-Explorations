class myRotator extends Rotator {
  draw() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    rotate(this.angle);
    line(10, 10, 10 + this.l, 10);
    pop();
  }
}