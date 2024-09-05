import { Rotator } from './rotator.js'

export class Spiral {
	constructor(x, y, r, l, n, v, sketch) {
		this.sketch = sketch;

		this.pos = sketch.createVector(x, y);
		
		this.r = r;
		this.l = l;
		this.v = v;
		
		this.n = n;
		this.rotators = [];
		
		this.hueRange = 50;
		this.hue = sketch.random(this.hueRange, 360 - this.hueRange);

		this.createRotators();
	}

	createRotators() {
		for (let i = 0; i < this.n; i++) {
			// Spawn in a circle
			let pos = this.sketch.createVector(0, this.r);
			this.sketch.push();
				this.sketch.translate(this.sketch.width / 2, this.sketch.height / 2);
				pos.rotate(0.1 * (i + 1));
			this.sketch.pop();

			// Add to rotators
			this.rotators.push( new Rotator(
				pos,
				this.l,
				pos.heading(),
				this.hue,
				this.hueRange,
				this.sketch
			));
		}
	}
	
	draw() {
		this.sketch.push();
			this.sketch.translate(this.pos.x, this.pos.y);
			for (let rotator of this.rotators) {
				rotator.move();
				rotator.draw();
			}
		this.sketch.pop();
	}
}