let img;

let NO_OF_PHOSPHENES = 1;
let phosphenes = [];

function preload() {
  img = loadImage("skies.jpeg");
}

function setup() {
  createCanvas(windowHeight, windowHeight);

  colorMode(HSB);
  image(img, 0, 0, width, height);

  for (let i = 0; i < NO_OF_PHOSPHENES; i++) {
    let x = width / 2;
    let y = height / 2;

    let l = 10;
    let r = 100;
    
    let n = 750;
    
    let phosphene = new Phosphene(x, y, l, r, n);
    phosphenes.push(phosphene);
  }
}

function draw() {
  image(img, 0, 0, width, height);

  for (let phosphene of phosphenes) {
    phosphene.draw();
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
