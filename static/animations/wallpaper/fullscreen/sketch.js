let corna = 0;
let cornb = 0;

let side = 100;
let start = 0;
let step = 0.01;

let canvas;
let parent;

let scaleFactor;


function setup() {
  let minSide = min(windowWidth, windowHeight);
  canvas = createCanvas(minSide, minSide);

  background(255);
  drawPicture();
}

function draw() {
  // makes the wallpaper change in dimension
  if (keyIsDown(189)) {
    side = constrain(side - 1, 0, 500);
  } else if (keyIsDown(187)) {
    side = constrain(side + 1, 0, 500)
  }

  if (keyIsDown(DOWN_ARROW)) {
    cornb = constrain(cornb - 1, -100, 100);
  }
  if (keyIsDown(UP_ARROW)) {
    cornb = constrain(cornb + 1, -100, 100);;
  }
  if (keyIsDown(LEFT_ARROW)) {
    corna = constrain(corna - 1, -100, 100);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    corna = constrain(corna + 1, -100, 100);;
  }

  if (frameCount % 2 == 0) {
    // commented out, but all these affect the movement
    // corna += map(noise(start), 0, 1, -1, 1);
    // cornb += map(noise(1000 - start), 0, 1, -1, 1);
    side += map(noise(10000000 + start), 0, 1, -side*0.001, side*0.001);
    drawPicture();
  }

  start += step;

  rectMode(CENTER);
}

function doubleClicked() {
  save("RGB.png");
}
