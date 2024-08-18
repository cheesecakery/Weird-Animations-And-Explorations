let NO_OF_FLOWERS = 3;
let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  let step = 2 * PI / NO_OF_FLOWERS;
  
  for (let i = 0; i < NO_OF_FLOWERS; i++) {
    let x = width / 2;
    let y = height / 2;
    
    let v = 1000;
    let r = 100;
    
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