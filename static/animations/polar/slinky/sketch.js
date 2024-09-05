let NO_OF_FLOWERS = 30;
let flowers = [];

function setup() {
  let parent = document.getElementById("slinky");
  let canvas = createCanvas(parent.offsetWidth, parent.offsetHeight);
  canvas.parent(parent);

  let minSide = min(width, height);
  let r = minSide * 0.4;
  
  for (let i = 0; i < NO_OF_FLOWERS; i++) {
    let x = width / 2;
    let y = height / 2 + (height / 20);
    
    let v = 500;
    
    let pace = random(2, 5);
    
    let flower = new Slink(x, y, v, r, pace);
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