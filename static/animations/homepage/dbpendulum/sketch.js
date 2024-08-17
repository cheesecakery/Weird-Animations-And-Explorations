const G = 1;

let buffer;

let pendulums = [];
const NO_OF_PENDULUMS = 10;

let cx;
let cy;

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0);

  cx = width / 2;
  cy = height / 2;

  let step = (PI / 2) * NO_OF_PENDULUMS;
  for (let i = 0; i < NO_OF_PENDULUMS; i++) {
    let x = cx;
    let y = cy;

    let m1 = 10;
    let m2 = 10;

    let r1 = 75;
    let r2 = 100;

    let a1 = i * step;
    let a2 = -a1;

    pendulum = new Pendulum(x, y, m1, m2, r1, r2, a1, a2);
    pendulums.push(pendulum);
  }

  buffer = createGraphics(width, height);
  buffer.background(0);
  buffer.translate(cx, cy);
}

function draw() {
  background(0);
  
  fill(255);
  stroke(255);

  image(buffer, 0, 0, width, height);

  for (let pendulum of pendulums) {
    pendulum.evaluate();
    pendulum.move();
    pendulum.draw();
  }
}
