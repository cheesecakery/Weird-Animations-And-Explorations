import { Particle } from '../particle.js'

export class Circular extends Particle {
    constructor(x, y, m, size, sketch) {
        super(x, y, m, size, sketch);
    }

    move() {
        super.move();
        this.vel.mult(0.999);
    }

    friction() {
        // Check if they are on floor
        let dif = this.sketch.height - (this.pos.y + this.r);
        if (dif < 1) {

          // Apply friction !!
    
          // Formula: -1 * mu * N * vel
          let mu = 0.4;
    
          let normal = this.m;
    
          let friction = this.vel.copy();
          friction.normalize();
          friction.mult(-1);
    
          friction.setMag(normal * mu);
          this.applyForce(friction);
        }
    }
}