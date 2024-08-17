let sun;

const NO_OF_PLANETS = 17;

let planets = [];

const G = 1;

let the_sun;

let total_images;
let green_images;
let blue_images;
let grey_images;
let images;

let perfect_circle;

let nightsky;

function preload() {
  nightsky = loadImage("images/night.jpg");

  the_sun = loadImage("images/the_sun.png");
  let blue = loadImage("images/blue_planet.png");
  let grassy = loadImage("images/grassy.png");
  let opal = loadImage("images/opal.png");
  let earth = loadImage("images/earth_planet.png");
  let meteor = loadImage("images/meteor.png");
  let black = loadImage("images/black_planet.png");
  let crystal = loadImage("images/crystal_planet.png");
  let desert = loadImage("images/desert_planet.png");
  let green = loadImage("images/green_planet.png");
  let magnet = loadImage("images/magnet_planet.png");
  let moon = loadImage("images/moon_planet.png");
  let purple = loadImage("images/purple_planet.png");
  let red = loadImage("images/red_planet.png");
  let turq = loadImage('images/turq_planet.png');
  let wood = loadImage('images/wood_planet.png');
  
  perfect_circle = loadImage('images/perfect_circle.png');

  total_images = [blue, grassy, meteor, opal, earth, black, crystal, desert, green, magnet, moon, purple, red, turq, wood];
  
  images = randomSubArray(total_images, NO_OF_PLANETS);
}

function setup() {
  frameRate(60);
  
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);

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

  let m = 1500;
  sun = new Sun(0, 0, m);
  
  let mlt = 1.5 / NO_OF_PLANETS;
  
  let pos1 = p5.Vector.random2D();
  let step = TWO_PI / NO_OF_PLANETS;
  
  for (let i = 0; i < NO_OF_PLANETS; i++) {
    // let m = mlt * random(100, 150) * (i + 1);
    let m = 40;
    let img = images[i % images.length];

    let pos = p5.Vector.rotate(pos1, step * i);
    pos.mult(400);

    let planet = new Planet(pos.x, pos.y, m, img);
    planets.push(planet);
    
    let r = random([true, false]);
    planet.prevAbove = r;
  }
}

function draw() {
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
    planet.display();
  }

  sun.draw();

  for (let planet of planets_above) {
    planet.display();
  }


  if (focused) {
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
