let NO_OF_ROTATORS = 1500;
let rotators = [];

function setup() {
  let parent = document.getElementById("crinkling_spiral");
  let canvas = createCanvas(parent.offsetWidth, parent.offsetHeight);
  canvas.parent(parent);
  background(0);
  
  let minSide = min(width, height);

  NO_OF_ROTATORS = 1.5 * minSide;
  let scaleR = 0.0001 * minSide; 
  let scaleL = 0.001 * minSide;
  let scaleA = 0.025 * minSide;

  for (let i = 0; i < NO_OF_ROTATORS; i++) {
    let st_angle = scaleA * (i + 1)
    
    // Set inner radius of spiral
    let r = scaleR * st_angle;

    // spawn in a circle
    let pos = createVector(0, r);
    push();
    translate(width / 2, height / 2);
    pos.rotate(st_angle);
    pop();

    // length of each line
    let l = scaleL * pow(i, 3/2);
    let angle = pos.heading();

    let strt = 0;

    let rotator = new myRotator(pos.x, pos.y, l, angle, strt);
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
