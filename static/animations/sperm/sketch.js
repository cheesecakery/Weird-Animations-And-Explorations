let sperm;
let sperms = [];

const NO_OF_SPIRALS = 5;
let spirals = [];

const NO_OF_WAVES = 4;
let waves = [];

let gameStarted = false;

let sperm_heights;

let startX = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(0);

  colorMode(HSB);

  sperm_heights = [
    height / 2,
    height / 2 + ((1 / 3) * height) / 2,
    height / 2 + ((2 / 3) * height) / 2,
    ((1 / 3) * height) / 2,
    ((2 / 3) * height) / 2,
  ];

  createSperm();

  let offset = -200;
  egg = new Egg(width + offset, height / 2, 200);

  for (let i = 0; i < NO_OF_WAVES; i++) {
    let wave = new Wave(random(100, 600), random(10, 20), random(100));
    waves.push(wave);
  }

  createSpirals();
}

function createSperm() {
  let x = startX;
  let y = sperm_heights[sperms.length];

  let m = 0.5;
  let d = 10;
  let l = 10;

  let th = 0.05;

  let angleV = 0.1;
  angleV += random(-angleV / 2, angleV * 4);

  sperm = new Sperm(x, y, m, d, l, th, angleV);
  sperms.push(sperm);
}

function createSpirals() {
  let v = p5.Vector.sub(egg.pos, sperm.pos);
  let dist = v.mag() - egg.r - 25;
  let step = dist / NO_OF_SPIRALS;

  let angle = v.heading();

  for (let x = startX + 50; x < dist; x += step) {
    let y = x * sin(angle);
    for (let wave of waves) {
      y += wave.evaluate(x);
    }

    y += sperm.pos.y;

    let r = 5;
    let l = 5;

    let n = 100;

    let vel = 0.01;

    let spiral = new Spiral(x, y, r, l, n, vel);
    spirals.push(spiral);
  }
}

function draw() {
  background(0, 0.1);

  // Movement
  if (keyIsPressed) {
    if (!gameStarted) {
      gameStarted = true;
    }

    if (!sperm.inEgg) {
      if (keyCode == UP_ARROW) {
        let force = createVector(0, -0.01);
        sperm.applyForce(force);
      } else if (keyCode == DOWN_ARROW) {
        let force = createVector(0, 0.01);
        sperm.applyForce(force);
      }
    }
  }

  // Draw egg
  egg.draw();

  // Eating food
  for (let spiral of spirals) {
    spiral.draw();

    if (sperm.contain(spiral)) {
      sperm.eat(spiral);
    }
  }

  // Draw sperm
  for (sperm of sperms) {
    if (sperm.inEgg) {
      sperm.settle();
    } else {
      sperm.wrap();
    }
    if (gameStarted) {
      sperm.move();
    }
    sperm.draw();
  }

  // Code for if egg contains spiral !!
  if (egg.cracked == false) {
    if (egg.contain(sperm)) {
      egg.inc += 0.5;
      sperm.stopMoving();

      spirals = [];

      if (sperms.length == 3) {
        egg.cracked = true;

        setTimeout(() => {
          egg.crack();
        }, 2500);
      } else {
        for (let wave of waves) {
          wave.update();
        }

        createSperm();
        createSpirals();
      }
    }
  }
}
