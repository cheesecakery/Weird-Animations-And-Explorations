export class Wave {
	constructor(period, amplitude, phase, sketch) {
		this.period = period;
		this.amplitude = amplitude;
		this.phase = phase;

		this.sketch = sketch;
	}

	evaluate(x) {
		return this.amplitude * this.sketch.sin((this.sketch.TWO_PI * x) / this.period + this.phase);
	}

	update() {
		this.phase += 0.05;
	}
}
