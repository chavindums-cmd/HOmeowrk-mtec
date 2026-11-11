 // Name :  Chavindu S
 //Title: P and S Waves
 
  //Instructions for the user:
  //- Click anywhere on the map to start an earthquake.
  //- The yellow ring is the P wave (fast).
  //- The red ring is the S wave (slower).
  //- Press C to clear all the earthquakes.
 
  //Image credit: got the map from wikipedia, public domain. 
  
let worldImg; // the map picture
 
// ARRAYS: one entry per earthquake
let quakeX = [];   // where it is, left to right
let quakeY = [];   // where it is, top to bottom
let quakeAge = []; // how many frames old it is
 
// Load the picture, then make the canvas
async function setup() {
  worldImg = await loadImage("worldmap.jpg"); //It loads the picture, waits until loading has finished
  createCanvas(1200, 600);                      // make a canvas the same size as the picture
}
 
 
function draw() {
  background(15, 20, 40);           // dark blue background
 
  // Draw the map so it fills the canvas
  image(worldImg, 0, 0, width, height);
 
  // Go through the arrays and draw each earthquake
  for (let i = 0; i < quakeX.length; i++) {  // quakeX.length is how many earthquakes exist. The loop runs once per earthquake, with i as its position in the arrays. 
    // With no earthquakes yet, the length is 0 and the loop doesn’t run at all.
    quakeAge[i] += 1; // one frame older
 
    // P wave: grows 3 pixels per frame (fast)
    noFill();
    stroke(255, 220, 80);
    strokeWeight(1);
    ellipse(quakeX[i], quakeY[i], quakeAge[i] * 6);
 
    // S wave: grows more slowly
    stroke(255, 90, 70);
    strokeWeight(3);
    ellipse(quakeX[i], quakeY[i], quakeAge[i] * 2.5);
 
    // The epicentre of the earthquake
    noStroke();
    fill(255);
    ellipse(quakeX[i], quakeY[i], 6);
  }
 
  // Labels
  noStroke();
  fill(255, 220, 80);
  text("P wave: fast", 10, height - 26);
  fill(255, 90, 70);
  text("S wave: slower", 10, height - 10);
}
 
// Click: add a new earthquake to the arrays
function mousePressed() {
  quakeX.push(mouseX);
  quakeY.push(mouseY);
  quakeAge.push(0);
}
 
// C: empty the arrays
function keyPressed() {
  if (key == 'c' || key == 'C') {
    quakeX = [];
    quakeY = [];
    quakeAge = [];
  }
}
 