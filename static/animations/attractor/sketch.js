import { Attractor } from './attractor.js'
import { Jelly } from './jelly.js'
import { createText } from './helper.js'

const attractor = new p5((sketch) => {
    const NO_OF_ATTRACTORS = 3;
    sketch.attractors = [];
    sketch.G = 10;

    let movingAttractor;
    sketch.submergedAdultAttractors = [];
    sketch.submergedChildrenAttractors = [];

    sketch.matingInProgress = false;

    sketch.divs = [];

    sketch.setup = () => {
        // Creates canvas size of the div
        sketch.createCanvas(
            document.getElementById("attractor").offsetWidth, 
            document.getElementById("attractor").offsetHeight - 100
        );
        // Make background a grey-ish colour
        sketch.background(220);

        // Scale animation based on div size
        // TODO!! - figure out scaling ???
        let scale = sketch.min(sketch.width, sketch.height);
        let d = scale * 0.4;

        // create the sketch.jelly!
        sketch.jelly = new Jelly(
            sketch.random(0, sketch.width - d), 
            sketch.random(sketch.height/2, sketch.height - d),
            d,
            d,
            5,
            sketch
        );

        createAttractors(scale, d);
    }

    sketch.draw = () => {
        // resets background
        sketch.background(220);

        moveAttractor();
        interactWithJelly();

        // Move & draw attractors and sketch.jelly
        for (let attractor of sketch.attractors) {
            attractor.edges();
            attractor.move();
            attractor.draw();
        }

        sketch.jelly.draw();
    }

    function interactWithJelly() {
        // Check each attractors current position in relation to the sketch.jelly.
        for (let attractor of sketch.attractors) {
            // Check whether attractors are submerged
            let somewhatSubmergedParticles = attractor.somewhatSubmergedParticles();
            let whollySubmergedParticles = attractor.whollySubmergedParticles();

            // Checks whether to submerge/unsubmerge attractors
            if (whollySubmergedParticles == attractor.particles.length && (!sketch.submergedAdultAttractors.includes(attractor) && !sketch.submergedChildrenAttractors.includes(attractor))) {
                sketch.jelly.submergeAttractor(attractor);
            } else if (somewhatSubmergedParticles < attractor.particles.length && (sketch.submergedAdultAttractors.includes(attractor) || sketch.submergedChildrenAttractors.includes(attractor))) {
                sketch.jelly.unsubmergeAttractor(attractor);
            }

            // If mating, keep those mating within the sketch.jelly, and others outside
            if (sketch.matingInProgress) {
                if (attractor.mating || attractor.justBorn) {
                    sketch.jelly.enclose(attractor);
                } else {
                    sketch.jelly.keepOut(attractor);
                }
            }
        }
    }

    sketch.mouseClicked = () => {
        // Checks whether attractor is selected
        for (let attractor of sketch.attractors) {
            if (attractor != movingAttractor) {
                if (attractor.contains(sketch.mouseX, sketch.mouseY)) {
                  movingAttractor = attractor;

                  let col = sketch.color(attractor.rgb);
                  createText("attractor is on the go", col, 1.5, sketch);
                }
            }
        }
    }

    function createAttractors(scale, d) {
      let m = scale * 0.005;

        for (let i = 0; i < NO_OF_ATTRACTORS; i++) {
            // pass in coords, mass, no of particles, and sketch itself
            sketch.attractors.push(new Attractor(
                sketch.random(d, sketch.width - d), 
                sketch.random(sketch.height / 6, sketch.height / 2),
                m,
                sketch.floor(sketch.random(50, 100)),
                sketch
            ));
        }
    }

    function moveAttractor() {
        // Make sure there is actually an attractor on the go
        if (!(movingAttractor === undefined)) {
          let dif = 1.5;
          let bubDif = 1;

          // move slower in the jelly
          if (sketch.jelly.containsPos(movingAttractor.pos)) {
            dif = 1;
          }
        
          if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
              movingAttractor.pos.x -= dif;
              for (let particle of movingAttractor.particles) {
              particle.pos.x -= dif + sketch.random(-bubDif, bubDif);
              }
          }
          if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
              movingAttractor.pos.x += dif;
              for (let particle of movingAttractor.particles) {
              particle.pos.x += dif + sketch.random(-bubDif, bubDif);
              }
          }
          if (sketch.keyIsDown(sketch.UP_ARROW)) {
              movingAttractor.pos.y -= dif;
              for (let particle of movingAttractor.particles) {
              particle.pos.y -= dif + sketch.random(-bubDif, bubDif);
              }
          }
          if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
              movingAttractor.pos.y += dif;
              for (let particle of movingAttractor.particles) {
              particle.pos.y += dif + sketch.random(-bubDif, bubDif);
              }
          }
        }
    }
}, 'attractor');