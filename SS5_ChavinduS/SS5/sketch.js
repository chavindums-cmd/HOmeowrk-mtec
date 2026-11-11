// Name: Chavindu s
// Title: Ripple Grid
 
//Instructions for the user:
// Move the mouse over the dots. Dots near the mouse grow and light up.
// Click to change the colour (it is random every time).
 
let dotColor;
 
function setup() {
  createCanvas(1000, 1000);
  dotColor = color(255, 100, 150);
}
 
function draw() {
  background(20);
 
  // PATTERN 1: a grid of dots (one for loop inside another)
  noStroke();
  for (let x = 30; x < width; x += 60) {
    for (let y = 30; y < height; y += 60) {
      let d = dist(x, y, mouseX, mouseY);
 
      // CONDITONAL: dots close to the mouse are big and coloured
      if (d < 150) {
        fill(dotColor);
        ellipse(x, y, 50 - d / 4);
      } else {
        fill(80);
        ellipse(x, y, 10);
      }
    }
  }
 
  // PATTERN 2: rings around the mouse (second for loop)
  noFill();
  stroke(dotColor);
  for (let i = 1; i <= 4; i++) {
    ellipse(mouseX, mouseY, i * 40);
  }
}
 
// Click:pick a new random colour
function mousePressed() {
  dotColor = color(random(255), random(255), random(255));
}