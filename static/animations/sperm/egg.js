export class Egg {
	constructor(x, y, m, sketch) {
		this.sketch = sketch;

		this.pos = sketch.createVector(x, y);
		this.m = m;
		this.r = sketch.sqrt(m) * 10;

		this.angle = 0;
		this.inc = 1;

		this.border = 0.2;
	}

	// Find if egg contains sperm
	contain(sperm) {
		// Check that distance between the two is smaller than radius of the egg
		let dist = p5.Vector.sub(this.pos, sperm.pos);
		if (dist.mag() - sperm.r <= this.r) {
			return true;
		}
		return false;
	}

	crack() {
		// Draw border super thin
		this.border = 0.1;
		// Reset increment
		this.inc = 1;

		// Let last moving sperm travels to centre of the egg.
		setTimeout(() => {
			sperm.inEgg = true;
		}, 2500);
	}

	draw() {
		// Set attributes
		this.sketch.stroke(360, 0.5);
		this.sketch.strokeWeight(this.border);
		this.sketch.noFill();

		// Determines how many points the circle has (how 'broken' the shape is)
		let inc = this.sketch.random(0.01, this.inc);

		this.sketch.push();
			this.sketch.translate(this.pos.x, this.pos.y);
			// Rotate the circle by a random angle (makes it look more visceral)
			this.sketch.rotate(this.sketch.map(this.sketch.noise(this.angle), 0, 1, -5, 5));
			this.sketch.beginShape();
			// Make a circular shape 
			for (let a = 0; a < this.sketch.TWO_PI; a += inc) {
				let r1 = this.r;
				let x = r1 * this.sketch.cos(a);
				let y = r1 * this.sketch.sin(a);

				this.sketch.vertex(x, y);
			}
			this.sketch.endShape(this.sketch.CLOSE);
		this.sketch.pop();

		// Keeps rotation going
		this.angle += 0.01;
	}
}
