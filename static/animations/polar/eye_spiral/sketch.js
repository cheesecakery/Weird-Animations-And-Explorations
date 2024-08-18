let NO_OF_ROTATORS = 500;
let rotators = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  let minSide = min([windowWidth, windowHeight]);

  for (let i = 0; i < NO_OF_ROTATORS; i++) {
    // Set inner radius of circle
    let r = minSide / 4;

    // spawn in a circle
    let pos = p5.Vector.random2D();
    pos.mult(r);

    // length of each line
    let l = 2 * r / 3;
    let angle = pos.heading();

    let strt = i * 0.001;

    let rotator = new myRotator(pos.x, pos.y, l, angle, strt);
    rotators.push(rotator);
  }
}

function draw() {
  background(0, 100);

  translate(width / 2, height / 2);
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
