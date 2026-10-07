// Chavindu S.
// Short Study #2: Moving Stage Lights
// My semester theme is lighting for live performances.
// This drawing explores how two moving beams change a simple 2D stage.
// Move the mouse left and right to aim the beams slightly.
// Click the drawing to change the light colors.

let beamMove = 0;
let beamSpeed = 0.3;
let lightColor = 190;

function setup() {
  createCanvas(800, 550);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(230, 40, 12);


  beamMove = beamMove + beamSpeed;  // Increase or decrease the beam position each frame.


  if (beamMove > 30 || beamMove < -30)   // Reverse direction so the beams only move a little.
    {
    beamSpeed = beamSpeed * -1;
  }

  let mouseMove = (mouseX - width / 2) / 10; // Mouse movement adds a small change to the beam direction.

  noStroke();

  fill(230, 20, 25);   // A simple flat stage.
  rect(60, 430, 680, 35);


  fill(lightColor, 70, 100, 45); // Left beam.
  triangle(220, 110,
           130 + beamMove + mouseMove, 430,
           310 + beamMove + mouseMove, 430);

  fill((lightColor + 100) % 360, 70, 100, 45);   // Right beam moves in the opposite direction.
  triangle(580, 110,
           490 - beamMove + mouseMove, 430,
           670 - beamMove + mouseMove, 430);

 
  fill(0, 0, 45);   // Two lighting fixtures.
  rect(200, 80, 40, 30);
  rect(560, 80, 40, 30);

  fill(0, 0, 100);
  textAlign(CENTER);
  textSize(22);
  text('Moving Stage Lights', width / 2, 35);
  textSize(14);
  text('Move the move lights. Click to change colors.', width / 2, 510);
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    lightColor = (lightColor + 60) % 360;
  }
}