class Emitter {
  constructor(x, y) {
    this.pos = createVector(x, y);

    this.particles = [];
  }

  emit(n) {
    // Adds more particles to array
    for (let i = 0; i < n; i++) {
      let m = 3;

      let particle = new Confetti(this.pos.x, this.pos.y, m);
      this.particles.push(particle);
    }
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      
      if (this.particles[i].lifeOver()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}
