import { Planet } from '../planet.js'
import { Sun } from '../sun.js'

const planetsmoving = new p5((sketch) => {
	const N = 2;

	let sun;
	let night;

	let planets = [];
	let planetImgs = [];

	sketch.SIZE = 15;
	sketch.G = 2;

	let parent_id = "planetsmoving";
	let parent;
	sketch.animate = false;

	let img_names = ['blue_planet', 'grassy',
	'earth_planet', 'meteor', 'black_planet', 'crystal_planet',
	'desert_planet', 'green_planet', 'magnet_planet', 'moon_planet', 
	'purple_planet', 'red_planet', 'turq_planet', 'wood_planet'
	]

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
		sketch.sunImg = sketch.loadImage(root+"sun2.png");
		sketch.shading = sketch.loadImage(root+"shading2.png");

		let blue = sketch.loadImage(root+"blue_planet_no_shade.png");
		let grassy = sketch.loadImage(root+"grassy_planet_no_shade.png");
		
		planetImgs = [blue, grassy];
	}
	
	sketch.setup = () => {
		sketch.createCanvas(0, 0);
		setupSketch();
		sketch.animate = true;
	}

	function setupSketch() {
		if (!sketch.animate) {
			planets = [];
			parent = document.getElementById(parent_id);
			sketch.resizeCanvas(
				parent.offsetWidth,
				parent.offsetHeight,
			);
	
			let scale = sketch.min(sketch.width, sketch.height);
	
			sun = new Sun(0, 0, 0.1*scale, sketch);
	
			createPlanets(scale);
	
			drawNight();
		}
	}

	sketch.draw = () => {
		if (sketch.animate) {
			drawNight();

			// Move planets
			for (let planet of planets) {
				sun.attract(planet);
				sun.touches(planet);
				planet.move();
			}
	
			// Calculate which will be drawn above, which below
			let planets3D = aboveOrBelow(planets);
			
			sketch.push();
				sketch.imageMode(sketch.CENTER);
				sketch.translate(sketch.width / 2, sketch.height / 2);
				// Display planets & sun in the middle
				for (let planet of planets3D['planetsBelow']) {
					planet.display2();
				}
			
				sun.draw();
			
				for (let planet of planets3D['planetsAbove']) {
					planet.display2();
				}
			sketch.pop();
		}
	}

	function createPlanets(scale) {
		let startPos = p5.Vector.random2D();
		let step = sketch.TWO_PI / N;
		
		for (let i = 0; i < N; i++) {
			let pos = p5.Vector.random2D().mult(sketch.width / 4);
			let planet = new Planet(
				pos.x,
				pos.y,
				0.007 * scale * (i + 1),
				planetImgs[i % planetImgs.length],
				2,
				3,
				sketch
			);

			planet.prevAbove = i % 2;
			planets.push(planet);
		}
	}

	function aboveOrBelow(planets) {
		let planets3D = {'planetsAbove': [], 'planetsBelow': []};

		for (let planet of planets) {
			if (planet.touchingSun && planet.prevAbove) {
				planets3D['planetsAbove'].push(planet);
			} else {
				planets3D['planetsBelow'].push(planet);
			}
		}

		return planets3D;
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
}, 'planetsmoving');