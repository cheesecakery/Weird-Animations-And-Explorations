let corna = 0;
let cornb = 0;
let side = 100;

let start = 0;
let step = 0.1;

let isInvisible = false;
let isErasorMode = false;

let particle;

let buffer;
let marker;

let bg = 240;

function setup() {
  let minSide = min(windowWidth, windowHeight);
  createCanvas(minSide - 100, minSide - 100);

  particle = new Particle(width/2, height / 2, 20);

  drawPicture();

  buffer = createGraphics(width, height);
  buffer.background(bg);
  image(buffer, 0, 0, width, height);
  
  marker = createGraphics(width, height);
}

function draw() {
  marker.clear();
  
  if (frameCount % 3 == 0) {
    side += map(noise(1000 + start), 0, 1, -0.1, 0.1);
    drawPicture();
  }
  
  let offsetX = map(noise(start + 1000), 0, 1, -3, 3);
  let offsetY = map(noise(start), 0, 1, -3, 3);
  particle.pos.x = constrain(particle.pos.x + offsetX, 0, width);
  particle.pos.y = constrain(particle.pos.y + offsetY, 0, height);
  particle.edges();
  
  buffer.erase();
  buffer.ellipse(particle.pos.x, particle.pos.y, particle.r);

  image(buffer, 0, 0, width, height);

  marker.fill(0);
  let sw = constrain(particle.r / 5, 1, 10);
  marker.ellipse(particle.pos.x, particle.pos.y, sw);
  
  image(marker, 0, 0, width, height);

  start += step;
}
