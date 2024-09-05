import { jarvis_march } from '../jarvis.js'
import { Circular } from './circular.js'

const bouncing = new p5((sketch) => {
	const NO_OF_PARTICLES = 20; 
	let particles = [];
	
	const G = 0.2;

	let showBalls = true; 

	sketch.setup = () => {
		// Create the canvas
		sketch.createCanvas(
            document.getElementById("bouncing").offsetWidth, 
            document.getElementById("bouncing").offsetHeight
        );
		sketch.background(220);

		// Create all the particles
		for (let i = 0; i < NO_OF_PARTICLES; i++) {
			particles.push(new Circular(
				sketch.random(sketch.width/4,3*sketch.width/4),
				sketch.random(0, sketch.height/2),
				sketch.width * 0.005,
				3,
				sketch
			));
		}
	}

	sketch.draw = () => {
		sketch.background(220);

		for (let particle of particles) {
			// Every 60 seconds give the particles an upward boost
			if (sketch.frameCount % 3600 == 0) {
				let upwardF = sketch.createVector(0, -2);
				particle.applyForce(upwardF);
			}

			// Let gravity and friction take its toll
			let gravity = sketch.createVector(0, G);
			let weight = p5.Vector.mult(gravity, particle.m);
			particle.applyForce(weight);
			particle.friction();
			particle.edges();
			particle.move();

			// Only draw if visible
			if (showBalls) {
				particle.update();
			}
		}

		// New shape created as particles move
		let shape = jarvis_march(sketch, particles);

		// Draw barrier around particles
		sketch.noFill();
		sketch.stroke(74, 73, 77);
		sketch.strokeWeight(2);

		sketch.beginShape();
		for (let particle of shape) {
			sketch.vertex(particle.pos.x, particle.pos.y);
		}
		sketch.endShape(sketch.CLOSE);
	}

	sketch.mouseClicked = () => {
		if (onCanvas(sketch.mouseX, sketch.mouseY)) {
			showBalls = !showBalls;
		}
	}

	function onCanvas(x, y) {
		if (x >= 0 && x <= sketch.width && y >= 0 && y <= sketch.height) {
			return true;
		}
		return false;
	}

}, 'bouncing');