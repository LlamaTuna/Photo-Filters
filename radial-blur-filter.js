class RadialBlurFilter extends Filter {
  apply() {
      // Load all pixels from the image
      this.img.loadPixels();

      // Loop through each pixel of the image
      for (let x = 0; x < this.img.width; x++) {
          for (let y = 0; y < this.img.height; y++) {
              // Calculate the index of the current pixel
              let index = (x + y * this.img.width) * 4;

              // Calculate the distance from the current pixel to the mouse position
              let distance = dist(x, y, mouseX, mouseY);

              // Calculate the dynamic blur based on the distance
              let dynBlur = 0;
              if (distance > 100 && distance <= 300) {
                  dynBlur = map(distance, 100, 300, 0, 1);
                  dynBlur = constrain(dynBlur, 0, 1);
              } else if (distance > 300) {
                  dynBlur = 1;
              }

              // Apply convolution filter to the pixel and update the red, green and blue channels
              let c = convolution(x, y, MATRIX, matrixSize, this.img);
              this.img.pixels[index + 0] = c[0]*dynBlur + this.img.pixels[index + 0]*(1-dynBlur); //red channel
              this.img.pixels[index + 1] = c[1]*dynBlur + this.img.pixels[index + 1]*(1-dynBlur); //green channel
              this.img.pixels[index + 2] = c[2]*dynBlur + this.img.pixels[index + 2]*(1-dynBlur); //blue channel
              this.img.pixels[index + 3] = 255; //alpha channel
          }
      }

      // Update the image pixels and return the modified image
      this.img.updatePixels();
      return this.img;
  }
}

    // Convolution function to calculate the total color values of the pixels within the convolution matrix
    convolution = (x, y, matrix, matrixSize, img) => {
    let totalRed = 0.0;
    let totalGreen = 0.0;
    let totalBlue = 0.0;
    let offset = floor(matrixSize / 2);

    // Loop through the convolution matrix
    for (let xIndex = 0; xIndex < matrixSize; xIndex++) {
        for (let yIndex = 0; yIndex < matrixSize; yIndex++) {
            // Calculate the x and y positions of the pixel in the image
            let xPixel = x + xIndex - offset;
            let yPixel = y + yIndex - offset;

            // Calculate the index of the pixel in the image pixel array
            let pixelIndex = (xPixel + img.width * yPixel) * 4;

            // Ensure the pixel index is within bounds of the image pixel array
            pixelIndex = constrain(pixelIndex, 0, img.pixels.length - 1);

            // Multiply the pixel color values with the corresponding convolution matrix value and add them up
            totalRed += img.pixels[pixelIndex + 0] * matrix[xIndex][yIndex];
            totalGreen += img.pixels[pixelIndex + 1] * matrix[xIndex][yIndex];
            totalBlue += img.pixels[pixelIndex + 2] * matrix[xIndex][yIndex];
        }
    }

    // Return the new color values as an array
    return [totalRed, totalGreen, totalBlue];
}
