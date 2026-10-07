/*
  Name: Chavindu S.
  Title: SS3 - Circle Trail
 
  Instructions:
  - Move the mouse RIGHT and the circle grows.
  - Move the mouse LEFT and the circle shrinks.
  - Keep the mouse still and the circle stays the same size.
  - CLICK to change the circle to a random color.
  - Press the C key to clear the canvas.
 
  Theme:
  A circle that leaves a path wherever it goes. Moving right
  makes it bigger, moving left makes it smaller, and every click
  gives it a surprise color, so no two drawings look the same.
*/
 
// my variables
let circleSize = 30;  // how big the circle is
let r = 0;            // red amount
let g = 150;          // green amount
let b = 255;          // blue amount
 
function setup() {
  createCanvas(600, 400);
  background(20);  // only drawn once, so the path stays on screen
  stroke(255);      // white outline
  strokeWeight(2);  // make the outline a little thicker
}
 
function draw() {
  // pmouseX = where the mouse was one frame ago
  if (mouseX > pmouseX) {
    // mouse moved right: grow
    circleSize = circleSize + 1;
  } else if (mouseX < pmouseX) {
    // mouse moved left: shrink
    circleSize = circleSize - 1;
  } else {
    // mouse did not move left or right: keep the same size
    circleSize = circleSize;
  }
 
  // keep the circle between 5 and 150 pixels
  if (circleSize < 5) {
    circleSize = 5;
  }
  if (circleSize > 150) {
    circleSize = 150;
  }
 
  fill(r, g, b);
  circle(mouseX, mouseY, circleSize);
}
 
// runs once every time you click
function mousePressed() {
  r = random(255);
  g = random(255);
  b = random(255);
}
 
// runs once every time you press a key
function keyPressed() {
  if (key === 'c' || key === 'C') {
    background(20);
  }
}