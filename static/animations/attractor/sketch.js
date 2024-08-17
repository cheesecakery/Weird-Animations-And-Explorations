// scale of mass to radius
const SIZE = 1.5;

// Controls how far attractors can generate from sides
let d = 75;

let jelly;

const NO_OF_ATTRACTORS = 3;
const MAX_NO_OF_ATTRACTORS = 5;
let attractors = [];

let submerged_attractors = [];
let submerged_children = [];

let attractor_move = false;
let attractor_cursor;

let matingInProgress = false;

let divs = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  jelly = new Jelly(width / 2, height / 2, 200, 200, 5);

  for (let i = 0; i < NO_OF_ATTRACTORS; i++) {
    createAttractor();
  }
}

// Creates an attractor
function createAttractor() {
  let x = random(d, width - d);
  let y = random(d, height / 2);

  let mass = 10;
  let no_of_bubbles = floor(random(50, 100));

  let attractor = new Attractor(x, y, mass, no_of_bubbles);
  attractors.push(attractor);
}

function draw() {
  background(220);

  // Move attractor
  let ra = 1;
  let dif = 0.5;
  if (attractor_move) {
    if (keyIsDown(LEFT_ARROW)) {
      attractor_cursor.pos.x -= ra;
      for (let bubble of attractor_cursor.bubbles) {
        bubble.pos.x -= random(ra - dif, ra + dif);
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      attractor_cursor.pos.x += ra;
      for (let bubble of attractor_cursor.bubbles) {
        bubble.pos.x += random(ra - dif, ra + dif);
      }
    }
    if (keyIsDown(UP_ARROW)) {
      attractor_cursor.pos.y -= ra;
      for (let bubble of attractor_cursor.bubbles) {
        bubble.pos.y -= random(ra - dif, ra + dif);
      }
    }
    if (keyIsDown(DOWN_ARROW)) {
      attractor_cursor.pos.y += 1;
      for (let bubble of attractor_cursor.bubbles) {
        bubble.pos.y += random(ra - dif, ra + dif);
      }
    }
  }

  for (let attractor of attractors) {
    let touching_bubbles = 0;
    let submerged_bubbles = 0;

    // If bubbles are drenched in jelly, slow their motion.
    for (let bubble of attractor.bubbles) {
      if (jelly.contains(bubble)) {
        touching_bubbles++;

        if (jelly.wholly_contains(bubble)) {
          submerged_bubbles++;
        }

        let drag = jelly.calculateDrag(bubble.vel);
        bubble.applyForce(drag);
      }
    }

    // If the attractor is fully submerged in the pit:
    if (submerged_bubbles == attractor.no_of_bubbles) {
      // Check if adult
      if (attractor.adult) {
        // Add to array (if necessary) & show text
        if (!submerged_attractors.includes(attractor)) {
          submerged_attractors.push(attractor);

          // Creates text saying how many attractors are submerged
          let col = color(attractor.rgb);
          if (submerged_attractors.length == 1) {
            createText("1 attractor is submerged", col, 1.5);
          } else {
            createText(
              submerged_attractors.length + " attractors are submerged",
              col,
              1.5
            );
          }

          setTimeout(checkToBeginMating, 5000);
        }
        // If child, add to separate array (so don't mess with mating)
      } else {
        if (!submerged_children.includes(attractor)) {
          submerged_children.push(attractor);

          let col = color(attractor.rgb);
          if (!matingInProgress) {
            if (submerged_children.length == 1) {
              createText("1 child is submerged", col, 1.5);
            } else {
              createText(
                submerged_children.length + "children are submerged",
                col,
                1.5
              );
            }
          }
        }
      }

      // In order to be 'unsubmerged' must have at least 1 bubble not in contact with jelly whatsoever
      // If submerged, remove from array .
    } else if (touching_bubbles != attractor.no_of_bubbles) {
      // Checks that the attractor was in either array to begin with (child or normal)

      if (submerged_attractors.includes(attractor)) {
        // Removes the attractor from the submerged array.
        let index = submerged_attractors.indexOf(attractor);
        submerged_attractors.splice(index, 1);

        setTimeout(checkToBeginMating, 5000);
      } else if (submerged_children.includes(attractor)) {
        let index = submerged_children.indexOf(attractor);
        submerged_children.splice(index, 1);
      }
    }

    // If the attractor is a child, needs to slowly increment bubbles ...
    if (attractor.adult == false) {
      // Can only add bubbles if eye is not in jelly
      if (!jelly.contains(attractor)) {
        // Adds more bubbles each second
        attractor.addBubbles(1);

        // If has max bubbles, then becomes an adult
        if (attractor.no_of_bubbles == attractor.max_bubbles) {
          attractor.becomeAdult();
        }
      }
    }

    // Makes sure mating attractors keep in, others  keep out .
    if (matingInProgress) {
      if (attractor.mating || attractor.justBorn) {
        attractor.containedBy(jelly);
      } else {
        attractor.bounceOff(jelly);
      }
    }
  }

  for (let attractor of attractors) {
    // & Apply changes
    attractor.edges();
    attractor.move();
    attractor.draw();
  }

  // Draw jelly last so that bubbles look like they are underneath
  jelly.draw();
}

// If mouse is touching eye of attractor, attractor can move
function mouseClicked() {
  for (let attractor of attractors) {
    checkForMovement(attractor);
  }
}
