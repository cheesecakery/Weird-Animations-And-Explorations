let startRule = 30;
let ruleSet;

let palettes = [];
let palette = [];

let cells = [];
let w = 5;

let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight * 1.5);
  background(255);
  
  let number = floor(width / w);
  
  setRules(startRule);
  
  palette1 = [
    color(95, 15, 64),
    color(251, 139, 36),
    color(227,100,20),
    color(154, 3, 30)
  ]
  
  palette2 = [
    color(0, 13, 18),
    color(0, 63, 92),
    color(44, 72, 121),
    color(138, 80, 143),
    color(188, 80, 144),
    color(255, 99, 97),
    color(255, 133, 49),
    color(255, 166, 0),
    color(255, 211, 128)
  ]
  
  palettes = [palette1, palette2];
  
  palette = palette2;
  
  for (let i = 0; i < number; i++) {
    // make the cell a random colour
    cells[i] = random(palette);
  }
  
  // cells[floor(number / 2)] = 1;
}

function setRules(rule) {
  ruleSet = rule.toString(2).padStart(8, '0')
}

function draw() {
  noStroke();
  for (let i = 0; i < cells.length; i++) {
    let x = i * w;
    fill(cells[i]);
    square(x, y, w);
  }
  y += w;
  
  if (y > height) {
    background(0);
    y = 0;
    setRules(floor(random(256)));
    palette = random(palettes);
  }
  
  let nextCells = [];
  let len = cells.length;
  for (let i = 0; i < len; i++) {
    let leftCol = cells[(i - 1 + len) % len];
    let rightCol = cells[(i + 1 + len) % len];
    let stateCol = cells[i];

    let left = brightness(leftCol) > 40 ? 1 : 0;
    let right = brightness(rightCol) > 40 ? 1 : 0;
    let state = brightness(stateCol) > 40 ? 1 : 0;
    
    let newState = calculateState(left, state, right);
    
    if (newState == 0) {
      nextCells[i] = color(0);
    } else {
      let options = [];
      if (left == 1) options.push(leftCol);
      if (right == 1) options.push(rightCol);
      if (state == 1) options.push(stateCol);
      
      if (options.length < 1) nextCells[i] = random(palette);
      else nextCells[i] = random(options);
    }
  }
  
  cells = nextCells;
}

// Takes cells a, b, c in, calculates state of b
function calculateState(a, b, c) {
  let chunk = "" + a + b + c;
  let value = 7 - parseInt(chunk, 2);
  return parseInt(ruleSet[value]);
}