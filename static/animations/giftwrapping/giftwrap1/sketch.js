import { Spot } from './spot.js'
import { Pendulum } from './pendulum.js'
import { jarvis_march } from '../jarvis.js'

const giftwrap1 = new p5((sketch) => {
	let shape = [];

	const G = 1;
	
	let headR;
	let centre;

	sketch.setup = () => {
		sketch.createCanvas(
			document.getElementById("giftwrap1").offsetWidth, 
			document.getElementById("giftwrap1").offsetHeight
		);

		// Scale head size + 'radius' of convex shape based on width of div.
		let r = 0.2 * sketch.width;
		headR = 0.04 * sketch.width; 

		// Create a central point about 50 units from the left and halfway through the height.
		centre = sketch.createVector(50 + r, sketch.height / 2);

		// More likely to have a smaller shape (less spots)
		let n;
		if (sketch.random() < 0.7) {
			n = sketch.floor(sketch.random(5, 10));
		} else {
			n = sketch.floor(sketch.random(10, 100));
		}

		let spots = createSpots(n, r);
		shape = jarvis_march(sketch, spots);
	}

	function createSpots(n, r) {
		let spots = [];
		// Create all the points
		for (let i = 0; i < n; i++) {
			// x coordinate is placed anywhere within 'r' distance of centre point 
			// y coordinate is again placed anywhere within 'r' from centre point 
			spots.push(new Spot(
				sketch.random(50, 50 + 2 * r),
				sketch.random(sketch.height / 2 - r, sketch.height / 2 + r),
				sketch
			));
		}
		return spots;
	}

	sketch.draw = () => {
		sketch.background(220);

		moveBody();
		drawLimbs(shape);
		drawShape(shape);
	}

	function drawLimbs(shape) {
		sketch.fill(0);
		for (let spot of shape) {
			sketch.ellipse(spot.pos.x, spot.pos.y, 5);

			// If there is a pendulum, draw & move the pendulum
			if (spot.pendulum) {
				spot.pendulum.evaluate();
				spot.pendulum.move();
				spot.pendulum.draw();
			} else if (spot.head) {
				sketch.noFill();
				sketch.ellipse(spot.head.x, spot.head.y, headR * 2);
			}
		}
	}

	function drawShape(shape) {
		sketch.noFill();
		sketch.stroke(74, 73, 77);
		sketch.strokeWeight(3);
		sketch.beginShape();
		for (let spot of shape) {
			sketch.vertex(spot.pos.x, spot.pos.y);
		}
		sketch.endShape(sketch.CLOSE);
	}

	function moveBody() {
		// Move the body wavily
		if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
			// Move each spot together
			for (let spot of shape) {
				spot.moveLeft();
			}
		}
		if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
			for (let spot of shape) {
				spot.moveRight();
			}
		}
	}

	sketch.mouseClicked = () => {
		// Check which spot has been touched
		for (let spot of shape) {
			let dist = sketch.createVector(sketch.mouseX - spot.pos.x, sketch.mouseY - spot.pos.y);
			// If mouse touched the spot, toggle each attribute
			if (dist.mag() < 10) {
				// If the attribute is a pendulum, switch to a head.
				if (spot.pendulum) {
					// Set there to be no pendulum
					spot.pendulum = undefined;
					
					// Create a head 
					let dir = sketch.createVector(spot.pos.x - centre.x, spot.pos.y - centre.y);
					// Set magnitude to be the radius of the head
					dir.setMag(headR);
					// Set the head to be this coordinate.
					spot.head = p5.Vector.add(spot.pos, dir);

				// If it is a head, switch to nothing.
				} else if (spot.head) {
					spot.head = null;
				
				// If it is nothing, attach a leg to the point
				} else {
					// Set angle to be a random one between 0 and PI/3.
					let angle = sketch.random(sketch.PI / 3);
			
					// Pick the two leg lengths randomly
					let r1 = sketch.random(0.070*sketch.width, 0.1*sketch.width);
					let r2 = sketch.random(0.1*sketch.width, 0.15*sketch.width);

					// Create the new pendulum with these attributes
					spot.pendulum = new Pendulum(
						spot.pos,
						10,
						10,
						r1,
						r2,
						angle,
						-angle,
						G,
						sketch
					);
				}
			}
		}
	}
}, 'giftwrap1');