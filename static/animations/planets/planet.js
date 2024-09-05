export class Planet {
    constructor(x, y, m, img, v1, v2, sketch) {
		this.sketch = sketch;

		this.pos = sketch.createVector(x, y);
		this.vel = p5.Vector.random2D().setMag(sketch.random(v1, v2));
		this.acc = sketch.createVector(0, 0);
	
		this.m = m;
		this.r = sketch.sqrt(m) * sketch.SIZE;
	
		this.img = img;
	
		this.a = 0;
		this.aV = 0.005;
    }
  
    applyForce(force) {
		// Scale according to weight
		let f = p5.Vector.div(force, this.m);
	
		// Add to acceleration
		this.acc.add(f);
    }
  
    move() {
		// Move the planet
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.set(0, 0);
	
		this.a += this.aV;
    }
  
    // Without shaders
    display() {
		this.sketch.translate(this.pos.x, this.pos.y);
		this.sketch.rotate(this.a);
		this.sketch.image(this.img, 0, 0, this.r * 2, this.r * 2);
    }
  
    // With shaders
    display2() {
		let angle = this.sketch.atan2(this.pos.x, this.pos.y);

		this.sketch.push();
			this.sketch.blendMode(this.sketch.BLEND);
			this.sketch.translate(this.pos.x, this.pos.y);
			this.sketch.rotate(-angle + this.sketch.PI/3);
			this.sketch.image(this.sketch.shading, 0, 0, this.r*2, this.r*2);
		this.sketch.pop();

		this.sketch.push();
			this.sketch.translate(this.pos.x, this.pos.y);
			this.sketch.blendMode(this.sketch.BURN);
			this.sketch.image(this.img, 0, 0, this.r * 2, this.r * 2);
			this.sketch.blendMode(this.sketch.BLEND);
			this.sketch.tint(255, 75);
			this.sketch.image(this.img, 0, 0, this.r * 2, this.r * 2);
		this.sketch.pop();
    }
  }
  