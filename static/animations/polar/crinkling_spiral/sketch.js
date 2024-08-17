let NO_OF_ROTATORS = 1500;
let rotators = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  let minSide = min([windowWidth, windowHeight]);

  for (let i = 0; i < NO_OF_ROTATORS; i++) {
    let st_angle = 0.025 * (i + 1)
    
    // Set inner radius of circle
    // let r = 300 * (sin(PI * st_angle));
    let r = 30 * st_angle;

    // spawn in a circle
    let pos = createVector(0, r);
    push();
    translate(width / 2, height / 2);
    pos.rotate(st_angle);
    pop();

    // length of each line
    let l = 0.005 * pow(i, 3/2);
    let angle = pos.heading();

    let strt = 0;

    let rotator = new Rotator(pos.x, pos.y, l, angle, strt);
    rotators.push(rotator);
  }
}

function draw() {
  background(0);

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
