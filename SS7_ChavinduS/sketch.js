// Name: Chavindu S
// Title: Traces of Presence
// Building from: Short Study #5 — Ripple Grid
// Concept: An orderly field changes when someone enters it.
// The dots move away from the viewers mouse and leave traces,
// then slowly return to their original positions.
// Instructions Move the mouse through the dots.
// Click to change their color.

// Array holding all the dot objects
let dots = [];
let dotColor;

function setup() {
  createCanvas(900, 700);
  background(12, 18, 25);
  dotColor = color(100, 210, 220);

  // Build SS5s gridusing objects(dot) instead of plain elipses
  for (let x = 30; x < width; x += 30) {
    for (let y = 30; y < height; y += 30) {
      dots.push(new MovingDot(x, y));
    }
  }
}

function draw() {
  // A tranparent background creates fading trails
  background(12, 18, 25, 45);

  // Move and draw every object in the array
  for (let i = 0; i < dots.length; i++) {
    dots[i].move();
    dots[i].display();
  }
}

// Clicking to changing a new color for the field
function mousePressed() {
  dotColor = color(
    random(100, 255),
    random(100, 255),
    random(100, 255)
  );
}

// Each dot remember it current and original positions
class MovingDot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.homeX = x;
    this.homeY = y;
    this.size = 5;
  }

  // Reacting to the mouse and return home
  move() {
    let d = dist(this.x, this.y, mouseX, mouseY);

    // Nearby dot move away from the mouse
    if (d < 100) {
      this.x += (this.x - mouseX) * 0.06;
      this.y += (this.y - mouseY) * 0.06;
      this.size = 9;
    } else {
      this.size = 5;
    }

    // Move a small part of the distnce back home each frame
    this.x += (this.homeX - this.x) * 0.03;
    this.y += (this.homeY - this.y) * 0.03;
  }

  // Drawing the dot
  display() {
    noStroke();
    fill(dotColor);
    ellipse(this.x, this.y, this.size, this.size);
  }
}