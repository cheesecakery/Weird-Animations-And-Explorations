let emitter;

let texture;

function preload() {
  texture = loadImage("fire.png");
}

function setup() {
  createCanvas(400, 400);
  
  colorMode(HSB);

  emitter = new Emitter(width / 2, height/2);
}

function draw() {
  clear();
  background(0);
  blendMode(ADD);

  strokeWeight(2);
  
//   let force = createVector(0, -0.1);
//   emitter.applyForce(force);
  
  let dir = createVector(mouseX - width/2, mouseY - height/2);
  dir.setMag(0.15);

  emitter.applyForce(dir);  
  emitter.emit(1);
  emitter.update();
  emitter.show();
}
