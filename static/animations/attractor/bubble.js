class Bubble {
  constructor(x, y, m, rgb) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    
    this.m = m;
    this.r = sqrt(m) * SIZE;
    
    this.rgb = [
      rgb[0] + random(-50, 50),
      rgb[1] + random(-50, 50),
      rgb[2] + random(-50, 50)
    ];
  }
  
  calculateRadius() {
    this.r = sqrt(this.m) * SIZE;
  }
  
  applyForce(force) {
    // Scale according to weight
    let f = p5.Vector.div(force, this.m);

    // Add to acceleration
    this.acc.add(f);
  }
  
  // Makes sure bubbles are locked in
  containedBy(jelly) {
    // Check top and bottom
    if (this.pos.y - this.r <= jelly.y + 2) {
      this.pos.y = jelly.y + this.r + 2;
      this.vel.y *= -1;
    } else if (this.pos.y + this.r >= jelly.y + jelly.h - 2) {
      this.pos.y = jelly.y + jelly.h - this.r - 2;
      this.vel.y *= -1;
    }
    
    // Check sides
    if (this.pos.x - this.r <= jelly.x + 2) {
      this.pos.x = jelly.x + this.r + 2;
      this.vel.x *= -1;
    } else if (this.pos.x + this.r >= jelly.x + jelly.w + 2) {
      this.pos.s = jelly.x + jelly.w - this.r - 2;
      this.vel.x *= -1;
    }
  }
  
  move() {
    // Move the bubble
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0, 0);
  }

  
  draw() {
    stroke(this.rgb);
    fill(this.rgb);
    
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}