let NO_OF_FLOWERS = 10;
let circles = [];

function setup() {
  let parent = document.getElementById("iris");
  let canvas = createCanvas(parent.offsetWidth, parent.offsetHeight);
  canvas.parent(parent);

  let r = 0.1 * min(width, height);
  
  for (let i = 0; i < NO_OF_FLOWERS; i++) {
    let x = width / 2;
    let y = height / 2;
    
    let v = 500;
    
    let pace = random(2, 5);
    
    let circle = new Circle(x, y, v, r, pace);
    circles.push(circle);
  }
}

function draw() {
  background(0);
  
  for (let circle of circles) {
    circle.draw();
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