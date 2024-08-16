let corna = 0;
let cornb = 0;
let side = 100;

let start = 0;
let step = 0.1;

let isInvisible = false;
let isErasorMode = false;

let r;

let particle;

let buffer;
let marker;

let bg = 247;

function setup() {
  let minSide = min(windowWidth, windowHeight);
  //
  createCanvas(minSide, minSide);

  particle = new Particle(10, height / 2, 100);

  drawPicture();

  buffer = createGraphics(width, height);
  buffer.background(bg);
  image(buffer, 0, 0, width, height);
  
  marker = createGraphics(width, height);
}

function drawPicture() {
  pixelDensity(1);
  loadPixels();

  let cx = width / 2;
  let cy = height / 2;

  //loop through each pixel
  for (var i = 0; i <= height; i++) {
    for (var j = 0; j <= width; j++) {
      //x is computed as a coordinate i one-hundredths across the square
      //so as j goes up value by value, one can think of point moving steadily up the picture.
      x = corna + i * (side / width);
      y = cornb + j * (side / height);
      //therefore resulting point (x, y) is somewhere within said square.
      c = floor(pow(x, 2) + pow(y, 2));

      let index = (i + j * width) * 4;

      if (c % 4 == 0) {
        pixels[index] = 255;
        pixels[index + 1] = 0;
        pixels[index + 2] = 0;
        pixels[index + 3] = 255;
      } else if (c % 4 == 1) {
        pixels[index] = 0;
        pixels[index + 1] = 255;
        pixels[index + 2] = 0;
        pixels[index + 3] = 255;
      } else if (c % 4 == 2) {
        pixels[index] = 0;
        pixels[index + 1] = 0;
        pixels[index + 2] = 255;
        pixels[index + 3] = 255;
      } else {
        pixels[index] = 255;
        pixels[index + 1] = 255;
        pixels[index + 2] = 255;
        pixels[index + 3] = 255;
      }
    }
  }

  updatePixels();
}

function draw() {
  marker.clear();
  
  if (frameCount % 3 == 0) {
    side += map(noise(start), 0, 1, -0.1, 0.1);
    drawPicture();
  }

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

  if (!isInvisible) {
    if (isErasorMode) {
      buffer.stroke(247);
      buffer.fill(247);
      buffer.noErase();
    } else {
      buffer.erase();
    }
    buffer.ellipse(particle.pos.x, particle.pos.y, particle.r);
  }

  image(buffer, 0, 0, width, height);

  marker.fill(0);
  let sw = constrain(particle.r / 5, 1, 10);
  marker.ellipse(particle.pos.x, particle.pos.y, sw);
  
  image(marker, 0, 0, width, height);

  start += step;
}

function keyPressed() {
  if (keyCode == 189) {
    particle.r = constrain(particle.r - 1, 5, 150);
  } else if (keyCode == 187) {
    particle.r = constrain(particle.r + 1, 5, 150);
  }

  if (keyCode == 83) {
    marker.clear();
    save("texture.png");
  }

  if (keyCode == 73) {
    isInvisible = !isInvisible;
  }
  
  if (keyCode == 69) {
    isErasorMode = !isErasorMode;
  }

  if (keyCode == 67) {
    buffer.background(bg);
  }
}
