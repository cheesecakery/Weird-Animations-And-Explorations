class Jelly {
  constructor(x, y, w, h, density) {
    this.density = density;

    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.rgb = [78, 239, 100, 85];
    
    this.duelMode = false;
    this.duelColour = [243, 128, 27, 85];
  }

  // Some of bubble in jelly
  contains(bubble) {  
    let difX = bubble.pos.x - this.x;
    let difY = bubble.pos.y - this.y;
    
    if (difX >= 0 && difX <= this.w && difY >= 0 && difY <= this.h) {
      return true;
    }

    return false;
  }

  // All of bubble in jelly
  wholly_contains(bubble) {
    let difX = bubble.pos.x - this.x;
    let difY = bubble.pos.y - this.y;

    if (difX - bubble.r >= 0 && difX + bubble.r <= this.w && difY - bubble.r >= 0 && difY + bubble.r <= this.h) {
      return true;
    }

    return false;
  }

  calculateDrag(vel) {
    let drag = vel.copy();
    drag.normalize();
    drag.mult(-1);

    let velSq = vel.magSq();
    drag.setMag(this.density * velSq);

    return drag;
  }

  draw() {
    if (this.duelMode) {
      stroke(this.duelColour);
      fill(this.duelColour);
    } else {
      stroke(this.rgb);
      fill(this.rgb);
    }

    rect(this.x, this.y, this.w, this.h);
  }
}