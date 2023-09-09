class PosterizeFilter extends Filter {
   constructor(img, levels) {
    // Calls the parent class constructor using super()
    super(img);
    // Set the levels property of the instance to the levels argument
    this.levels = levels;
    // Create a new image object with the same dimensions as the input image and store it as the output property of the instance
    this.output = createImage(this.img.width, this.img.height);
  }

  // Define a method called apply that applies the posterize effect to the input image
  apply() {
    // Load the pixels of the input image
    this.img.loadPixels();
    // Copy the input image to the output image
    this.output.copy(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.img.width, this.img.height);
    // Load the pixels of the output image
    this.output.loadPixels();
    // Loop through each pixel of the output image
    for (let pixelVal = 0; pixelVal < this.output.pixels.length; pixelVal += 4) {
      // Get the red, green, blue, and alpha values of the current pixel
      let r = this.output.pixels[pixelVal];
      let g = this.output.pixels[pixelVal + 1];
      let b = this.output.pixels[pixelVal + 2];
      let a = this.output.pixels[pixelVal + 3];
      // Apply the posterize effect to the red, green, and blue values of the current pixel
      r = floor(map(r, 0, 255, 0, this.levels)) * floor(255 / (this.levels - 1));
      g = floor(map(g, 0, 255, 0, this.levels)) * floor(255 / (this.levels - 1));
      b = floor(map(b, 0, 255, 0, this.levels)) * floor(255 / (this.levels - 1));
      // Set the red, green, blue, and alpha values of the output image's pixel to the posterized values
      this.output.pixels[pixelVal] = r;
      this.output.pixels[pixelVal + 1] = g;
      this.output.pixels[pixelVal + 2] = b;
      this.output.pixels[pixelVal + 3] = a;
    }
    // Update the pixels of the output image
    this.output.updatePixels();
    // Return the output image
    return this.output;
  }
}
