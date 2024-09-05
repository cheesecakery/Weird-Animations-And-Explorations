import {Attractor} from './attractor.js'
import {midpointColour, createText} from './helper.js'

// Checks to see whether mating is viable.
export function checkToBeginMating(sketch) {
    // Make sure no mating is currently going on
    if (!sketch.matingInProgress) {
        // Check for correct number of adult attractors
        if (sketch.submergedAdultAttractors.length == 2) {
            // Check for correct number of child attractors (none)
            if (sketch.submergedChildrenAttractors.length == 0) {
                sketch.matingInProgress = true;
                // Checks successful, so can begin mating.
                setTimeout( () => {
                  mating(sketch.submergedAdultAttractors[0], sketch.submergedAdultAttractors[1], sketch);
                }, 2000);
            } else {

                createText(
                    "can't mate with a child in the pit !",
                    'black',
                    4,
                    sketch 
                );
            }
        } else if (sketch.submergedAdultAttractors.length > 2) {

            createText(
                "can't mate with more than 2 attractors in the pit ?",
                'black',
                3,
                sketch
            );
        }
    }
}

// Begins the process of mating between two attractors
function mating(attractorA, attractorB, sketch) {
    // Toggle mating attributes to true
    sketch.matingInProgress = true; 
    attractorA.mating = true; 
    attractorB.mating = true; 

    createText(
        "the mating shall begin!!",
        "black",
        5,
        sketch
    );

    // Pick a random number from 0 to 99.
    let a = sketch.floor(sketch.random(100));
    // 50% chance they successfully mate
    if (a < 50) {
        setTimeout(birthAttractor, 2500 + 2000, attractorA, attractorB, sketch);
    // 35% chance of miscarriage
    } else if (a < 85) {
        setTimeout(miscarriage, 2500 + 2500, attractorA, attractorB, sketch);
    // 15% chance of duel !!
    } else {
        setTimeout(duelling, 2500 + 2500, attractorA, attractorB, sketch);
    }
}

function birthAttractor(attractorA, attractorB, sketch) {
    // Get roughly 1/10 of bubbles from each
    let n1 = sketch.floor(attractorA.particles.length * 0.1);
    let n2 = sketch.floor(attractorB.particles.length * 0.1);

    // Grab said particles from each attractor
    let particlesA = attractorA.particles.splice(0, n1);
    let particlesB = attractorB.particles.splice(0, n2);

    // Create a new baby attractor
    let baby = new Attractor( 
        sketch.jelly.pos.x + sketch.jelly.w / 2, 
        sketch.jelly.pos.y + sketch.jelly.h / 2,
        attractorA.m * 0.5,
        0,
        sketch
    );
    baby.rgb = midpointColour(attractorA.rgb, attractorB.rgb);

    baby.particles = particlesA.concat(particlesB);

    // Childlike - important!! Means they will grow in number of bubbles until they are an adult.
    baby.justBorn = true;
    baby.adult = false;
    baby.max_particles = sketch.ceil(sketch.random(50, 100));

    // Need to update all the attractors bubbles to be small :(
    for (let particle of baby.particles) {
        particle.m = baby.m * 5;
        particle.r = sketch.sqrt(particle.m) * 3;
    }

    sketch.attractors.push(baby);

    setTimeout(() => {
        createText(
            "you have created life . how does it feel ? ", 
            sketch.color(baby.rgb),
            5,
            sketch
        );
    }, 5000);

    // Enforce at least 10 seconds before mating can begin again
    setTimeout(() => {
        sketch.matingInProgress = false;
        attractorA.mating = false;
        attractorB.mating = false;
        baby.justBorn = false;
    }, 10000);
}

// If attractors were unsuccessful
function miscarriage(attractorA, attractorB, sketch) {
  createText(
    "your attractors were unsuccessful",
    "black",
    5,
    sketch);

  attractorA.mating = false;
  attractorB.mating = false;
  sketch.matingInProgress = false;
}

// Option to DUEL!!
function duelling(attractorA, attractorB, sketch) {
    createText(
        "DUEL!!!!!!!! .",
        "black",
        5,
        sketch
    );

    sketch.jelly.duelMode = true;

    // Decide which attractor dies, randomly
    let colour;
    let winningAttractor;
    let losingAttractor;

    let p = sketch.random([0, 1]);
    if (p == 0) {
        colour = sketch.color(attractorA.rgb);
        losingAttractor = attractorA;
        winningAttractor = attractorB;
    } else {
        colour = sketch.color(attractorB.rgb);
        losingAttractor = attractorB;
        winningAttractor = attractorA;
    }

    // After 5 seconds, the losing attractor begins the process of death
    setTimeout(() => {
        createText(
            "it hurts",
            colour,
            3,
            sketch
        );
        losingAttractor.die();

        // After 6 more seconds, remove attractor from the array
        setTimeout(() => {
            let index = sketch.attractors.indexOf(losingAttractor);
            sketch.attractors.splice(index, 1);

            index = sketch.submergedAdultAttractors.indexOf(losingAttractor);
            sketch.submergedAdultAttractors.splice(index, 1);

            // After 4 more seconds, end the duel mode
            setTimeout(() => {
                winningAttractor.mating = false;
                sketch.matingInProgress = false;
                sketch.jelly.duelMode = false;

                // After 2 seconds, create text in grievance
                setTimeout(() => {
                  createText(
                      "we are sorry for your loss,",
                      "black",
                      3,
                      sketch
                  );
                }, 2000);
            }, 4000);
        }, 6000);
    }, 5000);
}
