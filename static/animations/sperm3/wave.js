export class Wave {
	constructor(pos, r, d, l, angleV, sketch) {
		this.sketch = sketch;

		this.pos = pos;
		this.angle = 0;
		this.angleV = angleV;

		this.r = r;
		this.d = d;
		this.l = l;
	}

	move() {
		this.angle += this.angleV;
		this.angle = this.angle % ((this.l / this.d) + 5);
	}

	draw() {
		this.sketch.push();
			this.sketch.translate(this.pos.x, this.pos.y);
			// Set attributes
			this.sketch.stroke(255);
			this.sketch.strokeWeight(0.05);

			// Responsible for movement up & down
			let pos = this.sketch.createVector(this.angle, this.sketch.sin(this.angle));
			// ??
			pos.mult(this.d);

			this.sketch.translate(pos.x, pos.y);

			this.sketch.noFill();
			this.sketch.beginShape();
			for (let a = 0; a < this.sketch.TWO_PI; a += 0.01) {
				let sinV = 10 * this.sketch.sin(30*a);

				// Shake it about
				let r = this.r + sinV;

				this.sketch.vertex(
					r*this.sketch.cos(a),
					r*this.sketch.sin(a)
				);
			}
			this.sketch.endShape(this.sketch.CLOSE);
		this.sketch.pop();
	}
}
