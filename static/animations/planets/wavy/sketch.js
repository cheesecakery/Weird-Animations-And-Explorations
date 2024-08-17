const NO_OF_WAVES = 5;
let waves = [];

const NO_OF_PLANETS = 3;
let planets = [];

let ruby;
let blue;
let grassy;
let opal;
let earth;
let meteor;

let nightsky;

let maskImage;

let max_d;

let images;
function preload() {
  nightsky = loadImage("images/night.jpg");

  blue = loadImage("images/blue_planet.png");
  grassy = loadImage("images/grassy_planet.png");
  magnet = loadImage("images/magnet_planet.png");
  maskImage = loadImage("images/perfect_circle.png");

  images = [magnet, grassy, blue];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  image(nightsky, 0, 0, width, height);
  
  max_d = dist(0, 0, width, height);
  max_d *= max_d;

  for (let i = 0; i < NO_OF_WAVES; i++) {
    let wave = new Wave(random(50, 400), random(20, 40), random(100));
    waves.push(wave);
  }

  // planets ?
  let step = width / NO_OF_PLANETS;

  for (let i = 0; i < NO_OF_PLANETS; i++) {
    let r = (pow(i, 1.1) + 1) * step * 0.05;

    let x = step * (i + 0.5);

    let img = images[i % images.length];

    let planet = new Planet(x, r, img);
    planets.push(planet);
  }
  
  planets[0].tint = 1.5;
}

function draw() {
  background(0, 0.3);

  image(
    nightsky,
    0,
    0,
    width,
    height,
    0,
    0,
    nightsky.width,
    nightsky.height,
    COVER
  );

  for (let wave of waves) {
    wave.update();
  }
  
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 20)

  push();
  imageMode(CENTER);

  for (let planet of planets) {
    let x = planet.x;
    let y = height / 2;
    for (let wave of waves) {
      y += wave.evaluate(x);
    }

    let d = createVector(x - mouseX, y - mouseY);

    let m = map(d.magSq(), 0, max_d, 100, 10);
    // m = constrain(m, 50, 150);
    let a = atan2(d.x, d.y);

    push();
    translate(x, y);

    push();
    // PI/3 is as the mask is off centre
    rotate(-a + PI / 3);
    image(maskImage, 0, 0, planet.r * 2, planet.r * 2);
    pop();

    push();
    blendMode(BURN);
    image(planet.img, 0, 0, planet.r * 2, planet.r * 2);
    blendMode(BLEND);
    tint(255, m * planet.tint);
    image(planet.img, 0, 0, planet.r * 2, planet.r * 2);

    pop();

    pop();
  }

  pop();
}

function doubleClicked() {
  saveGif("bouncing", 5)
}
