class Planet {
  constructor(x, r, img) {
    this.x = x;
    
    this.r = r;
    this.img = img;
    
    this.tint = 1;
  }

  display() {
    image(img, this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }
}