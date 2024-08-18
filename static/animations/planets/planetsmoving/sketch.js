let sun;
let planets = [];
const NO_OF_PLANETS = 2;

const G = 2;
const SIZE = 15;

let night;
let sun_img;
let shading;
let images;

function preload() {
  night = loadImage("../images/night.jpg");
  sun_img = loadImage("../images/sun2.png");
  let blue = loadImage("../images/blue_planet_no_shade.png");
  let grassy = loadImage("../images/grassy_planet_no_shade.png");
  shading = loadImage('../images/shading2.png');

  images = [blue, grassy];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);

  image(
    night,
    0,
    0,
    width,
    height,
    0,
    0,
    night.width,
    night.height,
    COVER
  );

  let m = 100;
  sun = new Sun(0, 0, m);
  
  let mlt = 1.5 / NO_OF_PLANETS;
  
  let pos1 = p5.Vector.random2D();

  for (let i = 0; i < NO_OF_PLANETS; i++) {
    let m = 5 * (i + 1);
    let img = images[i % images.length];

    let pos = p5.Vector.random2D();
    pos.mult(400);

    let planet = new Planet(pos.x, pos.y, m, img, 2, 3);
    planets.push(planet);

    // Every other planet is above
    planet.prevAbove = i % 2;
  }
}

function draw() {
  image(
    night,
    0,
    0,
    width,
    height,
    0,
    0,
    night.width,
    night.height,
    COVER
  );
  
  // Calculate which will be drawn above, which below
  let planets_above = [];
  let planets_below = [];
  for (let planet of planets) {
    if (planet.touchingSun && planet.prevAbove) {
      planets_below.push(planet);
    } else {
      planets_above.push(planet);
    }
  }

  push();
  imageMode(CENTER);
  translate(width / 2, height / 2);
  
  // Some planets are drawn below, some are drawn above
  for (let planet of planets_below) {
    sun.attract(planet);
    sun.touches(planet);

    planet.move();
    planet.display2();
  }

  sun.draw();

  for (let planet of planets_above) {
    sun.attract(planet);
    sun.touches(planet);

    planet.move();
    planet.display2();
  }
  pop();
}

function randomSubArray(array, n) {  
  // Remove 1 element
  for (let i = 0; i < array.length - n; i++) {
    let r = floor(random(array.length));
    array.splice(r, 1);
  }
  
  return array;
}
