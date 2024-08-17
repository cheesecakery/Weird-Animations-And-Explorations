const G = 0.05;

let buffer;

let clumps = [];
const NO_OF_CLUMPS = 5;

let particle;

let cx;
let cy;

function setup() {
  colorMode(HSB);
  
  createCanvas(windowHeight, windowHeight);
  background(0);

  let centre = createVector(width / 2, height / 2);

  let step = TWO_PI / NO_OF_CLUMPS;
  
  particle = new Particle(centre.x, centre.y);

  for (let i = 0; i < NO_OF_CLUMPS; i++) {
    let angle = step * i;

    let pos = createVector(0, 1);
    pos.rotate(angle);

    pos.add(centre);
    
    let n = 100;

    let clump = new Clump(particle, n, angle);
    clumps.push(clump);
  }
}

function draw() {
  background(0);
  
  particle.update();
  
  for (let clump of clumps) {
    clump.draw();
  }
}

function keyPressed() {
  if (keyCode == 83) {
    save("aaahhh.png");
  }
}
