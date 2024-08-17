let NO_OF_SPOTS;
let spots = [];

let curr_spot;

let shape = [];
const G = 1;

const R = 100;
const headR = 30;
let centre;

let pendulums = [];

let fullShape = false;

function setup() {
  createCanvas(windowWidth, windowWidth);

  centre = createVector(50 + R, height / 2);

  // more likely to have a smaller shape
  if (random() < 0.7) {
    NO_OF_SPOTS = floor(random(5, 10));
  } else {
    NO_OF_SPOTS = floor(random(10, 100));
  }

  // create all points
  for (let i = 0; i < NO_OF_SPOTS; i++) {
    let x = random(50, 50 + 2 * R);
    let y = random(height / 2 - R, height / 2 + R);

    let spot = createVector(x, y);
    spot.start = random(100);
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
    return a.x - b.x;
  });
  shape.push(spots[0]);

  curr_spot = spots[1];

  // repeat until shape is fully vertexed
  let i = 0;
  let curr_prod = jarvis_cross(createVector(0, 0), shape[0], curr_spot);
  while (curr_spot != shape[0]) {
    if (i != 0) {
      shape.push(curr_spot);
    }

    for (let spot of spots) {
      let prod = 0;
      if (i == 0) {
        if (shape[i] != spot) {
          prod = 360 - jarvis_cross(createVector(0, 0), shape[0], spot);
        }
      } else {
        if (
          shape[shape.length - 2] != spot &&
          shape[shape.length - 1] != spot
        ) {
          prod = jarvis_cross(
            shape[shape.length - 2],
            shape[shape.length - 1],
            spot
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
}

function draw() {
  background(220);
  // translate(0, height);
  // scale(1, -1);

  if (keyIsDown(RIGHT_ARROW)) {
    for (let spot of shape) {
      let offx = 2;
      let offy = sin(frameCount / 10);

      spot.x += offx;
      spot.y += offy;

      if (spot.head) {
        spot.head.x += offx;
        spot.head.y += offy;
      }
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    for (let spot of shape) {
      let offx = 2;
      let offy = sin(frameCount / 10);

      spot.x -= offx;
      spot.y -= offy;

      if (spot.head) {
        spot.head.x -= offx;
        spot.head.y -= offy;
      }
    }
  }

  fill(0);
  for (let spot of shape) {
    if (spot.pendulum) {
      ellipse(spot.x, spot.y, 5);
      spot.pendulum.pos = spot;

      spot.pendulum.evaluate();
      spot.pendulum.move();
      spot.pendulum.draw();
    } else if (spot.head) {
      noFill();
      ellipse(spot.head.x, spot.head.y, headR);
    } else {
      fill(0);
      ellipse(spot.x, spot.y, 5);
    }

    spot.start += 0.01;
  }

  noFill();

  stroke(74, 73, 77);
  strokeWeight(3);
  beginShape();
  for (let spot of shape) {
    vertex(spot.x, spot.y);
  }
  endShape(CLOSE);
}

function mouseClicked() {
  for (let spot of shape) {
    let dist = createVector(mouseX - spot.x, mouseY - spot.y);
    if (dist.mag() < 3) {
      if (spot.pendulum) {
        spot.pendulum = null;

        let dir = createVector(spot.x - centre.x, spot.y - centre.y);
        dir.setMag(headR / 2 + 2);

        spot.head = p5.Vector.add(spot, dir);
      } else if (spot.head) {
        spot.head = null;
      } else {
        // attach a leg to this point.
        let angle = random(PI / 3);

        let r1 = random(35, 50);
        let r2 = random(50, 75);

        let pendulum = new Pendulum(
          spot.x,
          spot.y,
          10,
          10,
          r1,
          r2,
          angle,
          -angle
        );

        spot.pendulum = pendulum;
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 83) {
    saveGif("hunchback", 5);
  }
}