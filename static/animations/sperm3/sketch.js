const NO_OF_WAVES = 7;
let waves = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  background(0);
  
  let step = height / NO_OF_WAVES;
  for (let i = 0; i < NO_OF_WAVES; i++) {
    let x = 0;
    let y = (i * step) + step/2;
    
    let r = height * 0.05 / NO_OF_WAVES;
    let d = 10;
    let l = width;
    
    let th = r / 100;
    
    let angleV = 0.25;
    angleV += random(-angleV/4, angleV/4);
    
    let wave = new Wave(x, y, r, d, l, th, angleV);
    waves.push(wave);
  }
}

function draw() {
  background(0, 20);
  
  for (let wave of waves) {
    wave.move();
    wave.draw();
  }
}