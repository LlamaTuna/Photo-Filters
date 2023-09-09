//*********************************************************************************************************************************************** */
/////////////////////////////////// Instagram Filter coding project by Candidate No. EX2651 for UoL Goldsmiths BSc, Computer Graphics module. ///////////////
//*************************************************************************************************************************************************/
/**
*Extensions added: Add poster and noise filters. Poster is a combination of color reducing algorithms. 
*Noise adapted code from https://editor.p5js.org/EstiennePublic/sketches/9aYpczTzf. 
*Added sliders for varying degrees of effect. 
*Added buttons to toggle between filter effects. Note that a mouse click cause one draw loop.
*Refactored variable scope, added arrow functions, created a parent Filter class that all filters inherit from.
*Refactored existing code to use as extended Filter classes. Added user instructions. 
*Optimized mask kernel matrix since it uses the  same ratio for each pixel.
*/

let imgIn, noiseSlider, posterizeSlider;
let sepiaEnabled = true; let radialBlurEnabled = true; let darkCornersEnabled = true;

// Create a matrix with all values equal to 1/64
const MATRIX = Array.from({length: 8}, () => Array.from({length: 8}, () => 1/64))

// Get the length of the matrix
let matrixSize = MATRIX.length;

// Load the image before the program starts
preload = () => {
  imgIn = loadImage("assets/jeff.png");
}

// Set up the canvas and sliders
setup = () => {
  createCanvas((imgIn.width * 2), imgIn.height + 160); // Add 160 pixels to the height

  //User will need to click the image to apply the filter because of noLoop() in draw()
  textElement = createP("Left click on image or button above to apply effect.<br> Posterize needs to be higher for more dramatic effect");
  textElement.style("color", "blue");
  textElement.style("font-size", "20px");
  textElement.position(200, height);
  textElement.parent("textDiv");
  
  // Create label for noise slider
  let noiseLabel = createDiv("Noise");
  noiseLabel.position(220, imgIn.height + 5, imgIn.width + 100);

  // Create slider for noise level
  noiseSlider = createSlider(0.0, 1.0, 0.0, 0.01);
  noiseSlider.position(220, imgIn.height + 25);
  noiseSlider.style('width', '400px');
  noiseSlider.style('background-color', 'blue');

  // Create label for posterize slider
  let posterizeLabel = createDiv("Posterize");
  posterizeLabel.position(220, imgIn.height + 60);

  // Create slider for posterize levels
  posterizeSlider = createSlider(150, 255, 150, .5);
  posterizeSlider.position(220, imgIn.height + 80);
  posterizeSlider.style('width', '400px');
  posterizeSlider.style('background-color', 'blue');

  // Create button to toggle sepia filter on and off
  let sepiaButton = createButton("Toggle Sepia");
  sepiaButton.position(220, imgIn.height + 120);
  sepiaButton.style('background-color', 'blue');
  sepiaButton.style('color', 'white');
  sepiaButton.mousePressed(() => {
    sepiaEnabled = !sepiaEnabled;
    redraw();
  });

  let radialBlurButton = createButton("Toggle RadialBlur");
  radialBlurButton.position(340, imgIn.height + 120);
  radialBlurButton.style('background-color', 'blue');
  radialBlurButton.style('color', 'white');
  radialBlurButton.mousePressed(() => {
    radialBlurEnabled = !radialBlurEnabled;
    redraw();
  });

  // Create button to toggle dark corners filter on and off
  let darkCornersButton = createButton("Toggle Dark Corners");
  darkCornersButton.position(490, imgIn.height + 120);
  darkCornersButton.style('background-color', 'blue');
  darkCornersButton.style('color', 'white');
  darkCornersButton.mousePressed(() => {
    darkCornersEnabled = !darkCornersEnabled;
    redraw();
  });
}

// Draw the original image and the filtered image
draw = () => {
  let noiseLevel = noiseSlider.value();
  let posterizeLevels = map(posterizeSlider.value(), 2, 255, 255, 2);

  // Apply filters to the original image, passing sepiaEnabled to earlyBirdFilter
  let filteredImg = earlyBirdFilter(imgIn, noiseLevel, posterizeLevels, sepiaEnabled);
  image(imgIn, 0, 0);
  image(filteredImg, imgIn.width, 0);
  noLoop();
}
// Start looping again when the mouse is clicked
mousePressed = () => {
  loop();
}

// Apply multiple filters to an image
earlyBirdFilter = (img, noiseLevel, posterizeLevels, sepiaEnabled) => {

  // Create a new image that is a copy of the original image
  resultImg = createImage(img.width, img.height);
  resultImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);

  // Apply filters conditionally if boolean flag is true
  if (sepiaEnabled) {
    let sepiaFilter = new SepiaFilter(resultImg);
    resultImg = sepiaFilter.apply();
  }
  if(radialBlurEnabled){
    let radialBlur = new RadialBlurFilter(resultImg);
    resultImg = radialBlur.apply(); 
  }
  if(darkCornersEnabled){
    let darkCorners = new DarkCornersFilter(resultImg);
    resultImg = darkCorners.apply();
  }

  //Remaining filters not controlled by booleans
  let noiseFilter = new Noise(resultImg, noiseLevel);
  let posterizeFilter = new PosterizeFilter(noiseFilter.apply(), posterizeLevels);
  let borderFilter = new BorderFilter(posterizeFilter.apply());

  return borderFilter.apply() // Return the filtered image
}


//*********************************************************************************************************************************************** */
/////////////////////////////////// Original Instagram Filter code. Uncomment and comment above to run. //////////////////////////////////////////
//*************************************************************************************************************************************************/

// // Image of Husky Creative commons from Wikipedia:
// // https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg

// let imgIn;
// //refactored the MATRIX so it was less verbose isnce all values arre the same. 
// const MATRIX = Array.from({length: 8}, () => Array.from({length: 8}, () => 1/64))

// let matrixSize = MATRIX.length;
// /////////////////////////////////////////////////////////////////
// function preload() {
//     imgIn = loadImage("assets/husky.jpg");
// }
// /////////////////////////////////////////////////////////////////
// function setup() {
//     createCanvas((imgIn.width * 2), imgIn.height);
// }
// /////////////////////////////////////////////////////////////////
// function draw() {
//     background(125);
//     image(imgIn, 0, 0);
//     image(earlyBirdFilter(imgIn), imgIn.width, 0);
//     noLoop();
// }
// /////////////////////////////////////////////////////////////////
// function mousePressed(){
//   loop();
// }
// /////////////////////////////////////////////////////////////////


// function earlyBirdFilter(img){
//   // create a new image with the same dimensions as the input image
//   let resultImg = createImage(img.width, img.height);
//   // copy the original image to the new image
//   resultImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
//   // apply the sepia filter to the new image
//   resultImg = sepiaFilter(resultImg);
//   // apply the dark corners filter
//   resultImg = darkCorners(resultImg);
//   // apply the radial blur filter
//   resultImg = radialBlurFilter(resultImg);
//   // apply the border
//   resultImg = borderFilter(resultImg)
//     // return the filtered image
//   return resultImg;
// }
// /////////////////////////////////////////////////////////////////
// function sepiaFilter(img){
//   img.loadPixels();
//   for (let x = 0; x < img.width; x++) {
//     for (let y = 0; y < img.height; y++) {
//         let index = (x + y * img.width) * 4;

//         let oldRed = img.pixels[index];
//         let oldGreen = img.pixels[index + 1];
//         let oldBlue = img.pixels[index + 2];

//         let newRed = (oldRed * .393) + (oldGreen * .769) + (oldBlue * .189);
//         let newGreen = (oldRed * .349) + (oldGreen * .686) + (oldBlue * .168);
//         let newBlue = (oldRed * .272) + (oldGreen * .534) + (oldBlue * .131);

//         img.pixels[index] = newRed;
//         img.pixels[index + 1] = newGreen;
//         img.pixels[index + 2] = newBlue;
//         img.pixels[index + 3] = 255;
//     }
//   }
//   img.updatePixels();
//   return img;
// }
// /////////////////////////////////////////////////////////////////
// function darkCorners(img){
//   img.loadPixels();
//   let midX = img.width / 2;
//   let midY = img.height / 2;

//   for (let x = 0; x < img.width; x++) {
//       for (let y = 0; y < img.height; y++) {
//           let distance = dist(x, y, midX, midY);
//           let dynLum = 1;

//           if (distance > 300 && distance <= 450) {
//               dynLum = map(distance, 300, 450, 1, 0.4);
//               dynLum = constrain(dynLum, 0.4, 1);
//           } else if (distance > 450) {
//               dynLum = map(distance, 450, img.width, 0.4, 0);
//               dynLum = constrain(dynLum, 0, 0.4);
//           }

//           let index = (x + y * img.width) * 4;
//           img.pixels[index] = img.pixels[index] * dynLum;
//           img.pixels[index + 1] = img.pixels[index + 1] * dynLum;
//           img.pixels[index + 2] = img.pixels[index + 2] * dynLum;
//       }
//   }
//   img.updatePixels();
//   return img;
// }
// /////////////////////////////////////////////////////////////////
// function radialBlurFilter(img){

//   // read every pixel
//   img.loadPixels();

//   for (let x = 0; x < img.width; x++) {
//     for (let y = 0; y < img.height; y++) {
//         let index = (x + y * img.width) * 4;
//         let distance = dist(x, y, mouseX, mouseY);
//         let dynBlur = 0;

//         if (distance > 100 && distance <= 300) {
//             dynBlur = map(distance, 100, 300, 0, 1);
//             dynBlur = constrain(dynBlur, 0, 1);
//         } else if (distance > 300) {
//             dynBlur = 1;
//         }

//         let c = convolution(x, y, MATRIX, matrixSize, img);
//         img.pixels[index + 0] = c[0]*dynBlur + img.pixels[index + 0]*(1-dynBlur); //red channel
//         img.pixels[index + 1] = c[1]*dynBlur + img.pixels[index + 1]*(1-dynBlur); //green channel
//         img.pixels[index + 2] = c[2]*dynBlur + img.pixels[index + 2]*(1-dynBlur); //blue channel
//         img.pixels[index + 3] = 255; //alpha channel
      
//   }

// }
//   img.updatePixels();
//   return img;
// }

// /////////////////////////////////////////////////////////////////
//   function convolution(x, y, matrix, matrixSize, img) {

//   let totalRed = 0.0;
//   let totalGreen = 0.0;
//   let totalBlue = 0.0;
//   let offset = floor(matrixSize / 2);

//   // convolution matrix loop
//   for (let i = 0; i < matrixSize; i++) {
//     for (let j = 0; j < matrixSize; j++) {
//         // Get pixel loc within convolution matrix
//         let xloc = x + i - offset;
//         let yloc = y + j - offset;
//         let index = (xloc + img.width * yloc) * 4;
//         // ensure we don't address a pixel that doesn't exist
//         index = constrain(index, 0, img.pixels.length - 1);

//         // multiply all values with the mask and sum up
//         totalRed += img.pixels[index + 0] * matrix[i][j];
//         totalGreen += img.pixels[index + 1] * matrix[i][j];
//         totalBlue += img.pixels[index + 2] * matrix[i][j];
//     }
//   }
//   // return the new color
//   return [totalRed, totalGreen, totalBlue];
// }
// /////////////////////////////////////////////////////////////////
// function borderFilter(img) {

//   let buffer = createGraphics(img.width, img.height);
//   buffer.image(img, 0, 0);
//   buffer.strokeWeight(20);
//   buffer.stroke(255);
//   buffer.noFill();
//   buffer.rect(0, 0, img.width, img.height, 30);
//   buffer.rect(0, 0, img.width, img.height);
//   return buffer;
// }
