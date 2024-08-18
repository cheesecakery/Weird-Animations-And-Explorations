function drawPicture() {
    pixelDensity(1);
    // loads the value of each pixel 
    loadPixels();
  
    let cx = width / 2;
    let cy = height / 2;
  
    //loop through each pixel
    for (var i = 0; i <= height; i++) {
      for (var j = 0; j <= width; j++) {
  
        // if (d < width / 2) {
          //x is computed as a coordinate i one-hundredths across the square
          //so as j goes up value by value, one can think of point moving steadily up the picture.
          x = corna + i * (side / width);
          y = cornb + j * (side / height);
          //therefore resulting point (x, y) is somewhere within said square.
          c = floor(pow(x, 2) + pow(y, 2));
  
          let index = (i + j * width) * 4;
  
          if (c % 4 == 0) {
            pixels[index] = 255;
            pixels[index + 1] = 0;
            pixels[index + 2] = 0;
            pixels[index + 3] = 255;
          } else if (c % 4 == 1) {
            pixels[index] = 0;
            pixels[index + 1] = 255;
            pixels[index + 2] = 0;
            pixels[index + 3] = 255;
          } else if (c % 4 == 2) {
            pixels[index] = 0;
            pixels[index + 1] = 0;
            pixels[index + 2] = 255;
            pixels[index + 3] = 255;
          }
        }
    }
  
    updatePixels();
  }