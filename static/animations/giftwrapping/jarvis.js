function jarvis_cross(p1, p2, p3) {
    let v1 = p5.Vector.sub(p2, p1);
    let v2 = p5.Vector.sub(p2, p3);
  
    let num = v1.dot(v2);
    let den = v1.mag() * v2.mag();
  
    let ret_cross = acos(num / den);
  
    // ret_cross = v1.x * v2.y - v1.y * v2.x;
    return ret_cross;
  }
  
  function jarvis_march() {
    // sort spots by smallest x
    spots.sort((a, b) => {
      return a.pos.x - b.pos.x;
    });
    shape.push(spots[0]);
  
    curr_spot = spots[1];
  
    // repeat until shape is fully vertexed
    let i = 0;
    let curr_prod = jarvis_cross(createVector(0, 0), shape[0].pos, curr_spot.pos);
    while (curr_spot != shape[0]) {
      if (i != 0) {
        shape.push(curr_spot);
      }
  
      for (let spot of spots) {
        let prod = 0;
        if (i == 0) {
          if (shape[i] != spot) {
            prod = 360 - jarvis_cross(createVector(0, 0), shape[0].pos, spot.pos);
          }
        } else {
          if (
            shape[shape.length - 2] != spot &&
            shape[shape.length - 1] != spot
          ) {
            prod = jarvis_cross(
              shape[shape.length - 2].pos,
              shape[shape.length - 1].pos,
              spot.pos
            );
          }
        }
  
        if (prod > curr_prod) {
          curr_prod = prod;
          curr_spot = spot;
        }
      }
  
      i++;
      curr_prod = 0;
    }
  
    spots.sort((a, b) => {
      return a.pos.y - b.pos.y;
    });
  }