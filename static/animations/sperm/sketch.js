import { AccumulatedWave } from "./accumulatedWave.js";
import { Sperm } from "./sperm.js";
import { Spiral } from "./spiral.js";
import { Egg } from "./egg.js";

const spermGame = new p5((sketch) => {
	// max number of sperm
	const MAX = 3;

	// current sperm
	let sperm;
	// array of all sperms so far
	let sperms = [];

	let egg;

	const nSpiral = 5; 

	let gameStarted = false;
	sketch.gameEnded = false;
	let eggCracked = false;

	let parent;
	let paused = true;
	let resizing = false;

	sketch.windowResized = () => {
		// If div disappears, pause the game.
		if (parent.offsetHeight == 0) {
			paused = true;
		// Else if reappears, start the game again!
		} else if (paused && !resizing) {
			resizing = true;
			// Set a timeout so that user will finish resizing
			setTimeout(() => {
				startGame();
				resizing = false;
			}, 1000);
		}
	}

	sketch.setup = () => {
		sketch.createCanvas(0, 0);
		parent = document.getElementById("sperm");

		// Only start game if div in view.
		if (parent.offsetWidth > 0) {
			startGame();
		}
	}

	function startGame() {
		console.log('sup!');
		sperms = [];

        // Creates canvas size of the div
        sketch.resizeCanvas(
            parent.offsetWidth, 
            parent.offsetHeight
        );

        // Make background a grey-ish colour
        sketch.background(0);
		sketch.colorMode(sketch.HSB);

		// Create the egg
		egg = new Egg(
			sketch.width - 200,
			sketch.height / 2,
			200,
			sketch
		);

		// Create the first sperm
		createSperm();
		// Create the first set of spirals !
		sketch.spirals = createSpirals();

		paused = false;
	}

	function createSperm() {
		sperm = new Sperm(
			sketch.createVector(50, (sperms.length + 1) * sketch.height / 5), // pos
			0.5, // mass
			10, // length
			0.1 + sketch.random(-0.05, 0.4), // angle (erraticness of movement)
			sketch
		);
		sperms.push(sperm);
	}

	function createSpirals() {
		let spirals = [];
		// Calculate how far each spiral should be from one another
		let v = p5.Vector.sub(egg.pos, sperm.pos);
		let dist = v.mag() - egg.r;
		let step = dist / (nSpiral);

		// Create positioning of each food
		let wave = new AccumulatedWave(4, sketch);

		// What direction the spirals should align with
		let angle = v.heading();

		// Create all the food (equally spaced from sperm to egg)
		for (let x = sperm.pos.x + step; x < dist; x += step) {
			let y = x*sketch.sin(angle) + wave.evaluate(x) + sperm.pos.y;
			spirals.push(new Spiral(
				x,
				y,
				5,
				5,
				100,
				0.01,
				sketch
			));
		}
		return spirals;
	}

	sketch.draw = () => {
		if (!paused) {
			sketch.background(0, 0.1);

			userMovement();
	
			if (sketch.gameEnded) {
				endText();
			} else if (gameStarted) {
				midGame();
			}
	
			// Draw all objects
			egg.draw();
			for (let spiral of sketch.spirals) { spiral.draw(); }
			for (let sperm of sperms) { sperm.draw(); }
		}
	}

	function midGame() {
		// If egg cracked, let centre sperm move toward the centre.
		if (eggCracked) {
			if (!sperm.wait) {
				sperm.settle(egg);
			}
		} else {
			sperm.move();
			sperm.wrap();

			for (let spiral of sketch.spirals) {
				// Let the sperm eat the spiral
				if (sperm.contain(spiral)) {
					sperm.eat(spiral);
				}
			}

			// If the sperm latches onto the egg
			if (egg.contain(sperm)) {
				// Makes appearance of egg shakier (as though sperm is breaking it)
				egg.inc += 0.5;
				
				sperm.stopMoving();

				// If reached the max number of sperms, end the game
				if (sperms.length == MAX) {
					eggCracked = true;
					// Pause a bit, then the sperm will swim toward the middle of the egg.
					setTimeout(() => {
						sketch.spirals = [];
						sperm.wait = false;
						egg.crack();
					}, 2500);
				} else {
					// Move to a new sperm & create new food.
					createSperm();
					sketch.spirals = createSpirals();
				}
			}
		}
	}

	function userMovement() {
		if (sketch.keyIsPressed && !eggCracked) {
			// Start the game when player moves up or down
			if ((sketch.keyCode == sketch.UP_ARROW || sketch.keyCode == sketch.DOWN_ARROW)
				&& gameStarted == false) {
				gameStarted = true;
				// Give a little starting boost
				sperm.applyForce(sketch.createVector(0.2, 0));
			}

			// Move up and down
			if (sketch.keyCode == sketch.UP_ARROW) {
				let force = sketch.createVector(0, -0.01);
				sperm.applyForce(force);
			} else if (sketch.keyCode == sketch.DOWN_ARROW) {
				let force = sketch.createVector(0, 0.01);
				sperm.applyForce(force);
			}
		}
	}

	function endText() {
		// Create div with text
		let div = sketch.createDiv("the game is over, i think");

		// Make it shake a lil
		let t = sketch.frameCount;
		let offX = sketch.map(sketch.noise(t), 0, 1, -0.5,  0.5);
		let offY = sketch.map(sketch.noise(100000+t), 0, 1, -0.5, 0.5);

		// Style the div
		div.style("font-size", '15px');
		div.style("color", "rgba(255, 255, 255, 0.05)");
		div.style("font-weight", "50");
		div.style("font-family", "Times New Roman");

		// Position on bottom left of canvas
		div.position(
			document.getElementById("sperm").offsetLeft + 10 + offX,
			document.getElementById("sperm").offsetTop + sketch.height - 30 + offY
		);

		// Remove div after a bit of time
		setTimeout(() => {
			div.remove();
		}, 5000 / sketch.frameRate());
	}

}, 'sperm');
