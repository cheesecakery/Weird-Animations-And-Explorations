function jarvis_cross(p1, p2, p3, sketch) {
      let v1 = p5.Vector.sub(p2, p1);
      let v2 = p5.Vector.sub(p2, p3);
    
      let num = v1.dot(v2);
      let den = v1.mag() * v2.mag();
    
      let ret_cross = sketch.acos(num / den);
    
      return ret_cross;
}
  
export function jarvis_march(sketch, particles) {
	let shape = [];
	// sort particles by smallest x
	particles.sort((a, b) => {
	return a.pos.x - b.pos.x;
	});
	shape.push(particles[0]);

	let curr_particle = particles[1];

	// repeat until shape is fully vertexed
	let i = 0;

	let curr_prod = jarvis_cross(
	sketch.createVector(0, 0),
	shape[0].pos,
	curr_particle.pos,
	sketch
	);

	while (curr_particle != shape[0]) {
		if (i != 0) {
			shape.push(curr_particle);
		}

		for (let particle of particles) {
			let prod = 0;
			if (i == 0) {
				if (shape[i] != particle) {
					prod = 360 - jarvis_cross(
									sketch.createVector(0, 0),
									shape[0].pos,
									particle.pos,
									sketch
								);
				}
			} else {
				if (
					shape[shape.length - 2] != particle &&
					shape[shape.length - 1] != particle
				) {
					prod = jarvis_cross(
					shape[shape.length - 2].pos,
					shape[shape.length - 1].pos,
					particle.pos,
					sketch
					);
				}
			}

			if (prod > curr_prod) {
				curr_prod = prod;
				curr_particle = particle;
			}
		}

		i++;
		curr_prod = 0;
	}

	return shape;
}