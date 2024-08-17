let corna = 0;
let cornb = 0;

let side = 100;
let start = 0;
let step = 0.01;

let moving = false;

function setup() {
  let minSide = min(windowWidth, windowHeight) - 10;
  createCanvas(minSide, minSide);
  console.log(width);
  background(255);

  drawPicture();
}

function drawPicture() {
  pixelDensity(1);
  // loads the value of each pixel 
  loadPixels();

  let cx = width / 2;
  let cy = height / 2;

  //loop through each pixel
  for (var i = 0; i <= height; i++) {
    for (var j = 0; j <= width; j++) {
      let d = dist(cx, cy, i, j);

      // if (d < width / 2) {
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
        }
      }
    // }
  }

  updatePixels();
  // save("texture.png");
}

function draw() {
  if (moving) {
    if (frameCount % 2 == 0) {
      // commented out, but all these affect the movement
      // corna += map(noise(start), 0, 1, -1, 1);
      // cornb += map(noise(1000 - start), 0, 1, -1, 1);
      side += map(noise(10000000 + start), 0, 1, -10, 10);
      drawPicture();
    }
  }

  start += step;

  rectMode(CENTER);
}

function mouseClicked() {
  moving = !moving;
}

function doubleClicked() {
  save("RGB.png");
}
