const NO_OF_SPOTS = 15;
let spots = [];

let curr_spot;

const G = 5;
const SIZE = 3;

let r = 100;

let showArrows = true;

let shape = [];
let pendulums = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(74, 73, 77);

  // create all spots
  for (let i = 0; i < NO_OF_SPOTS; i++) {
    let x = random(width / 2 - r, width / 2 + r);
    let y = random(height/2 - r, height/2 + r);
    let pos = createVector(x, y);
    
    let vel = pos.copy();
    vel.normalize();
    vel.rotate(PI / 2);

    let spot = new Triangular(pos.x, pos.y, vel.x, vel.y, 2);
    spots.push(spot);
  }

  jarvis_march();
}

function jarvis_cross(p1, p2, p3) {
  let v1 = p5.Vector.sub(p2, p1);
  let v2 = p5.Vector.sub(p2, p3);

  let num = v1.dot(v2);
  let den = v1.mag() * v2.mag();

  let ret_cross = acos(num / den);

  // ret_cross = v1.x * v2.y - v1.y * v2.x;
  return ret_cross;
}

function draw() {
  background(74, 73, 77);

  for (let spot of spots) {
    for (let other of spots) {
      if (other != spot) {
        spot.attract(other);
      }
    }
    
    spot.move();
    spot.edges();

    if (showArrows) {
      spot.update();
    }
  }

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
