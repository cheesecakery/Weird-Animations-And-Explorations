import { Planet } from './planet.js'
import { Wave } from './wave.js'

const wavy = new p5((sketch) => {
	const nWaves = 5;
	sketch.waves = [];

	const nPlanets = 3;
	let planets = [];
	let planetImgs;

	let night;

	let parent_id = "wavy";
	let parent;
	sketch.animate = false;

	sketch.preload = () => {
		let root = "/static/animations/planets/images/"
		night = sketch.loadImage(root+"night.jpg");
    	sketch.shading = sketch.loadImage(root+"shading.png");
    	let blue = sketch.loadImage(root+"blue_planet_no_shade.png");
		let grassy = sketch.loadImage(root+"grassy_planet_no_shade.png");
    	let magnet = sketch.loadImage(root+"magnet_planet_no_shade.png");
	  
		planetImgs = [magnet, grassy, blue];
	}
	
	sketch.setup = () => {
		sketch.createCanvas(0, 0);
	}

	document.getElementById("planets").addEventListener('slid.bs.carousel', function(event) {
		let planet_id = event.target.querySelector('.active').id;
		if (planet_id == parent_id) {
			setupSketch();
			sketch.animate = true; 
		} else {
			sketch.animate = false;
		}
	});

	function setupSketch() {
		if (!sketch.animate) {
			parent = document.getElementById(parent_id);
			sketch.createCanvas(
				parent.offsetWidth,
				parent.offsetHeight,
			);
	
			// Sets the maximum distance a mouse could be from a planet
			sketch.maxD = sketch.pow(sketch.dist(0, 0, sketch.width, sketch.height), 1.8);
	
			createWaves();
			createPlanets();
	
			drawNight();
		}
	}

	sketch.draw = () => {
		if (sketch.animate) {
			drawNight();

			// update the position of the wave
			for (let wave of sketch.waves) {
				wave.update();
			}
	
			// draw the sun cursor
			sketch.fill(255, 200, 0);
			sketch.ellipse(sketch.mouseX, sketch.mouseY, 20);
	
			for (let planet of planets) {
				planet.move();
				planet.draw();
			}
		}
	}

  	function createWaves() {
		for (let i = 0; i < nWaves; i++) {
			sketch.waves.push(new Wave(
				sketch.random(50, 400),	
				sketch.random(20, 40),
				sketch.random(100),
				sketch
			));
		}
  	}

  	function createPlanets() {
		let step = sketch.width / nPlanets;

		// Create all the planets with properties: radius, x coordinate and image.
		for (let i = 0; i < nPlanets; i++) {
			planets.push(new Planet(
				step * (i + 0.5),
				sketch.pow(i + 1, 1.1) * step * 0.05,  
				planetImgs[i % planetImgs.length], 
				sketch
			))
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
}, 'wavy');