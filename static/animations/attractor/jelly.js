import { createText, randomColour } from './helper.js'
import { checkToBeginMating } from './mating.js';

export class Jelly {
    constructor(x, y, w, h, density, sketch) {
        this.sketch = sketch;

        this.density = density;
        this.pos = sketch.createVector(x, y);
        this.w = w;
        this.h = h;

        this.duelMode = false;
    
        this.rgb = [78, 239, 100, 85];
        this.duelRgb = [243, 128, 27, 85];
    }

    containsPos(pos) {
        let dif = p5.Vector.sub(pos, this.pos);
        if (dif.x >= 0 && dif.x <= this.w && dif.y >= 0 && dif.y <= this.h) {
            return true;
        }
    
        return false;
    }
  
    // Checks if particle is somewhat contained in jelly
    contains(particle) {  
        let dif = p5.Vector.sub(particle.pos, this.pos);
        if (dif.x >= 0 && dif.x <= this.w && dif.y >= 0 && dif.y <= this.h) {
            return true;
        }
    
        return false;
    }
  
    // Checks if particle is wholly contained in jelly
    whollyContains(particle) {
        let dif = p5.Vector.sub(particle.pos, this.pos);
        if (dif.x - particle.r >= 0 && dif.x + particle.r <= this.w && dif.y - particle.r >= 0 && dif.y + particle.r <= this.h) {
            return true;
        }
    
        return false;
    }

    // Submerge attractor in the jelly
    submergeAttractor(attractor) {
        if (attractor.adult) {
            this.sketch.submergedAdultAttractors.push(attractor);
        } else {
            this.sketch.submergedChildrenAttractors.push(attractor);
        }

        if (!attractor.justBorn) {
          this.attractorsInJellyText();
        }

        setTimeout(checkToBeginMating, 3000, this.sketch);
    }

    // Unsubmerge the attractor
    unsubmergeAttractor(attractor) {
        if (this.sketch.submergedAdultAttractors.includes(attractor)) {
            let index = this.sketch.submergedAdultAttractors.indexOf(attractor);
            this.sketch.submergedAdultAttractors.splice(index, 1);

            setTimeout(checkToBeginMating, 3000, this.sketch);
        } else {
            let index = this.sketch.submergedChildrenAttractors.indexOf(attractor);
            this.sketch.submergedChildrenAttractors.splice(index, 1);
        }
    }

    // Creates text whenever number of attractors in jelly changes
    attractorsInJellyText() {
        let txt;
        if (this.sketch.submergedAdultAttractors.length > 0) {
            if (this.sketch.submergedAdultAttractors.length == 1) {
                txt = "1 attractor is submerged";
            } else {
                txt = this.sketch.submergedAdultAttractors.length + " attractors are submerged";
            }

            if (this.sketch.submergedChildrenAttractors.length == 1) {
                txt += " and 1 child";
            } else if (this.sketch.submergedChildrenAttractors.length > 1) {
                txt += " and" + this.sketch.submergedChildrenAttractors.length + " children !";
            }
        } else {
            if (this.sketch.submergedChildrenAttractors.length == 1) {
                txt = "1 child is submerged";
            } else if (this.sketch.submergedChildrenAttractors.length > 1) {
                txt = this.sketch.submergedChildrenAttractors.length + " children are submerged";
            }
        }

        if (txt != "") {
            createText(
                txt,
                randomColour(this.sketch),
                1.5,
                this.sketch
            );
        }
    }

    // Keep mating attractors enclosed within jelly during mating
    enclose(attractor) {
        let margin = 2;
        if (attractor.pos.y - attractor.r <= this.pos.y + margin) {
            attractor.pos.y = this.pos.y + attractor.r + margin;
        } else if (attractor.pos.y + attractor.r >= this.pos.y + this.h - margin) {
            attractor.pos.y = this.pos.y + this.h - attractor.r - margin;
        }
    
        // Check sides
        if (attractor.pos.x - attractor.r <= this.pos.x + margin) {
            attractor.pos.x = this.pos.x + attractor.r + margin;
        } else if (attractor.pos.x + attractor.r >= this.pos.x + this.w - margin) {
            attractor.pos.s = this.pos.x + this.w - attractor.r - margin;
        }
    }

    // Keep other attractors outside of jelly.
    keepOut(attractor) {
        // Makes sure attractor is actually inside jelly
        if (this.attractorInside(attractor)) {
            // Left
            if (attractor.pos.x < this.pos.x) {
              attractor.pos.x = this.pos.x - attractor.r;
            // Right
            } else if (attractor.pos.x > this.pos.x + this.w) {
              attractor.pos.x = this.pos.x + this.w + attractor.r;
            }
            // Top
            if (attractor.pos.y < this.pos.y) {
              attractor.pos.y = this.pos.y - attractor.r;
            // Bottom
            } else if (attractor.pos.y > this.pos.y + this.h) {
              attractor.pos.y = this.pos.y + this.h + attractor.r;
            }
        }
    }

    attractorInside(attractor) {
        // Finds the closest point on jelly to the bubble
        let closestX = this.sketch.constrain(attractor.pos.x, this.pos.x, this.pos.x + this.w);
        let closestY = this.sketch.constrain(attractor.pos.y, this.pos.y, this.pos.y + this.h);

        let distanceX = closestX - attractor.pos.x;
        let distanceY = closestY - attractor.pos.y;
        let distance = this.sketch.createVector(distanceX, distanceY);
        
        if (distance.mag() < attractor.r) {
            return true;
        }
    
        return false;
    }

  
    // Calculate the drag of a particle.
    calculateDrag(vel) {
        let drag = vel.copy().normalize().mult(-1);
        drag.setMag(this.density * vel.magSq());
    
        return drag;
    }
  
    draw() {
        if (this.duelMode) {
            this.sketch.stroke(this.duelRgb);
            this.sketch.fill(this.duelRgb);
        } else {
            this.sketch.stroke(this.rgb);
            this.sketch.fill(this.rgb);
        }
        
        this.sketch.rect(this.pos.x, this.pos.y, this.w, this.h);
    }
  }