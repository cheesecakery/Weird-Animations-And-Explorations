// Makes a random colour.
export function randomColour(sketch) {
  let rgb = [];
  for (let i = 0; i < 3; i++) {
    rgb.push(sketch.floor(sketch.random(255)));
  }

  return rgb;
}

// Generates the midpoint colour of two colours.
export function midpointColour(colA, colB) {
  let colour = [];
      
  for (let i = 0; i < colA.length; i++) {
      colour.push((colA[i] + colB[i]) / 2);
  }
      
  return colour;
}

// Creates text on bottom of the screen.
export function createText(text, colour, seconds, sketch) {
  // Make a div and add correct styling attributes
  let div = sketch.createDiv(text);
  
  div.style("font-size", '15px');
  div.style("color", colour);

  div.style("font-weight", "bold");
  div.style("font-family", "verdana");

  let y = document.getElementById("attractor").offsetTop + sketch.height + 10;

  // Check where it should lie on the screen
  if (sketch.divs.length > 0) {
    y = sketch.divs[sketch.divs.length - 1].y + sketch.divs[sketch.divs.length - 1].height;
  }

  // Position it at this point.
  div.position(10, y);
  sketch.divs.push(div);

  // After allotted time, remove text.
  setTimeout(() => {
    let i = sketch.divs.indexOf(div);
    sketch.divs.splice(i, 1);
    div.remove();
  }, seconds * 1000);
}