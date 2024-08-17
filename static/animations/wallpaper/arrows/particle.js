class Particle {
  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;
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
