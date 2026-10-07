/*
  Name: Chavindu S.
  Title: SS4 - Photo Slideshow

  A slideshow of my photography. Each photo is shown with a
  caption, and the sketch uses time (millis) to move to the
  next photo on its own, like a gallery screen.
  - CLICK the mouse to skip to the next photo right away.
*/

// my variables
let photo1;           // first image
let photo2;           // second image
let photo3;           // third image
let current = 1;      // which photo is showing (1, 2 or 3)
let lastChange = 0;   // time (in milliseconds) of the last photo change
let showTime = 4000;  // how long each photo stays (4000 ms = 4 seconds)

// async setup lets us WAIT for the images to load before drawing
async function setup() {
  createCanvas(600, 460);
  photo1 = await loadImage('assets/photo1.jpg');
  photo2 = await loadImage('assets/photo2.jpg');
  photo3 = await loadImage('assets/photo3.jpg');

  imageMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  // timed event: go to the next photo every 4 seconds
  if (millis() - lastChange > showTime) {
    nextPhoto();
  }

  // show the current photo 
  textSize(20);

  if (current === 1) {
    image(photo1, width / 2, 200, 600, 400);
    
  } else if (current === 2) {
    image(photo2, width / 2, 200, 600, 400);
    
  } else {
    image(photo3, width / 2, 200, 600, 400);
    
  }

  
}

// moves to the next photo and restarts the timer
function nextPhoto() {
  current = current + 1;
  if (current > 3) {
    current = 1; // go back to the first photo
  }
  lastChange = millis();
}

// click to skip ahead
function mousePressed() {
  nextPhoto();
}