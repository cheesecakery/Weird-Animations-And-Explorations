import { Wave } from './wave.js'

const sperm3 = new p5((sketch) => {
	let N;
	let sperms = [];

	let animated = true;

	let parent;

	sketch.windowResized = () => {
		// If div disappears (sperm game appearing instead), stop the gameplay
		if (parent.offsetWidth == 0) {
			animated = false;
		} else {
			animated = true;

			// If changed size considerably, reset animation
			let dif = sketch.createVector(
				sketch.width - parent.offsetWidth,
				sketch.height - parent.offsetHeight
			);
			
			if (sketch.abs(dif.y) > 10) {
				sketch.resizeCanvas(
					parent.offsetWidth, 
					parent.offsetHeight
				);
				sperms = createSperm();
			} 
		}
	}

	sketch.setup = () => {
		parent = document.getElementById("sperm3");
		// Creates canvas size of the div
		sketch.createCanvas(
			parent.offsetWidth, 
			parent.offsetHeight
		);

		sketch.background(0);

		sperms = createSperm();
	}

	function createSperm() {
		sperms = [];

		N = sketch.floor(sketch.height / 60);
		let step = sketch.height / N;
		for (let i = 0; i < N; i++) {
			sperms.push(new Wave(
				sketch.createVector(0, i*step+step/2), // pos
				sketch.height * 0.01, // radius
				10, // diameter of wiggly bits
				sketch.width, // length
				0.2 + sketch.random(-0.2, 0.2), // erraticness / speed
				sketch
			));
		}

		return sperms;
	}

	sketch.draw = () => {
		sketch.background(0, 25);

		for (let sperm of sperms) {
			sperm.move();
			sperm.draw();
		}
	}
}, 'sperm3');