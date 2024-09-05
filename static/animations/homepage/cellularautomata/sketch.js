var cellularautomata = (sketch) => {
	let startRule = 30;
	let ruleSet;

	let palettes = [];
	let palette = [];
	
	let cells = [];
	// The width of a cell
	let cellWidth = 5;
	
	let y = 0;
	
	let paused = false;

	let parent;

	sketch.windowResized = () => {
		// If changed size considerably, reset animation
		let dif = sketch.createVector(
			sketch.width - parent.offsetWidth,
			sketch.height - parent.offsetHeight
		);
		
		if (sketch.abs(dif.x) > 100) {
			startAnimation();
		} 
	}
	
	sketch.setup = () => {
		// finds where to put the sketch on the page
		parent = document.getElementById("ca");
		sketch.createCanvas(0, 0);

		let palette1 = [
			sketch.color(95, 15, 64),
			sketch.color(251, 139, 36),
			sketch.color(227,100,20),
			sketch.color(154, 3, 30)
		]
		
		let palette2 = [
			sketch.color(0, 13, 18),
			sketch.color(0, 63, 92),
			sketch.color(44, 72, 121),
			sketch.color(138, 80, 143),
			sketch.color(188, 80, 144),
			sketch.color(255, 99, 97),
			sketch.color(255, 133, 49),
			sketch.color(255, 166, 0),
			sketch.color(255, 211, 128)
		]

		palettes = [palette1, palette2];
		palette = palette2;

		startAnimation();
	}

	function startAnimation() {
		sketch.resizeCanvas(parent.offsetWidth, parent.offsetHeight);
		sketch.background(0);

		setRules(startRule);
		
		y = 0;
		// Decide how many pixels should fill the screen
		let rows = sketch.floor(sketch.width / cellWidth);
		for (let i = 0; i < rows; i++) {
			// Make the cell a random colour
			cells[i] = sketch.random(palette);
		}
	}
	
	function setRules(rule) {
		// Converts from base 10 to binary
		ruleSet = rule.toString(2).padStart(8, '0')
	}
	
	sketch.draw = () => {
		sketch.noStroke();
		// Draw each cell square
		for (let i = 0; i < cells.length; i++) {
			let x = i * cellWidth;
			sketch.fill(cells[i]);
			sketch.square(x, y, cellWidth);
		}
		// Move down the grid
		y += cellWidth;
		
		// If reach the bottom of the grid, wait a bit, and then start a new rule.
		if (y > sketch.height && !paused) {
			paused = !paused;
			setTimeout(() => {
				sketch.background(0);
				y = 0;
				setRules(sketch.floor(sketch.random(256)));
				palette = sketch.random(palettes);
				paused = !paused;
			}, 1500);
		}
		
		// Make next grid based on the ruleset
		let nextCells = [];
		let len = cells.length;
		for (let i = 0; i < len; i++) {
			// Finds left cell (loops round)
			let leftCol = cells[(i - 1 + len) % len];
			// Finds right cell (loops round)
			let rightCol = cells[(i + 1 + len) % len];
			// Middle cell
			let stateCol = cells[i];
	
			// Decides whether it is a 1 or a 0 based on brightness of cell
			let left = sketch.brightness(leftCol) > 40 ? 1 : 0;
			let right = sketch.brightness(rightCol) > 40 ? 1 : 0;
			let state = sketch.brightness(stateCol) > 40 ? 1 : 0;
			
			let newState = calculateState(left, state, right);
			
			// Black
			if (newState == 0) {
				nextCells[i] = sketch.color(0);
			// Else, picks a random new colour.
			} else {
				let options = [];
				if (left == 1) options.push(leftCol);
				if (right == 1) options.push(rightCol);
				if (state == 1) options.push(stateCol);
				
				if (options.length < 1) nextCells[i] = sketch.random(palette);
				else nextCells[i] = sketch.random(options);
			}
		}
		
		cells = nextCells;
	}
	
	// Takes cells a, b, c in, and calculates state of b
	function calculateState(a, b, c) {
		let chunk = "" + a + b + c;
		// Calculates value - parseInt converts from binary to base 10
		let value = 7 - parseInt(chunk, 2);
		// Then takes the value at that point in the ruleset string
		return parseInt(ruleSet[value]);
	}
}

let myp5 = new p5(cellularautomata, 'ca');