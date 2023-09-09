class BorderFilter extends Filter {
  // apply method overrides the parent apply method
  apply() {
    // create a buffer graphics object of the same size as the input image
    let buffer = createGraphics(this.img.width, this.img.height);
    // draw the input image onto the buffer
    buffer.image(this.img, 0, 0);
    // set the stroke properties of the buffer for the border
    buffer.strokeWeight(20);
    buffer.stroke(255);
    buffer.noFill();
    // draw a rounded rectangle as the border
    buffer.rect(0, 0, this.img.width, this.img.height, 30);
    // draw a regular rectangle as an inner border
    buffer.rect(0, 0, this.img.width, this.img.height);
    // return the buffer graphics object
    return buffer;
  }
}
