class Spot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.pendulum = pendulum;
    this.spot = spot;
    
    this.start = random(100);
    this.step = 0.01;
  }
  
  move() {
    this.x += random(noise(this.start), 0, 1, -1, 1);
    this.y += random(noise(10000000 - this.start), 0, 1, -1, 1)
    
    this.start += this.step;
  }
}