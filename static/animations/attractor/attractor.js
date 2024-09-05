import { Particle } from './particle.js'
import { randomColour, createText } from './helper.js'

export class Attractor {
    constructor(x, y, m, n, sketch) {
        this.sketch = sketch;

        this.pos = sketch.createVector(x, y);
        this.m = m;
        this.r = sketch.sqrt(m) * 3;
        this.rgb = randomColour(sketch);

        this.max_particles = n;
        this.particles = [];

        this.start = sketch.frameCount;
        this.adult = true;
        this.mating = false;
        this.justBorn = false;

        this.createParticles();
    }

    createParticles() {
        let span = (2 * this.sketch.PI) / this.max_particles;

        for (let i = 0; i < this.max_particles; i++) {
            let radius = 0.05 * this.sketch.min(this.sketch.width, this.sketch.height);
            // particles are positioned in a radius around the attractor
            let pos = this.sketch.createVector(0, radius)
            pos.rotate(span * i);
            pos.add(this.pos);

            // Create a new particle.
            this.particles.push( new Particle(
                this,
                pos,
                this.m * 5,
            ));
        }
    }

    // Contains attractor in sketch.
    edges() {
        // Checks if touching bottom / top
        if (this.pos.y >= this.sketch.height - this.r) {
            this.pos.y = height - this.r;
        } else if (this.pos.y <= this.r) {
            this.pos.y = this.r;
        }

        // Checks if touching sides
        if (this.pos.x >= this.sketch.width - this.r) {
            this.pos.x = width - this.r;
        } else if (this.pos.x <= this.r) {
            this.pos.x = this.r;
        }
    }

    // Checks whether attractor contains this coordinate
    contains(x, y) {
        let dist = p5.Vector.sub(this.pos, this.sketch.createVector(x, y));
        if (dist.mag() <= this.r) {
            return true;
        }

        return false;
    }

    // Count number of submerged particles + apply drag.
    somewhatSubmergedParticles() {
        let submergedParticles = 0;

        for (let particle of this.particles) {
            if (this.sketch.jelly.contains(particle)) {
                submergedParticles++;

                // Applies drag to each particle
                let drag = this.sketch.jelly.calculateDrag(particle.vel);
                particle.applyForce(drag);
            }
        }

        return submergedParticles;
    }

    // Count number of wholly submerged particles.
    whollySubmergedParticles() {
        let submergedParticles = 0;

        for (let particle of this.particles) {
            if (this.sketch.jelly.whollyContains(particle)) {
                submergedParticles++;
            }
        }
        return submergedParticles;
    }

    // Exerts force to attract particle
    attract(particle) {
        // Find distance between the two - this is the direction of the force.
        let force = p5.Vector.sub(this.pos, particle.pos);
        let distanceSq = this.sketch.constrain(force.magSq(), 200, 2000);

        // The magnitude of the attraction is gravitational attraction * mass of attractor * mass of particle,
        // divided by the distance squared.
        let constant = (this.sketch.G * (this.m * particle.m)) / distanceSq;
        force.setMag(constant);

        particle.applyForce(force);
    }

    die() {
        this.dying = true;

        // Decrement bubbles every 0.05 seconds.
        for (let i = 0; i < this.no_of_particles; i++) {
            setTimeout(() => {
                this.particles.pop();
            }, 50 * i);
        }
    }

    grow() {
        // within the jelly, age cannot change .
        if (!this.sketch.jelly.containsPos(this.pos)) {
            this.addParticles(1);

            if (this.particles.length == this.max_particles) {
                this.becomeAdult();
            }
        }
    }

    // Adds bubbles if attractor is a child
    addParticles(step) {
        let dif = this.sketch.frameCount - this.start;

        // After every 'step' seconds, add another 1-3 bubbles
        if (dif % (step * 60) == 0) {
            // Adds 1 to 3 particles each time (makes sure doesn't go over max number of bubbles)
            let n = this.sketch.ceil(this.sketch.random(3));
            n = this.sketch.constrain(n, 0, this.max_particles - this.particles.length);

            // Creates particle and adds to array
            for (let i = 0; i < n; i++) {
                // Random position 7.5 units away from center
                let pos = p5.Vector.random2D();
                pos.setMag(7.5);
                pos.add(this.pos);

                this.particles.push(new Particle(
                    this,
                    pos,
                    this.m * 5
                ));
            }
        }
    }

    // Grows the mass, calculates radius accordingly - for when child becomes adult.
    enlargeParticles(step) {
        for (let particle of this.particles) {
            particle.m += step;
            particle.calculateRadius();
        }
    }

    // Become an adult - increase mass, radius, size of particles
    becomeAdult() {
        this.adult = true;
        this.m = 10;
        this.r = this.sketch.sqrt(this.m) * 3;
    
        this.enlargeParticles(25);
    
        let col = this.sketch.color(this.rgb);
        createText("AHH! your little babe has grown up", col, 3, sketch);
    }

    // Move particles
    move() {
        if (!this.adult) {
            this.grow();
        }

        for (let particle of this.particles) {
            this.attract(particle);
            particle.move();
        }
    }

    // Draw attractor & particles
    draw() {
        for (let particle of this.particles) {
            particle.draw();
        }

        this.sketch.stroke(0);
        this.sketch.fill(0);
        this.sketch.ellipse(this.pos.x, this.pos.y, this.r * 2);
    }
}
