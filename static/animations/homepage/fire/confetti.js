class Confetti extends Particle {
  constructor(x, y, m) {
    super(x, y, m);

    this.h = random(350, 370) % 360;
    this.s = random(65, 75);
    this.b = 40;

  }

  show() {
    tint(this.h, this.s, this.b, this.lifetime);
    imageMode(CENTER);
    image(texture, this.pos.x, this.pos.y, this.r, this.r);
  }
}
