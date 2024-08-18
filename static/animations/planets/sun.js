class Sun {
  constructor(x, y, m) {
    this.pos = createVector(x, y);

    this.m = m;
    this.r = sqrt(m) * SIZE;

    this.a = 0;
  }

  touches(planet) {
    // If touching the sun, switch which way it is moving ...
    if (planet.pos.mag() <= this.r + planet.r - 10) {
      if (planet.touchingSun == false) {
        planet.touchingSun = true;
      }
    } else {
      if (planet.touchingSun) {
        planet.prevAbove = !planet.prevAbove;
      }

      planet.touchingSun = false;
    }
  }

  // Exerts force to attract bubble
  attract(planet) {
    // Find distance between the two
    let force = p5.Vector.sub(this.pos, planet.pos);

    let min = 200;
    let max = 2000;

    let distanceSq = constrain(force.magSq(), min, max);

    let constant = (G * (this.m * planet.m)) / distanceSq;

    force.setMag(constant);

    planet.applyForce(force);
  }

  draw() {
    this.a += 0.001;
    
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.a);
    image(sun_img, 0, 0, this.r * 2, this.r * 2);
    pop();
  }
}
