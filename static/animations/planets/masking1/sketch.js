const masking1 = new p5((sketch) => {
	let night;

	let r;
	let maxD;

  	let bluePlanetImg;
  	let shadingImg;

	let parent_id = "masking1";
	let parent;
	sketch.animate = false;

	document.getElementById("planets").addEventListener('slid.bs.carousel', function(event) {
		let planet_id = event.target.querySelector('.active').id;
		if (planet_id == parent_id) {
			setupSketch();
			sketch.animate = true; 
		} else {
			sketch.animate = false;
		}
	});

	sketch.preload = () => {
		let root = "/static/animations/planets/images/"
		night = sketch.loadImage(root+"night.jpg");
		bluePlanetImg = sketch.loadImage(root+"blue_planet_no_shade.png");
		shadingImg = sketch.loadImage(root+"shading.png");
	}
	
	sketch.setup = () => {
		sketch.createCanvas(0, 0);
	}

	function setupSketch() {
		if (!sketch.animate) {
			parent = document.getElementById(parent_id);
			sketch.createCanvas(
				parent.offsetWidth,
				parent.offsetHeight,
			);
	
			// Scale elements based on size of window
			let scale = sketch.min(sketch.width, sketch.height);
			r = 0.1 * scale;
			maxD = sketch.dist(0, 0, sketch.width / 2, sketch.height / 2);
	
			drawNight();
		}
	}

	sketch.draw = () => {
		if (sketch.animate) {
			drawNight();

			// Draw the sun cursor
			// sketch.stroke(255, 200, 0);
			sketch.fill(255, 200, 0);
			sketch.ellipse(sketch.mouseX, sketch.mouseY, 20);
	
			// Draw the planet
			sketch.push();
				sketch.translate(sketch.width / 2, sketch.height / 2);
				sketch.imageMode(sketch.CENTER);
	
				// Make the mask only have an effect when cursor is outside of planet
				let d = sketch.createVector(sketch.width / 2 - sketch.mouseX, sketch.height / 2 - sketch.mouseY);
				let mask = 150;
				if (d.mag() > r) {
					mask = sketch.map(d.mag(), 0, maxD, 150, 0);
				}
	
				// Find the direction the light from the sun is coming from
				let angle = sketch.atan2(d.x, d.y);
				sketch.push();
					// Rotate the mask based on this angle
					sketch.rotate(-angle + sketch.PI / 3);
					sketch.image(shadingImg, 0, 0, r*2, r*2);
				sketch.pop();
	
				// Draw the planet on top of the mask
				sketch.blendMode(sketch.BURN);
				sketch.image(bluePlanetImg, 0, 0, r*2, r*2);
				// Blend mode is so that the shadows aren't so drastic
				sketch.blendMode(sketch.BLEND);
				// Tint based on how far from the sun the planet is
				sketch.tint(255, mask);
				sketch.image(bluePlanetImg, 0, 0, r*2, r*2);
			sketch.pop();
		}
	}

	function drawNight() {
		// Draw night sky
		sketch.image(
			night,
			0,
			0,
			sketch.width,
			sketch.height,
			0,
			0,
			night.width,
			night.height,
			sketch.COVER
		);
	}
}, 'masking1');