let corna = 0;
let cornb = 0;
let side = 100;

let start = 0;
let step = 0.01;

let G = 0.2;

let r = 25;

let buffer;

let x = -1;
let y = -1;

let px = -1;
let py = -1;

let easing = 0.09;

function setup() {
  let parent = document.getElementById("drag");
  let canvas = createCanvas(parent.offsetHeight, parent.offsetHeight);
  canvas.parent(parent);

  drawPicture();

  buffer = createGraphics(width, height);
  buffer.background(247);
  image(buffer, 0, 0, width, height);
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
      let x = corna + i * (side / width);
      let y = cornb + j * (side / height);
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
  side += map(noise(start), 0, 1, -0.01, 0.01);
  drawPicture();
  
  if (mouseIsPressed) {
    if (x == -1 && y == -1) {
      x = mouseX;
      y = mouseY;
      
      px = mouseX;
      py = mouseY;
    }
    
    let targetX = mouseX;
    let targetY = mouseY;
    
    x += (targetX - x) * easing;
    y += (targetY - y) * easing;
    
    let weight = dist(x, y, px, py);
    buffer.erase();
    buffer.strokeWeight(weight);
    buffer.line(x, y, px, py);
    
    py = y;
    px = x;
  }

  image(buffer, 0, 0, width, height);

  start += step;
}
