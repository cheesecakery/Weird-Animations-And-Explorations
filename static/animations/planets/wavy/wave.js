class Wave {
  constructor(period, amplitude, phase) {
    this.period = period;
    this.amplitude = amplitude;
    this.phase = phase;
  }
  
  evaluate(x) {
    return this.amplitude * sin((TWO_PI * x / this.period) + this.phase);
  }
  
  update() {
    this.phase += 0.05;
  }
}