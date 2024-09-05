export class Spot {
	constructor(x, y, sketch) {
		this.sketch = sketch;
		this.pos = sketch.createVector(x, y);

		this.pendulum;
		this.head;
	}

	moveLeft() {
		// Create a wave based on current time (moves 2 to the right, and between 1 and -1 up and down)
		let dif = this.sketch.createVector(2, this.sketch.sin(this.sketch.frameCount / 10));

		this.pos.add(dif);

		// Move the head as well
		if (this.head) {
			this.head.add(dif);
		} else if (this.pendulum) {
			this.pendulum.pos = this.pos;
		}
	}

	moveRight() {
		// Create a wave based on current time (moves 2 to the right, and between 1 and -1 up and down)
		let dif = this.sketch.createVector(-2, -this.sketch.sin(this.sketch.frameCount / 10));
		this.pos.add(dif);

		// Move the head as well
		if (this.head) {
			this.head.add(dif);
		} else if (this.pendulum) {
			this.pendulum.pos = this.pos;
		}
	}
}