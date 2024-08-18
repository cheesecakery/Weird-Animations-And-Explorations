const NO_OF_SPOTS = 15;
let spots = [];

let attractor;

const G = 1;
const SIZE = 3;

let spawnRadius = 100;

let showArrows = true;

let shape = [];
let pendulums = [];

function setup() {
  createCanvas(windowWidth, windowWidth);
  background(74, 73, 77);

  // create all spots
  for (let i = 0; i < NO_OF_SPOTS; i++) {
    let x = random(width / 2 - spawnRadius, width / 2 + spawnRadius);
    let y = random(height / 2 - spawnRadius, height / 2 + spawnRadius);
    let pos = createVector(x, y);

    // Spawns 
    let vel = pos.copy();
    vel.normalize();
    vel.rotate(PI / 2);

    let spot = new Triangular(pos.x, pos.y, vel.x, vel.y, 2);
    spots.push(spot);
  }

  attractor = new Attractor(width / 2, height / 2, 5);

  jarvis_march();
}

function draw() {
  background(74, 73, 77);

  for (let spot of spots) {
    for (let other of spots) {
      if (other != spot) {
        spot.attract(other);
      }
    }

    attractor.attract(spot);

    spot.move();
    if (showArrows) {
      spot.update();
    }
  }

  // attractor.update();

  // updates depending on positions of spots
  shape = [];
  jarvis_march();

  noFill();
  stroke(255);
  strokeWeight(0.5);

  beginShape();
  for (let spot of shape) {
    vertex(spot.pos.x, spot.pos.y);
  }
  endShape(CLOSE);
}

function mouseClicked() {
  showArrows = !showArrows;
}
