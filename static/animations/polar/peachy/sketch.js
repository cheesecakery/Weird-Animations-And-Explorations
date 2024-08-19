let NO_OF_FLOWERS = 3;
let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let minSide = min(width, height);
  
  let step = 2 * PI / NO_OF_FLOWERS;
  let r = minSide * 0.2;
  
  for (let i = 0; i < NO_OF_FLOWERS; i++) {
    let x = width / 2;
    let y = height / 2;
    
    let v = 1000;

    let pace = 15;
    let strt = step * i;
    
    let flower = new Peach(x, y, v, r, pace, strt);
    flowers.push(flower);
  }
}

function draw() {
  background(0);
  
  for (let flower of flowers) {
    flower.draw();
  }
}

function randColour(min, max) {
  var r;
  var g;
  var b;

  var rgb = [r, g, b];
  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = floor(random(min, max));
  }

  return rgb;
}