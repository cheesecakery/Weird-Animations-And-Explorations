export class Wave {
	constructor(period, amplitude, phase, sketch) {
		this.sketch = sketch;

		this.period = period;
		this.amplitude = amplitude;
		this.phase = phase;
	}
	
	// Figure out the y-position of the wave at this x coordinate
	evaluate(x) {
		return this.amplitude * this.sketch.sin((this.sketch.TWO_PI * x / this.period) + this.phase);
	}
  
	// Move the wave along
	update() {
		this.phase += 0.05;
	}
}