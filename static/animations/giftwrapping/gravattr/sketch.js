const NO_OF_SPOTS = 15;
let spots = [];

let attractor;

let curr_spot;

const G = 1;

let r = 100;

let showArrows = true;

let shape = [];
let pendulums = [];

function setup() {
  createCanvas(windowWidth, windowWidth);
  background(74, 73, 77);

  // create all spots
  for (let i = 0; i < NO_OF_SPOTS; i++) {
    let x = random(width / 2 - r, width / 2 + r);
    let y = random(height / 2 - r, height / 2 + r);
    let pos = createVector(x, y);

    let vel = pos.copy();
    vel.normalize();
    vel.rotate(PI / 2);

    let spot = new Particle(pos.x, pos.y, vel.x, vel.y, 2);
    spots.push(spot);
  }

  attractor = new Attractor(width / 2, height / 2, 5);

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

function jarvis_march() {
  // sort spots by smallest x
  spots.sort((a, b) => {
    return a.pos.x - b.pos.x;
  });
  shape.push(spots[0]);

  curr_spot = spots[1];

  // repeat until shape is fully vertexed
  let i = 0;
  let curr_prod = jarvis_cross(createVector(0, 0), shape[0].pos, curr_spot.pos);
  while (curr_spot != shape[0]) {
    if (i != 0) {
      shape.push(curr_spot);
    }

    for (let spot of spots) {
      let prod = 0;
      if (i == 0) {
        if (shape[i] != spot) {
          prod = 360 - jarvis_cross(createVector(0, 0), shape[0].pos, spot.pos);
        }
      } else {
        if (
          shape[shape.length - 2] != spot &&
          shape[shape.length - 1] != spot
        ) {
          prod = jarvis_cross(
            shape[shape.length - 2].pos,
            shape[shape.length - 1].pos,
            spot.pos
          );
        }
      }

      if (prod > curr_prod) {
        curr_prod = prod;
        curr_spot = spot;
      }
    }

    i++;
    curr_prod = 0;
  }

  spots.sort((a, b) => {
    return a.pos.y - b.pos.y;
  });
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

  //   noLoop();
}

function mouseClicked() {
  showArrows = !showArrows;
}
