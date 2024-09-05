export class Particle {
  constructor(parent, pos, m) {
      this.sketch = parent.sketch;

      this.pos = pos;
      this.vel = p5.Vector.random2D();
      this.acc = parent.sketch.createVector(0, 0);
      
      this.m = m;
      this.r = this.sketch.sqrt(m) * 3;
      
      this.rgb = [
          parent.rgb[0] + this.sketch.random(-50, 50),
          parent.rgb[1] + this.sketch.random(-50, 50),
          parent.rgb[2] + this.sketch.random(-50, 50)
      ];
  }

  calculateRadius() {
      this.r = this.sketch.sqrt(this.m) * 3;
  }

  applyForce(force) {
      // Scale according to weight
      let f = p5.Vector.div(force, this.m);
  
      // Add to acceleration
      this.acc.add(f);
  }

  // Move the particle
  move() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.set(0, 0);
  }
  
  // Draw the particle
  draw() {
      this.sketch.stroke(this.rgb);
      this.sketch.fill(this.rgb);
      this.sketch.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}