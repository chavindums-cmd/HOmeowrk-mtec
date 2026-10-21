/*
  Name: Chavindu S.
  Title: Bindlestiff - A Photo Experience

  Theme:
  An expanded version of my SS4 photo slideshow, built around my
  209 photos from the CUNY City Tech Bindlestiff circus shoot. The viewer moves
  between a start menu, a slideshow, and an end screen.

  Instructions:
  - MENU: click SLIDESHOW or SHUFFLE.
  - SLIDESHOW: a new photo every 4 seconds.
    RIGHT arrow = next photo, LEFT arrow = previous photo.
  - SHUFFLE: a random photo every 3 seconds. Click for another.
  - Press M to go back to the menu (a new random photo appears). I added this as an experiment
   to practically use this code to show case an album to connect to a website. 
  - Press E to go to the end screen.
  - END SCREEN: click to start over.
*/

// my variables

let photos = [];        // list that holds all the photos
let totalPhotos = 209;  // how many photos there are
let state = 'menu';     // 'menu', 'slideshow', 'shuffle' or 'end'
let current = 0;        // which photo is showing (0 is the first one)
let lastChange = 0;     // time of the last photo change
let menuPhoto = 0;      // which random photo shows behind the menu

// async setup: WAIT for all the photos to load before starting

async function setup() {
  createCanvas(900, 650);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  // load CUNYCTBINDLESTIFF-1.jpg up to CUNYCTBINDLESTIFF-209.jpg

  for (let i = 1; i <= totalPhotos; i++) {
    let img = await loadImage('assets/CUNYCTBINDLESTIFF-' + i + '.jpg');
    photos.push(img);
  }

  menuPhoto = floor(random(totalPhotos));   // pick a random photo for the menu
}

function draw() {
  background(20);

  if (state === 'menu') {
    drawMenu();
  } else if (state === 'slideshow') {
    drawSlideshow();
  } else if (state === 'shuffle') {
    drawShuffle();
  } else {
    drawEnd();
  }
}

// ---------- STATE 1: MENU ----------

function drawMenu() {
  // random photo in the background, faded so the text is easy to read
  let img = photos[menuPhoto];
  let s = max(width / img.width, height / img.height);  // fill the screen without stretching
  tint(255, 70);
  image(img, width / 2, height / 2, img.width * s, img.height * s);
  noTint();

  noStroke();
  fill(255);
  textSize(48);
  text('BINDLESTIFF', width / 2, 180);

  textSize(18);
  text(totalPhotos + ' photographs by Chavindu S.', width / 2, 230);

  drawButton('SLIDESHOW', 330);
  drawButton('SHUFFLE', 420);
}

// draws a button that turns white when the mouse is over it. got this from https://p5js.org/reference/p5/createButton/

function drawButton(label, y) {
  if (mouseOver(y)) {
    noStroke();
    fill(255);
    rect(width / 2 - 120, y - 30, 240, 60);
    fill(0);
  } else {
    noFill();
    stroke(255);
    rect(width / 2 - 120, y - 30, 240, 60);
    noStroke();
    fill(255);
  }
  textSize(22);
  text(label, width / 2, y);
}

// true if the mouse is on the button at height y

function mouseOver(y) {
  if (mouseX > width / 2 - 120 && mouseX < width / 2 + 120 &&
      mouseY > y - 30 && mouseY < y + 30) {
    return true;
  } else {
    return false;
  }
}

// ---------- STATE 2: SLIDESHOW ----------

function drawSlideshow() {
  // timed event: next photo every 4 seconds

  if (millis() - lastChange > 4000) {
    nextPhoto();
  }

  showPhoto();

  fill(255);
  textSize(18);
  text('Photo ' + (current + 1) + ' of ' + totalPhotos, width / 2, height - 40);
  textSize(13);
  text('Arrows = next / back     M = menu     E = end', width / 2, height - 15);
}

function nextPhoto() {
  current = current + 1;
  if (current >= totalPhotos) {
    current = totalPhotos - 1; // stay on the last photo
    state = 'end';             // the show is over
  }
  lastChange = millis();
}

function previousPhoto() {
  current = current - 1;
  if (current < 0) {
    current = 0;              // can't go before the first photo
  }
  lastChange = millis();
}

// ---------- STATE 3: SHUFFLE ---------- // some of this code i used google to get help with, 
// but i modified it to fit my project. i used this website: https://p5js.org/reference/#/p5/millis

function drawShuffle() {
  // timed event: random photo every 3 seconds
  if (millis() - lastChange > 3000) {
    randomPhoto();
  }

  showPhoto();

  fill(255);
  textSize(18);
  text('Shuffle: photo ' + (current + 1), width / 2, height - 40);
  textSize(13);
  text('Click for another     M = menu     E = end', width / 2, height - 15);
}

function randomPhoto() {
  current = floor(random(totalPhotos));   // random number from 0 to 208
  lastChange = millis();
}

// ---------- STATE 4: END ----------

function drawEnd() {
  fill(255);
  textSize(40);
  text('Thanks for watching', width / 2, height / 2 - 30);
  textSize(18);
  text('Click to start over', width / 2, height / 2 + 30);
}

// start over from the beginning

function restart() {
  state = 'menu';
  current = 0;
  menuPhoto = floor(random(totalPhotos));   // new random photo for the menu
}

// ---------- show the current photo without stretching it ---------- // got this code from google, 
// but i modified it to fit my project. 

function showPhoto() {
  let img = photos[current];
  let s = min(width / img.width, (height - 80) / img.height);
  image(img, width / 2, (height - 80) / 2, img.width * s, img.height * s);
}

// ---------- MOUSE ----------

function mousePressed() {
  if (state === 'menu') {
    if (mouseOver(330)) {
      state = 'slideshow';
      current = 0;            // always start at the first photo
      lastChange = millis();
    } else if (mouseOver(420)) {
      state = 'shuffle';
      randomPhoto();
    }
  } else if (state === 'shuffle') {
    randomPhoto();
  } else if (state === 'end') {
    restart();
  }
}

// ---------- KEYBOARD ----------

function keyPressed() {
  if (key === 'm' || key === 'M') {
    restart();
  } else if (key === 'e' || key === 'E') {
    state = 'end';
  } else if (state === 'slideshow' && key === 'ArrowRight') {
    nextPhoto();
  } else if (state === 'slideshow' && key === 'ArrowLeft') {
    previousPhoto();
  }
}