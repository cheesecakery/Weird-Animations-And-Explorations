export class Attractor {
	constructor(x, y, m, G, sketch) {
		this.sketch = sketch;

		this.pos = sketch.createVector(x, y);
		this.m = m;
		this.r = sketch.sqrt(m) * 3;
		this.G = G;
	}
	
	attract(particle) {
		let force = p5.Vector.sub(this.pos, particle.pos);
		let distSq = this.sketch.constrain(force.magSq(), 10, 1000);
		let strength = (this.G * (this.m * particle.m)) / distSq;
		force.setMag(strength);
		particle.applyForce(force);
	}
	
	update() {
		this.sketch.ellipse(this.pos.x, this.pos.y, this.r * 2);
	}
}