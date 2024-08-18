const NO_OF_SPOTS = 20;
let spots = [];

let curr_spot;

const G = 0.2;
const SIZE = 10;

let showBalls = true;

let r = 50;

let shape = [];
let pendulums = [];

function setup() {
  createCanvas(windowWidth, windowWidth);
  background(220);

  // create all spots
  for (let i = 0; i < NO_OF_SPOTS; i++) {
    let x = random(width / 2 - r, width / 2 + r);
    let y = random(0, r);

    let spot = new Circular(x, y, 0.2);
    spots.push(spot);
  }

  jarvis_march();
}

function draw() {
  background(220);

  for (let spot of spots) {
    if (frameCount % 3600 == 0) {
      let upwardF = createVector(0, -2);
      spot.applyForce(upwardF);
    }

    let gravity = createVector(0, G);
    let weight = p5.Vector.mult(gravity, spot.m);
    spot.applyForce(weight);
    spot.friction();
    spot.edges();
    spot.move();
    if (showBalls) {
      spot.update();
    }
  }

  // updates depending on positions of spots
  shape = [];
  jarvis_march();

  noFill();
  stroke(74, 73, 77);
  strokeWeight(2);

  beginShape();
  for (let spot of shape) {
    vertex(spot.pos.x, spot.pos.y);
  }
  endShape(CLOSE);
}

function mouseClicked() {
  showBalls = !showBalls;
}