const NO_OF_SPOTS = 20;
let spots = [];

let curr_spot;

const G = 0.2;

let showBalls = true;

let r = 50;

let shape = [];
let pendulums = [];

function setup() {
  createCanvas(windowWidth, windowWidth);
  background(220);

  //     let spot1 = createVector(400, 400);
  //     let spot2 = createVector(600, 650);
  //     let spot3 = createVector(700, 200);
  //     let spot4 = createVector(300, 500);
  //     let spot5 = createVector(100, 100);
  //     let spot6 = createVector(150, 700);

  //     spots = [spot1, spot2, spot3, spot4, spot5, spot6];

  // create all spots
  for (let i = 0; i < NO_OF_SPOTS; i++) {
    let x = random(width / 2 - r, width / 2 + r);
    let y = random(0, r);

    let spot = new Particle(x, y, 0.2);
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