let corna = 0;
let cornb = 0;
let side = 100;

let start = 0;
let step = 0.1;

let isInvisible = false;
let isErasorMode = false;

let mode = "normal";

let particle;

let buffer;
let marker;

let bg = 247;

// let noiseSlider;

function setup() {
  // creates square canvas + wallpaper texture
  let minSide = min(windowWidth, windowHeight);
  createCanvas(minSide, minSide);
  drawPicture();

  // makes particle in middle of the screen
  particle = new Particle(10, height / 2, 30);

  // grey canvas on top concealing the wallpaper initially
  buffer = createGraphics(width, height);
  buffer.background(bg);
  image(buffer, 0, 0, width, height);

  // small ellipse on top (marking where you are!)
  marker = createGraphics(width, height);

  // sliders to control noise / size of brush
  // noiseSlider = createSlider(0, 200, 100);
  // noiseSlider.position(60, width + 10);
  // noiseSlider.size(width);
}

function draw() {
  marker.clear();
  
  // makes wallpaper pattern move with a bit of noise to it
  if (frameCount % 3 == 0) {
    // side = noiseSlider.value();
    side += map(noise(1000 + start), 0, 1, -0.1, 0.1);
    drawPicture();
  }

  // moves the marker across the screen
  if (keyIsDown(LEFT_ARROW)) {
    particle.pos.x -= 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    particle.pos.x += 2;
  }
  if (keyIsDown(UP_ARROW)) {
    particle.pos.y -= 2;
  }
  if (keyIsDown(DOWN_ARROW)) {
    particle.pos.y += 2;
  }

  particle.edges();

  if (mode != "invisible") {
    buffer.ellipse(particle.pos.x, particle.pos.y, particle.r);
  }

  if (mode == "normal") {
      buffer.erase();
  } else if (mode == "erasor") {
      buffer.stroke(247);
      buffer.fill(247);
      buffer.noErase();
  }

  // makes brush smaller/bigger
  if (keyIsDown(187)) {
    particle.r = constrain(particle.r + 1, 5, 150);
    console.log(particle.r);
  } else if (keyIsDown(189)) {
    particle.r = constrain(particle.r - 1, 5, 150);
  }

  image(buffer, 0, 0, width, height);

  marker.fill(0);
  let sw = constrain(particle.r / 5, 1, 10);
  marker.ellipse(particle.pos.x, particle.pos.y, sw);
  
  image(marker, 0, 0, width, height);

  start += step;
}

function keyPressed() {
  // screenshots canvas
  if (keyCode == 83) {
    marker.clear();
    save("texture.png");
  }

  // toggles invisible mode
  if (keyCode == 73) {
    if (mode == "invisible") {
      mode = "normal";
    } else {
      mode = "invisible";
    }
  }
  
  // toggles erasor mode
  if (keyCode == 69) {
    if (mode == "erasor") {
      mode = "normal";
    } else {
      mode = "erasor"
    }
  }

  // clears the canvas
  if (keyCode == 67) {
    buffer.background(bg);
  }
}
