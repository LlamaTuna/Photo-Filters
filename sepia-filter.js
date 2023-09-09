class SepiaFilter extends Filter {
    apply() {
        // Load the pixels of the image
        this.img.loadPixels();

        // Loop through every pixel in the image
        for (let x = 0; x < this.img.width; x++) {
            for (let y = 0; y < this.img.height; y++) {
                // Get the index of the current pixel
                let index = (x + y * this.img.width) * 4;

                // Get the red, green, and blue values of the current pixel
                let oldRed = this.img.pixels[index];
                let oldGreen = this.img.pixels[index + 1];
                let oldBlue = this.img.pixels[index + 2];

                // Calculate the new red, green, and blue values using the Sepia formula
                let newRed = (oldRed * .393) + (oldGreen * .769) + (oldBlue * .189);
                let newGreen = (oldRed * .349) + (oldGreen * .686) + (oldBlue * .168);
                let newBlue = (oldRed * .272) + (oldGreen * .534) + (oldBlue * .131);

                // Set the new red, green, blue, and alpha values of the current pixel
                this.img.pixels[index + 0] = newRed;
                this.img.pixels[index + 1] = newGreen;
                this.img.pixels[index + 2] = newBlue;
                this.img.pixels[index + 3] = 255;
            }
        }
        
        // Update the pixels of the image
        this.img.updatePixels();

        // Return the filtered image
        return this.img;
    }
}
