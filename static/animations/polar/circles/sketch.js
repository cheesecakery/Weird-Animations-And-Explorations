let NO_OF_ROTATORS = 900;
let rotators = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  let minSide = min([windowWidth, windowHeight]);
  let scale = 0.5 * minSide;
  let l = 0.1 * minSide

  for (let i = 0; i < NO_OF_ROTATORS; i++) {
    let st_angle = 0.1 * (i + 1)
    
    // Set inner radius of circle
    let r = scale * (cos(1/100 * st_angle));

    // spawn in a circle
    let pos = createVector(0, r);
    push();
    translate(width / 2, height / 2);
    pos.rotate(st_angle);
    pop();

    // length of each line
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
