class Noise extends Filter {
  constructor(img, quantity ) {
    // Calls the parent class constructor using super()
    super(img);
    // Sets the quantity property to the value passed in
    this.quantity = quantity;
  }

  // apply() function that adds noise to an image
  apply() {
    // Creates a copy of the image
    let imgOut = this.img.get();
    // Loads the pixel data of the copied image
    imgOut.loadPixels();
    // Loops through the pixel data array and adds random noise to each color channel
    for (let pixelVal = 0; pixelVal < imgOut.pixels.length; pixelVal += 4) {
      imgOut.pixels[pixelVal] += round(this.quantity * 255 * (random() - 0.5));
      imgOut.pixels[pixelVal + 1] += round(this.quantity * 255 * (random() - 0.5));
      imgOut.pixels[pixelVal + 2] += round(this.quantity * 255 * (random() - 0.5));
    }
    // Updates the pixels of the copied image with the modified pixel data
    imgOut.updatePixels();
    // Returns the modified image
    return imgOut;
  }
}

