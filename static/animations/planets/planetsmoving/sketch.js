let sun;

const NO_OF_PLANETS = 2;

let planets = [];

const G = 2;

const SIZE = 15;

let the_sun;

let total_images;
let green_images;
let blue_images;
let grey_images;
let images;

let perfect_circle;
let planet_2;

let nightsky;

function preload() {
  nightsky = loadImage("images/night.jpg");
  the_sun = loadImage("images/the_sun_again2.png");
  let blue = loadImage("images/blue_planet.png");
  let grassy = loadImage("images/grassy_planet.png");
    let wood = loadImage("images/wooden_planet.png");
  
  perfect_circle = loadImage('images/perfect_circle3.png');

//   total_images = [blue, grassy];
  
//   green_images = [grassy, green, earth, turq];
//   blue_images = [blue, opal, purple];
//   grey_images = [meteor, black, crystal, desert, magnet, moon, wood];
  
//   let green_image = random(green_images);
//   let blue_image = random(blue_images);
//   let grey_image = random(grey_images);
  
//   images = [green_image, blue_image, grey_image];
  
  // images = randomSubArray(total_images, NO_OF_PLANETS);
  
  images = [blue, grassy];
}

function setup() {
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

  let m = 100;
  sun = new Sun(0, 0, m);
  
  let mlt = 1.5 / NO_OF_PLANETS;
  
  let pos1 = p5.Vector.random2D();
  // let step = TWO_PI / NO_OF_PLANETS;
  
  for (let i = 0; i < NO_OF_PLANETS; i++) {
    // let m = mlt * random(100, 150) * (i + 1);
    let m = 5 * (i + 1);
    let img = images[i % images.length];

//     let pos = p5.Vector.rotate(pos1, step * i);
//     pos.mult(400);
    
    let pos = p5.Vector.random2D();
    pos.mult(400);

    let planet = new Planet(pos.x, pos.y, m, img);
    planets.push(planet);

    // Every other planet is above
    planet.prevAbove = i % 2;
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
    sun.attract(planet);
    sun.touches(planet);

    planet.move();
    planet.display();
  }

  sun.draw();

  for (let planet of planets_above) {
    sun.attract(planet);
    sun.touches(planet);

    planet.move();
    planet.display();
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
