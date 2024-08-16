// Check if touching eye of attractor, if so that attractor has the power of movement!!
function checkForMovement(attractor) {
  let dist = createVector(attractor.pos.x - mouseX, attractor.pos.y - mouseY);
  // If distance is smaller than radius of circle, they are touching
  if (dist.mag() <= attractor.r) {
    if (attractor_move) {
      if (attractor == attractor_cursor) {
        return;
      }
    }

    attractor_move = true;
    attractor_cursor = attractor;

    let col = color(attractor.rgb);

    createText("attractor is on the go", col, 1.5);
  }
}