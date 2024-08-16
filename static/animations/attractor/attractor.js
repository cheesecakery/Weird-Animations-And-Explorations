class Attractor {
  constructor(x, y, m, n) {
    this.pos = createVector(x, y);

    this.m = m;
    this.r = sqrt(m) * SIZE;

    this.justBorn = false;
    this.adult = true;

    this.mating = false;

    this.dying = false;

    // Get time the attractor was made
    this.start = frameCount;

    this.no_of_bubbles = n;
    this.max_bubbles = n;

    this.bubbles = [];

    this.rgb = randColour(0, 255);
    this.min = 200;
    this.max = 2000;

    this.createBubbles();
  }

  //* CREATING / ADDING BUBBLES *//

  // Creates the bubbles to envelop the attractor
  createBubbles() {
    let span = (2 * PI) / this.no_of_bubbles;

    for (let i = 0; i < this.no_of_bubbles; i++) {
      let radius = this.no_of_bubbles * 0.4 * pow(SIZE, 1.1);

      let pos = createVector(0, radius);

      pos.rotate(span * i);
      pos.add(this.pos);

      let mass = this.m * 5;

      let bubble = new Bubble(pos.x, pos.y, mass, this.rgb);
      this.bubbles.push(bubble);
    }
  }

  // Adds bubbles if attractor is a child
  addBubbles(step) {
    let current_time = frameCount;
    let dif = current_time - this.start;

    // After every 'step' seconds, add another 1-3 bubbles
    if (dif % (step * 60) == 0) {
      // Adds 1 to 3 bubbles each time (makes sure doesn't go over max bubbles amount)
      let rand_amount = ceil(random(3));
      let a = constrain(rand_amount, 0, this.max_bubbles - this.no_of_bubbles);

      // Creates bubble and adds to array
      for (let i = 0; i < a; i++) {
        // Random pos 5 units from bubble
        let pos = p5.Vector.random2D();
        pos.setMag(7.5);
        pos.add(this.pos);

        // Slightly variant colours
        let rgb = [
          this.rgb[0] + random(-50, 50),
          this.rgb[1] + random(-50, 50),
          this.rgb[2] + random(-50, 50),
        ];

        let bubble = new Bubble(pos.x, pos.y, this.m * 5, rgb);
        this.no_of_bubbles++;
        this.bubbles.push(bubble);
      }
    }
  }

  // Grows the mass, calculates radius accordingly - for when child becomes adult.
  growBubbles(step) {
    for (let bubble of this.bubbles) {
      bubble.m += step;
      bubble.calculateRadius();
    }
  }

  // Updates radius when mass is changed
  calculateRadius() {
    this.r = sqrt(this.m) * SIZE;
  }

  //* FUNCTIONS CHECKING EDGES N ETC *//

  edges() {
    // Checks if touching bottom / top
    if (this.pos.y + this.r >= height) {
      this.pos.y = height - this.r;
      this.vel.y *= -0.5;
    } else if (this.pos.y - this.r <= 0) {
      this.pos.y = this.r;
      this.vel.y *= -0.5;
    }

    // Checks if touching sides
    if (this.pos.x + this.r >= width) {
      this.pos.x = width - this.r;
      this.vel.x *= -0.5;
    } else if (this.pos.x - this.r <= 0) {
      this.pos.x = this.r;
      this.vel.x *= -0.5;
    }
  }

  // Checks if attractor is compacted (haven't used this yet)
  compacted() {
    for (let bubble of this.bubbles) {
      let dist = p5.Vector.sub(this.pos, bubble.pos).mag();

      if (dist > 10) {
        return false;
      }
    }

    return true;
  }

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
    } else if (this.pos.x + this.r >= jelly.x + jelly.w - 2) {
      this.pos.s = jelly.x + jelly.w - this.r - 2;
      this.vel.x *= -1;
    }
  }

  collidesWith(jelly) {
   // Finds the closest point on jelly to the bubble
    let closestX = constrain(this.pos.x, jelly.x, jelly.x + jelly.w);
    let closestY = constrain(this.pos.y, jelly.y, jelly.y + jelly.h);

    let distanceX = closestX - this.pos.x;
    let distanceY = closestY - this.pos.y;
    let distance = createVector(distanceX, distanceY);
    
    if (distance.mag() < this.r) {
      return true;
    }
    
    return false;
  }

  // Stops attractors going in mating pit if mating is currently going on
  bounceOff(jelly) {
    // If there is collision ?
    if (this.collidesWith(jelly)) {
      if (this.pos.x < jelly.x) {
        this.pos.x = jelly.x - this.r;
        this.vel.x *= -1;
        // Right
      } else if (this.pos.x > jelly.x + jelly.w) {
        this.pos.x = jelly.x + jelly.w + this.r;
        this.vel.x *= -1;
      }

      if (this.pos.y < jelly.y) {
        this.pos.y = jelly.y - this.r;
        this.vel.y *= -1;
        // Bottom
      } else if (this.pos.y > jelly.y + jelly.h) {
        this.pos.y = jelly.y + jelly.h + this.r;
        this.vel.y *= -1;
      }
    }
  }

  //* 'LIFE' FUNCTIONS *//

  becomeAdult() {
    this.adult = true;

    this.m = 10;
    this.calculateRadius();

    this.growBubbles(25);

    let col = color(this.rgb);
    createText("AHH! your little babe has grown up", col, 3);
  }

  mateWith(attractor) {
    matingInProgress = true;

    this.mating = true;
    attractor.mating = true;

    this.vel.set(0, 0);
    attractor.vel.set(0, 0);

    createText("the mating shall begin!!", "black", 5);

    let a = floor(random(100));

    // 50% chance they successfully mate
    if (a <= 50) {
      setTimeout(birthAttractor, 2500 + 2000, this, attractor);
      // 35% chance of miscarriage
    } else if (a <= 85) {
      setTimeout(miscarriage, 2500 + 2500, this, attractor);
      // 15% chance of duel !!
    } else {
      setTimeout(duelling, 2500 + 2500, this, attractor);
    }
  }

  // Slowly lose bubbles
  die() {
    this.dying = true;

    for (let i = 0; i < this.no_of_bubbles; i++) {
      setTimeout(() => {
        this.bubbles.pop();
      }, 1000 * i * 0.05);
    }
  }

  //* MOTION FUNCTIONS **//

  // Exerts force to attract bubble
  attract(bubble) {
    // Find distance between the two
    let force = p5.Vector.sub(this.pos, bubble.pos);

    let distanceSq = constrain(force.magSq(), this.min, this.max);

    let G = 5;

    let constant = (G * (this.m * bubble.m)) / distanceSq;

    force.setMag(constant);

    bubble.applyForce(force);
  }

  //* CORE FUNCTIONS *//

  // Move attractor, move bubbles
  move() {
    for (let bubble of this.bubbles) {
      this.attract(bubble);

      if (matingInProgress) {
        if (this.mating || this.justBorn) {
          bubble.containedBy(jelly);
        }
      }

      bubble.move();
      bubble.draw();
    }
  }

  draw() {
    if (this.dying) {
      stroke(86, 11, 15);
      fill(86, 11, 15);
    } else {
      stroke(0);
      fill(0);
    }

    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
