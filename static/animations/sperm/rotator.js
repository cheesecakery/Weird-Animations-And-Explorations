export class Rotator {
	constructor(pos, l, angle, hue, range, sketch) {
		this.sketch = sketch;

		this.pos = pos;

		this.l = l;
		this.angle = angle;
		this.angleV = 0;

		this.start = 0;

		this.constraint = 0.03;

		this.colour = [
			sketch.random(hue - range, hue + range),
			sketch.random(100),
			sketch.random(60, 80)
		];
	}

	move() {
		// Acceleration goes from -1 to 1.
		this.angleA = this.sketch.cos(this.start);
		this.angleV += this.angleA;
		// Can only move so quickly
		this.angleV = this.sketch.constrain(this.angleV, -this.constraint, this.constraint);
		// Angle the rotator churns at
		this.angle += this.angleV;

		this.start += 0.01;
	}

	draw() {
		this.sketch.push();
			this.sketch.strokeWeight(0.5);
			this.sketch.translate(this.pos.x, this.pos.y);
			this.sketch.stroke(this.colour);
			this.sketch.rotate(this.angle);
			this.sketch.line(0, 0, this.l, 0);
		this.sketch.pop();
	}
}
