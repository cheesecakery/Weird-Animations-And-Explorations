let NO_OF_ROTATORS = 1000;
let rotators = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  let minSide = min(width, height);

  let scale = minSide * 0.15;
  let len = minSide * 0.01;

  for (let i = 0; i < NO_OF_ROTATORS; i++) {
    let st_angle = i
    
    // Set inner radius of circle
    let r = sin(100 * st_angle);
    r *= scale;

    // spawn in a circle
    let pos = createVector(0, r);
    push();
    translate(width / 2, height / 2);
    pos.rotate(st_angle);
    pop();

    // length of each line
    let angle = pos.heading();

    let strt = 0;

    let rotator = new myRotator(pos.x, pos.y, len, angle, strt);
    rotators.push(rotator);
  }
  
  // saveGif("cardiod", 5);
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
