const R = 300;

let start = 0;
let startV = 0.01;

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0);
}

function draw() {
  background(0, 10);
  translate(width / 2, height / 2);

  noFill();
  strokeWeight(0.5);
  stroke(255);

  let n = map(sin(0.5*start), -1, 1, 1, 5);

  let step = TWO_PI / n;
  for (let i = 0; i < n; i++) {
    let v = createVector(0, R);
    v.rotate(step * (i + 1));
    vertex(v.x, v.y);
    let w = v.copy();
    w.rotate(step);
    
    push();
    rotate(start);
    rect(0, 0, w.x, w.y);
    pop();
  }
  
  start += startV;
}
