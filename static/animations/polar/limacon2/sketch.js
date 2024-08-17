let NO_OF_DISCS = 1;
let discs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  
  for (let i = 0; i < NO_OF_DISCS; i++) {
    let r = 100;
    let l = 50;
    let n = 300;
    
    let disc = new Disc(width / 2, height / 2, r, l, n);
    discs.push(disc);
  }
}

function draw() { 
  background(0, 90);
  
  for (let disc of discs) {
    disc.move();
    disc.draw();
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