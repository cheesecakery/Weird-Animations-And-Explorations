let NO_OF_ROTATORS = 750;
let rotators = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  let minSide = min([windowWidth, windowHeight]);

  for (let i = 0; i < NO_OF_ROTATORS; i++) {
    let st_angle = (i + 0.0001);
    
    // Set inner radius of circle
    let r = 75 * (1 + 3 * cos(st_angle));

    // spawn in a circle
    let pos = createVector(0, r);
    pos.rotate(st_angle);

    // length of each line
    let l = 2 * r / 5;
    let angle = pos.heading();

    let strt = 0;

    let rotator = new myRotator(pos.x, pos.y, l, angle, strt);
    rotators.push(rotator);
  }
}

function draw() {
  background(0);

  translate(width / 2, height / 4);
  for (let rotator of rotators) {
    rotator.move();
    rotator.draw();
  }
}

function randColour(min, max) {
  var r;
  var g;
  var b;

  var rgb = [r, g, b];
  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = floor(random(min, max));
  }

  return rgb;
}
