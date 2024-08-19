const NO_OF_PLANETS = 17;

let planets = [];

const G = 1;
const SIZE = 3;

let sun;
let sun_img;
let night;

let total_imgs = [];
let imgs;

let shading;

let img_names = ['blue_planet', 'grassy',
  'earth_planet', 'meteor', 'black_planet', 'crystal_planet',
  'desert_planet', 'green_planet', 'magnet_planet', 'moon_planet', 
  'purple_planet', 'red_planet', 'turq_planet', 'wood_planet'
]

function preload() {
  night = loadImage("../images/night.jpg");
  sun_img = loadImage("../images/the_sun.png");
  shading = loadImage("../images/shading.png");

  for (let img_name of img_names) {
    let img = loadImage("../images/" + img_name + ".png");
    total_imgs.push(img);
  }

  imgs = randomSubArray(total_imgs, NO_OF_PLANETS);
}

function setup() {
  frameRate(60);
  let minSide = min(windowWidth, windowHeight);
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

  let m = 1.5 * minSide;
  sun = new Sun(0, 0, m);
  
  let mlt = 1.5 / NO_OF_PLANETS;
  
  let pos1 = p5.Vector.random2D();
  let step = TWO_PI / NO_OF_PLANETS;
  
  for (let i = 0; i < NO_OF_PLANETS; i++) {
    // let m = mlt * random(100, 150) * (i + 1);
    let m = 0.07 * minSide * random(0.9, 1.1);
    let img = imgs[i % imgs.length];

    let pos = p5.Vector.rotate(pos1, step * i);
    pos.mult(400);

    let planet = new Planet(pos.x, pos.y, m, img, 0, 10);
    planets.push(planet);
    
    let r = random([true, false]);
    planet.prevAbove = r;
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
  
  // DISPLAY OF PLANETS
  for (let planet of planets_below) {
    planet.display();
  }

  sun.draw();

  for (let planet of planets_above) {
    planet.display();
  }

  // MOVEMENT OF PLANETS
  for (let planet of planets_below) {
    sun.attract(planet);
    sun.touches(planet);

    planet.move();
  }

  for (let planet of planets_above) {
    sun.attract(planet);
    sun.touches(planet);

    planet.move();
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

function keyPressed() {
  if (keyCode == 83) {
    saveGif("moving", 10);
  }
}
