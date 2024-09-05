export class Planet {
	constructor(x, r, img, sketch) {
		this.sketch = sketch;
		this.pos = sketch.createVector(x, sketch.height / 2);
		
		this.r = r;
		this.img = img;
	}

	move() {
		// For each planet, evaluate position based on each wave movement
		// Start position midway through the screen
		let y = this.sketch.height / 2;
		// Adds up all the wave positions (Makes a sort of erratic wave behaviour)
		for (let wave of this.sketch.waves) {
			y += wave.evaluate(this.pos.x);
		}
		this.pos.y = y;
	} 

	draw() {
		let s = this.sketch;
		s.push();
			// Draw from the middle of the screen
			s.imageMode(s.CENTER);
			s.translate(this.pos.x, this.pos.y);

			// Find distance of mouse from planet
			let d = s.createVector(this.pos.x - s.mouseX, this.pos.y - s.mouseY);
			// Convert this into a shadow
			let brightness = s.map(d.magSq(), 0, s.maxD, 100, 10);
			// Find the direction of the sun from the planet
			let angle = s.atan2(d.x, d.y);

			// Rotate the mask according to the angle
			s.push();
				s.rotate(-angle + s.PI / 3);
				s.image(s.shading, 0, 0, this.r*2, this.r*2);
			s.pop();

			// Draw the planet
			s.push();
				// Burn mode to add the depth
				s.blendMode(s.BURN);
				s.image(this.img, 0, 0, this.r*2, this.r*2);
				// Blend mode to create the shading effect
				s.blendMode(s.BLEND);
				s.tint(255, brightness);
				s.image(this.img, 0, 0, this.r*2, this.r*2);
			s.pop();
		s.pop();
	}
}