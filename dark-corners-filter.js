class DarkCornersFilter extends Filter {
  apply() {
      // Load the pixel data for the image
      this.img.loadPixels();
      
      // Calculate the center of the image
      const midX = this.img.width / 2;
      const midY = this.img.height / 2;

      // Loop through all the pixels in the image
      for (let x = 0; x < this.img.width; x++) {
          for (let y = 0; y < this.img.height; y++) {
              // Calculate the distance between the current pixel and the center of the image
              const distance = dist(x, y, midX, midY);
              let dynLum = 1; // Set the dynamic luminosity to 1

              // If the distance is between 300 and 450 pixels
              if (distance > 300 && distance <= 450) {
                  // Map the distance to a value between 1 and 0.4 (inverse relationship to distance)
                  dynLum = map(distance, 300, 450, 1, 0.4);
                  // Constrain the dynamic luminosity between 0.4 and 1
                  dynLum = constrain(dynLum, 0.4, 1);
              } 
              // If the distance is greater than 450 pixels
              else if (distance > 450) {
                  // Map the distance to a value between 0.4 and 0 (proportional to distance)
                  dynLum = map(distance, 450, this.img.width, 0.4, 0);
                  // Constrain the dynamic luminosity between 0 and 0.4
                  dynLum = constrain(dynLum, 0, 0.4);
              }

              // Get the index of the current pixel in the pixel array
              const index = (x + y * this.img.width) * 4;
              // Multiply the red, green, and blue values of the pixel by the dynamic luminosity
              this.img.pixels[index] *= dynLum;
              this.img.pixels[index + 1] *= dynLum;
              this.img.pixels[index + 2] *= dynLum;
          }
      }
      
      // Update the pixel data for the image
      this.img.updatePixels();
      // Return the modified image
      return this.img;
  }
}
