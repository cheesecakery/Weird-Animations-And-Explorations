import { Triangular } from '../triangular.js'
import { jarvis_march } from '../jarvis.js'

const mutatr = new p5((sketch) => {
	const NO_OF_PARTICLES = 15;
	let particles = [];

	const G = 5;
	const SIZE = 3;

	let showArrows = true; 

	let shape = [];

	sketch.setup = () => {
		// Create the canvas
		sketch.createCanvas(
			document.getElementById("mutatr").offsetWidth, 
			document.getElementById("mutatr").offsetHeight
		);
		sketch.background(74, 73, 77);

		let spawnRadius = sketch.width / 4;
	
		// Create all the particles
		for (let i = 0; i < NO_OF_PARTICLES; i++) {
			// Create the position of each particle in a radius of r around the centre
			let pos = sketch.createVector(
				sketch.random(sketch.width / 2 - spawnRadius, sketch.width / 2 + spawnRadius),
				sketch.random(sketch.height / 2 - spawnRadius, sketch.height / 2 + spawnRadius)
			);
			// Let the velocity of the particle be perpendicular to its position
			let vel = pos.copy().sub(sketch.createVector(sketch.width / 2, sketch.height / 2));
			vel.normalize();
			vel.rotate(sketch.PI / 2);
	
			particles.push(new Triangular(
				pos.x,
				pos.y,
				vel.x, 
				vel.y,
				2,
				SIZE,
				G,
				sketch
			));
		}
	
		// Create the shape around the particle
		shape = jarvis_march(sketch, particles);
	}

	sketch.draw = () => {
		sketch.background(74, 73, 77);
	  
		// Let each particle attract one another
		for (let particle of particles) {
		  for (let other of particles) {
			if (other != particle) {
			  particle.attract(other);
			}
		  }
		  
		  particle.move();
		  particle.edges();
	  
		  // Draw only if particles are visible
		  if (showArrows) {
			particle.update();
		  }
		}

		// Updates depending on positions of spots
		shape = jarvis_march(sketch, particles);
	  
		// Draw the shape around the particles
		sketch.noFill();
		sketch.stroke(255);
		sketch.strokeWeight(0.5);
		sketch.beginShape();
		for (let particle of shape) {
		  sketch.vertex(particle.pos.x, particle.pos.y);
		}
		sketch.endShape(sketch.CLOSE);
	}

	// Toggle visibility of arrows !
	sketch.mouseClicked = () => {
		if (onCanvas(sketch.mouseX, sketch.mouseY)) {
			showArrows = !showArrows;
		}
	}

	function onCanvas(x, y) {
		if (x >= 0 && x <= sketch.width && y >= 0 && y <= sketch.height) {
			return true;
		}
		return false;
	}
	
}, 'mutatr');
