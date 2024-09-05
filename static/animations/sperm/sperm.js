export class Sperm {
	constructor(pos, m, l, angleV, sketch) {
		this.sketch = sketch;

		this.pos = pos;
		this.vel = sketch.createVector(0, 0);
		this.acc = sketch.createVector(0, 0);

		this.angle = 0;
		this.angleV = angleV;

		this.m = m;
		this.r = sketch.sqrt(m) * 5;
		this.l = l;

		this.wait = true;
	}

	applyForce(force) {
		// Scale by weight
		let f = p5.Vector.div(force, this.m);
		this.acc.add(f);
	}

	move() {
		// Move forward
		this.vel.add(this.acc);
		this.vel.limit(0.98);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
		
		// Have a little erratic movement to mimic a sperm
		this.pos.x += this.angleV;
		this.angle += this.angleV;
		this.pos.y += 0.2 * this.sketch.sin(this.angle);
	}

	settle(egg) {
		let dist = p5.Vector.sub(egg.pos, this.pos);
		// If distance between centre of egg and sperm is miniscule, then stop moving.
		if (dist.mag() < 5) {
			this.stopMoving();

			setTimeout(() => {
				this.sketch.gameEnded = true;
				return;
			}, 2000);
		}

		// Move toward centre of egg
		this.vel = dist.copy().mult(0.01).limit(1);
		this.pos.add(this.vel);

		this.pos.x += this.angleV * 0.1;
		this.angle += this.angleV * 0.1;
		this.pos.y += 0.2 * this.sketch.sin(this.angle);
	}

	// Check if sperm contains spiral
	contain(spiral) {
		// If distance between the two is smaller than magnitude & length
		let dist = p5.Vector.sub(spiral.pos, this.pos);
		if (dist.mag() <= this.r + this.l) {
			return true;
		}
		return false;
	}

	eat(spiral) {
		// Give sperm a little push
		let push = this.sketch.createVector(10000, 0);
		this.applyForce(push);

		// Remove spiral from array
		let index = this.sketch.spirals.indexOf(spiral);
		this.sketch.spirals.splice(index, 1);
	}

	// Stop the sperm's movement !
	stopMoving() {
		this.acc.set(0, 0);
		this.vel.set(0, 0);
	}

	// Wrap around the screen
	wrap() {
		if (this.pos.x <= -this.r) {
			this.pos.x = this.sketch.width + this.r;
		} else if (this.pos.x >= this.sketch.width + this.r) {
			this.pos.x = -this.r;
		}

		if (this.pos.y <= -this.r) {
			this.pos.y = this.sketch.height + this.r;
		} else if (this.pos.y >= this.sketch.height + this.r) {
			this.pos.y = -this.r;
		}
	}

	draw() {
		this.sketch.push();
			this.sketch.translate(this.pos.x, this.pos.y);

			// Draw white and thin outline
			this.sketch.stroke(360);
			this.sketch.strokeWeight(0.05);
			this.sketch.noFill();

			// Make the shape of the sperm as a circle
			this.sketch.beginShape();
			// Go round the length of a circle

			for (let a = 0; a < this.sketch.TWO_PI; a += 0.01) {
				// make the dangly bits around the circle - super long & thin !
				let sinV = this.l * this.sketch.sin(30*a);
				let pos = this.sketch.createVector(this.sketch.cos(a), this.sketch.sin(a)).mult(this.r + sinV);
				this.sketch.vertex(pos.x, pos.y);
			}
			this.sketch.endShape(this.sketch.CLOSE);
		this.sketch.pop();
	}
}
