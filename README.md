Instagram Filter coding project by Jeff Becker for UoL Goldsmiths BSc, Computer Graphics module.

This program applies multiple filters to an image and displays the original and the filtered image side by side.

Usage:
Run a live server.
Open the index.html file in your web browser.
Click on the image to apply the filter.

Description:
The earlyBirdFilter() function applies multiple filters to an image in sequence:

*Sepia filter
*Dark corners filter
*Radial blur filter
*Noise filter
*Posterize filter
*Border filter

The Filter class is the parent class for the image filters, and subclasses override the apply() method to implement their own specific image filters.

The program also includes sliders to adjust the noise level and the number of posterize levels.

Dependencies:
p5.js
husky.jpg image file (included in the assets folder)
// // Image of Husky Creative commons from Wikipedia:
// // https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg


Credits: Noise is an adaptation from https://editor.p5js.org/EstiennePublic/sketches/9aYpczTzf 

Posterize is a composite of quantizing algorithims for color reduction. The theory is from https://legacy.imagemagick.org/script/quantize.php