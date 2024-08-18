class myRotator extends Rotator {
    constructor(x, y, l, angle, start) {
        super(x, y, l, angle, start);
        this.inc = 0.001;
    }

    draw() {
    push();
    translate(this.pos.x, this.pos.y);
    stroke(this.rgb);
    strokeWeight(5);
    rotate(this.angle);
    line(this.pos.x, this.pos.y, this.pos.x + this.l, this.pos.y);
    pop();
    }
}