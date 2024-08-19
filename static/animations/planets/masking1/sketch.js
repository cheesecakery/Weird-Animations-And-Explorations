let blue_planet;
let perfect_circle;

let night;

let r;

let a;
let m;

let max_d;

function preload() {
  blue_planet = loadImage("../images/blue_planet_no_shade.png");
  perfect_circle = loadImage("../images/shading.png");

  night = loadImage("../images/night.jpg");
}

function setup() {
  let minSide = min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);

  r = minSide * 0.1;
  
  max_d = dist(0, 0, width / 2, height / 2);
}

function draw() {
  image(night, 0, 0, width, height, 0, 0, night.width, night.height, COVER);

  stroke(255, 0, 0);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 20);

  push();
  translate(width / 2, height / 2);
  imageMode(CENTER);

  let d = createVector(width / 2 - mouseX, height / 2 - mouseY);

  // Only change values if mouse is not in centre
  if (d.mag() > r) {
    // calculate
    m = map(d.mag(), 0, max_d, 150, 0);
  }

  a = atan2(d.x, d.y);
  
  push();
  // PI/3 is as the mask is a bit off centre lol
  rotate(-a + PI / 3);
  image(perfect_circle, 0, 0, r * 2, r * 2);
  pop();

  blendMode(BURN);
  image(blue_planet, 0, 0, r * 2, r * 2);
  blendMode(BLEND);
  tint(255, m);
  image(blue_planet, 0, 0, r * 2, r * 2);

  pop();
}
