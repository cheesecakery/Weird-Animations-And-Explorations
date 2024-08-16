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

function midpointColour(colour1, colour2) {
  let colour3 = [];
  
  for (let i = 0; i < colour1.length; i++) {
    let midpoint = (colour1[i] + colour2[i]) / 2;
    colour3.push(midpoint);
  }
  
  return colour3;
}

function createText(text, colour, time) {
  let div = createDiv(text);
  
  div.style("font-size", '12px');
  div.style("color", colour);

  div.style("font-weight", "bold");
  div.style("font-family", "verdana");
  
  let x = 10;
  let y = height + 10;

  if (divs.length > 0) {
    y = divs[divs.length - 1].y + divs[divs.length - 1].height;
    
  }

  div.position(x, y);
  
  divs.push(div);

  // After 'time' seconds remove text 
  setTimeout(() => {
    let i = divs.indexOf(div);
    
    divs.splice(i, 1);
    div.remove();
  }, time * 1000);
}
