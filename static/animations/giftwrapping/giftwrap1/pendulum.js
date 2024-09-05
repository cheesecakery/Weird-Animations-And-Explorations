export class Pendulum {
	constructor(pos, m1, m2, r1, r2, a1, a2, G, sketch) {
		this.sketch = sketch; 
		this.G = G;

		this.pos = pos;

		this.m1 = m1;
		this.m2 = m2;

		this.r1 = r1;
		this.r2 = r2;

		this.a1 = a1;
		this.a2 = a2;
		this.a1V = 0;
		this.a2V = 0;
		this.a1A = 0;
		this.a2A = 0;
	}

	// calculate acceleration of both points
	evaluate() {
		// calculate a1 & a2
		let num1 = -this.G * (2 * this.m1 + this.m2) * this.sketch.sin(this.a1);
		let num2 = -this.m2 * this.G * this.sketch.sin(this.a1 - 2 * this.a2);
		let num3 = -2 * this.sketch.sin(this.a1 - this.a2) * this.m2;
		let num4 =
		this.a2V * this.a2V * this.r2 +
		this.a1V * this.a1V * this.r1 * this.sketch.cos(this.a1 - this.a2);

		let den =
		this.r1 *
		(2 * this.m1 + this.m2 - this.m2 * this.sketch.cos(2 * this.a1 - 2 * this.a2));

		this.a1A = (num1 + num2 + num3 * num4) / den;

		num1 = 2 * this.sketch.sin(this.a1 - this.a2);
		num2 = this.a1V * this.a1V * this.r1 * (this.m1 + this.m2);
		num3 = this.G * (this.m1 + this.m2) * this.sketch.cos(this.a1);
		num4 = this.a2V * this.a2V * this.r2 * this.m2 * this.sketch.cos(this.a1 - this.a2);

		den =
		this.r2 *
		(2 * this.m1 + this.m2 - this.m2 * this.sketch.cos(2 * this.a1 - 2 * this.a2));

		this.a2A = (num1 * (num2 + num3 + num4)) / den;
	}

	move() {
		// calculate vel, calculate angle
		this.a1V += this.a1A;
		this.a1 += this.a1V;

		this.a2V += this.a2A;
		this.a2 += this.a2V;
	}

	draw() {
		this.sketch.push();
			this.sketch.strokeWeight(3);

			this.sketch.translate(this.pos.x, this.pos.y);

			// draw pendulums
			let x1 = this.r1 * this.sketch.sin(this.a1);
			let y1 = this.r1 * this.sketch.cos(this.a1);

			let x2 = x1 + this.r2 * this.sketch.sin(this.a2);
			let y2 = y1 + this.r2 * this.sketch.cos(this.a2);

			this.sketch.line(0, 0, x1, y1);
			this.sketch.line(x1, y1, x2, y2);

			this.sketch.ellipse(x1, y1, 5);

			this.sketch.push();
				this.sketch.translate(x2, y2);
				this.sketch.rotate(this.a2);
				this.sketch.line(0, 0, 10, 10);
				this.sketch.rotate(0.6);
				this.sketch.line(0, 0, 10, 10);
				this.sketch.rotate(0.6);
				this.sketch.line(0, 0, 10, 10);
			this.sketch.pop();
		this.sketch.pop();
	}
}
