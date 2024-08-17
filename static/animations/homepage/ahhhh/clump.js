class Clump {
  constructor(particle, n, angle) {
    this.particle = particle;

    this.no_of_pendulums = n;
    this.pendulums = [];
    
    this.angle = angle;

    this.createPendulums();
  }

  createPendulums() {
    let step = (PI / 2) / this.no_of_pendulums;
    for (let i = 0; i < this.no_of_pendulums; i++) {
      let m1 = 10;
      let m2 = 10;

      let r1 = 150;
      let r2 = 150;

      let a1 = i * step;
      let a2 = -a1;

      let pendulum = new Pendulum(m1, m2, r1, r2, a1, a2);
      this.pendulums.push(pendulum);
    }
  }

  draw() {
    push();
    translate(this.particle.pos.x, this.particle.pos.y);
    rotate(this.angle);
    for (let pendulum of this.pendulums) {
      pendulum.evaluate();
      pendulum.move();
      pendulum.draw();
    }
    pop();
  }
}
