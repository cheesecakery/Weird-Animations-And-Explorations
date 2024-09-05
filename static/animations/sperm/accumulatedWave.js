import { Wave } from './wave.js'

export class AccumulatedWave {
    constructor(n, sketch) {
        this.sketch = sketch;

        this.n = n;
        this.waves = [];
        this.createWaves();
    }

    createWaves() {
        for (let i = 0; i < this.n; i++) {
            this.waves.push(new Wave(
                this.sketch.random(100, 600),
                this.sketch.random(this.sketch.height/80, 5*this.sketch.height/80),
                this.sketch.random(100),
                this.sketch
            ));
        }
    }

    // Sums all wave positions
    evaluate(x) {
        return this.waves.reduce((a, b) => a + b.evaluate(x), 0);
    }

    update() {
        this.waves.map(update);
    }
}