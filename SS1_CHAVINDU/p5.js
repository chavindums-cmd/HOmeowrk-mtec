// Name: Chavindu
// Title: Stage Lights
// Theme: I am exploring concert stages and lighting.
// This sketch adds = lights to my simple stage.


let brightness = 100;
let lightsOn = true;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(30, 30, 50);

  brightness = brightness + 25;  // Increase brightness over time, then start again

  if (brightness > 255) {
    brightness = 50;
  }

  stroke(150);  // Truss
  strokeWeight(4);
  line(50, 50, 550, 50);

  
  stroke(0);   // Two rectangular lights
  strokeWeight(2);
  fill(80);
  rect(130, 50, 40, 30);
  rect(430, 50, 40, 30);

  if (lightsOn)  // Light beams
    {
    noStroke();
    fill(255, 100, 100);

    triangle(150, 80, 70, 400, 270, 400);
    triangle(450, 80, 330, 400, 530, 400);
  }

  stroke(0); // Stage
  strokeWeight(2);
  fill(100);
  rect(50, 400, 500, 100);

  stroke(220);  // Microphone stand
  strokeWeight(5);
  line(300, 300, 300, 400);
  line(275, 400, 325, 400);

  stroke(0); // Microphone
  strokeWeight(1);
  fill(180);
  ellipse(300, 290, 20, 35);
}
