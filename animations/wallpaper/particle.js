class Particle {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.m = m;
    this.r = floor(sqrt(m) * 3);
  }

  edges() {
    // Checks if touching bottom
    if (this.pos.y >= height) {
      this.pos.y = height;
    } else if (this.pos.y <= 0) {
      this.pos.y = 0;
    }

    if (this.pos.x >= width) {
      // Checks if touching sides
      this.pos.x = width;
    } else if (this.pos.x <= 0) {
      this.pos.x = 0;
    }
  }
}
