// Checks to see whether mating is viable.
function checkToBeginMating() {
  if (matingInProgress == false) {
    if (submerged_attractors.length == 2) {
      if (submerged_children.length == 0) {
        // There is no mating going on, 2 viable attractors, and no child in the pit, so mating can begin!
        submerged_attractors[0].mateWith(submerged_attractors[1]);
      } else {
        let txt =
          "there is a child in the pit ew . U gunna mate in front of a child ?? ew.";
        createText(txt, 'black', 4);
        // setTimeout(createText, 2000, txt, "black", 4);
      }
    } else if (submerged_attractors.length > 2) {
      let txt = "too many blimmin attractors (to mate ) ...";
      createText(txt, 'black', 3);
      // setTimeout(createText, 2000, txt, "black", 2);
    }
  }
}

// Successful birth !
function birthAttractor(attractor1, attractor2) {
  // Get roughly 1/10 of bubbles from each (will randomize later .)
  let n1 = floor(attractor1.bubbles.length * 0.1);
  let n2 = floor(attractor2.bubbles.length * 0.1);

  let bubbles1 = attractor1.bubbles.splice(0, n1);
  let bubbles2 = attractor2.bubbles.splice(0, n2);

  attractor1.no_of_bubbles -= bubbles1.length;
  attractor2.no_of_bubbles -= bubbles2.length;

  // Create a new attractor with those bubbles from parents
  let midpointX = jelly.x + jelly.w / 2;
  let midpointY = jelly.y + jelly.h / 2;

  let mass = 5;

  let baby = new Attractor(midpointX, midpointY, mass, 0);
  baby.rgb = midpointColour(attractor1.rgb, attractor2.rgb);

  baby.bubbles = bubbles1.concat(bubbles2);

  baby.no_of_bubbles = baby.bubbles.length;

  // Childlike - important!! Means they will grow in number of bubbles until they are an adult.
  baby.justBorn = true;
  baby.adult = false;
  baby.max_bubbles = ceil(random(50, 100));

  // Need to update all the attractors bubbles to be small :(
  for (let bubble of baby.bubbles) {
    bubble.m = baby.m * 5;
    bubble.r = sqrt(bubble.m) * SIZE;
  }

  attractors.push(baby);

  let col = color(baby.rgb);
  let text = "you have created life. how does it feel?";

  setTimeout(createText, 3000, text, col, 5);

  // At least 10 seconds before mating can begin again
  setTimeout(() => {
    matingInProgress = false;

    attractor1.mating = false;
    attractor2.mating = false;
    baby.justBorn = false;
  }, 10000);
}


// If attractors were unsuccessful
function miscarriage(attractor1, attractor2) {
  createText("your attractors were unsuccessful", "black", 5);

  attractor1.mating = false;
  attractor2.mating = false;
  matingInProgress = false;
}


// Option to DUEL!!
function duelling(attractor1, attractor2) {
  createText("DUEL!!!!!!!! .", "black", 5);

  jelly.duelMode = true;

  let val = 100;

  jelly.density /= val;

  // Pick which one dies
  let a = random[(0, 1)];

  let col;
  let losing_attractor;

  if (a == 0) {
    col = color(attractor1.rgb);
    losing_attractor = attractor1;
    winning_attractor = attractor2;
  } else {
    col = color(attractor2.rgb);
    losing_attractor = attractor2;
    winning_attractor = attractor1;
  }

  setTimeout(() => {
    createText("it hurts", col, 3);
    losing_attractor.die();

    setTimeout(() => {
      // Attractor is removed from array
      let index = attractors.indexOf(losing_attractor);
      attractors.splice(index, 1);

      setTimeout(() => {
        winning_attractor.mating = false;
        matingInProgress = false;

        jelly.duelMode = false;
        jelly.density *= val;

        setTimeout(() => {
          createText("we are sorry for your loss,", "black", 3);
        }, 2000);
      }, 4000);
    }, 6000);
  }, 5000);
}
