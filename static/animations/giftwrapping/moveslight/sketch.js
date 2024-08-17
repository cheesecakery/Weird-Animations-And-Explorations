const NO_OF_SPOTS = 15;
let spots = [];

let curr_spot;

let shape = [];

let fullShape = false;

let r = 100;

function setup() {
  createCanvas(windowWidth, windowWidth);

//     let spot1 = createVector(400, 400);
//     let spot2 = createVector(600, 650);
//     let spot3 = createVector(700, 200);
//     let spot4 = createVector(300, 500);
//     let spot5 = createVector(100, 100);
//     let spot6 = createVector(150, 700);

//     spots = [spot1, spot2, spot3, spot4, spot5, spot6];

    // create all po1
    for (let i = 0; i < NO_OF_SPOTS; i++) {
      let x = random(width/2 - r, width/2 + r);
      let y = random(height/2 - r, height/2 + r);

      let spot = new Particle(x, y, 7.5);
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
    shape.push(curr_spot);

    i++;
    curr_prod = 0;
  }
}

function draw() {
  background(220);
  // translate(0, height);
  // scale(1, -1);

  for (let spot of spots) {
    spot.move();
    spot.update();
  }
  
  shape = [];
  jarvis_march();

  strokeWeight(2);
  noFill();

  beginShape();
  for (let spot of shape) {
    vertex(spot.pos.x, spot.pos.y);
  }
  endShape();
}

function keyPressed() {
  if (keyCode == 83) {
    saveGif("moving", 10);
  }
}
