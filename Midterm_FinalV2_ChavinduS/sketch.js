/*
  Name: Chavindu S.
  Title: Bindlestiff - A Photo Experience (Version 2)

  Theme:
  Version 2 of my photo slideshow, built around my 209 photos from
  the CUNY CT Bindlestiff shoot. The photos now move: they slide in
  and slowly zoom, a flip-book mode plays the sequential photos
  like a stop-motion animation, music plays in the background,
  and a recap mode plays a recap video.

  Instructions:
  - MENU: click SLIDESHOW, FLIP-BOOK, SHUFFLE or RECAP.
  - Music starts after your first click.
      S = sound on / off.
  - SLIDESHOW: each photo slides in and slowly zooms.
      The photo slides in from the side your mouse is on
      (left, right, top or bottom).
      A = switch between AUTO (changes every 4 seconds) and MANUAL.
      RIGHT / LEFT arrows = next / previous photo.
  - FLIP-BOOK: the photos play fast, like stop-motion,
      while slowly zooming in.
      SPACE = pause / play.
      UP / DOWN arrows = faster / slower.
  - SHUFFLE: a random photo every 3 seconds. Click for another.
      Each photo grows and fades in.
  - RECAP: plays the recap video. It goes back to the menu when it ends.
      SPACE = pause / play.
  - M = back to the menu.   E = end screen.
  - END SCREEN: click to start over.
*/

// my variables
let photos = [];        // list that holds all the photos
let totalPhotos = 209;  // how many photos there are
let state = 'menu';     // 'menu', 'slideshow', 'flipbook', 'shuffle', 'recap' or 'end'
let current = 0;        // which photo is showing (0 is the first one)
let lastChange = 0;     // time of the last photo change
let menuPhoto = 0;      // which random photo shows behind the menu

// animation variables
let photoX = 0;         // x position of the photo (for sliding in)
let photoY = 0;         // y position of the photo (for sliding in)
let zoom = 1;           // how zoomed in the photo is (1 = normal size)
let autoPlay = true;    // slideshow: true = automatic, false = manual
let flipSpeed = 120;    // flip-book: milliseconds per photo
let paused = false;     // flip-book: is it paused?

// sound and video variables
let music;              // background music (assets/music.mp3)
let musicOn = false;    // turns on after the first click
let musicPlaying = false; // is the music playing right now?
let recap;              // recap video (assets/recap.mp4)

// async setup: WAIT for all the photos to load before starting
async function setup() {
  createCanvas(900, 650);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);

  // load CUNYCTBINDLESTIFF-1.jpg up to CUNYCTBINDLESTIFF-209.jpg
  for (let i = 1; i <= totalPhotos; i++) {
    let img = await loadImage('assets/CUNYCTBINDLESTIFF-' + i + '.jpg');
    photos.push(img);
    drawLoading(i);     // show the progress so it doesn't look frozen
  }

  menuPhoto = floor(random(totalPhotos));   // pick a random photo for the menu

  // music and recap video
  music = createAudio('assets/music.mp3');
  music.volume(0.5);
  recap = createVideo('assets/recap.mp4');
  recap.hide();                 // hide the HTML video, we draw it on the canvas i took this from google
  recap.onended(recapFinished); // when the video ends, go back to the menu i too this from google
}
// draws the current state
function draw() {
  background(20);
  updateMusic();

  if (state === 'menu') {
    drawMenu();
  } else if (state === 'slideshow') {
    drawSlideshow();
  } else if (state === 'flipbook') {
    drawFlipbook();
  } else if (state === 'shuffle') {
    drawShuffle();
  } else if (state === 'recap') {
    drawRecap();
  } else {
    drawEnd();
  }
}

// ---------- LOADING SCREEN ----------
function drawLoading(count) {
  background(20);
  noStroke();
  fill(255);
  textSize(24);
  text('Loading photos... ' + count + ' / ' + totalPhotos, width / 2, height / 2 - 20);

  // loading bar
  noFill();
  stroke(255);
  rect(width / 2 - 200, height / 2 + 20, 400, 16);
  noStroke();
  fill(255);
  rect(width / 2 - 200, height / 2 + 20, 400 * count / totalPhotos, 16);
}

// ---------- STATE 1: MENU ----------
function drawMenu() {
  // random photo in the background, faded, slowly zooming
  zoom = zoom + 0.0005;
  let img = photos[menuPhoto];
  let s = max(width / img.width, height / img.height) * zoom;
  tint(255, 70);
  image(img, width / 2, height / 2, img.width * s, img.height * s);
  noTint();

  noStroke();
  fill(255);
  textSize(48);
  text('BINDLESTIFF', width / 2, 130);

  textSize(18);
  text(totalPhotos + ' photographs by Chavindu S.', width / 2, 180);

  drawButton('SLIDESHOW', 270);
  drawButton('FLIP-BOOK', 345);
  drawButton('SHUFFLE', 420);
  drawButton('RECAP', 495);

  textSize(13);
  fill(170);
  if (musicOn) {
    text('S = sound off', width / 2, 590);
  } else {
    text('Click anywhere to turn on the music', width / 2, 590);
  }
}

// draws a button that turns white when the mouse is over it
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

// ---------- STATE 2: SLIDESHOW (slide in + slow zoom) ----------
function drawSlideshow() {
  // timed event: only in AUTO mode
  if (autoPlay && millis() - lastChange > 4000) {
    nextPhoto();
  }

  // slide the photo toward the center, 40 pixels each frame
  let centerX = width / 2;
  let centerY = (height - 80) / 2;

  if (photoX < centerX) {
    photoX = photoX + 40;
  } else if (photoX > centerX) {
    photoX = photoX - 40;
  }
  if (photoY < centerY) {
    photoY = photoY + 40;
  } else if (photoY > centerY) {
    photoY = photoY - 40;
  }

  // when it's close enough, snap it exactly to the center 
  if (abs(photoX - centerX) < 40) {
    photoX = centerX;
  }
  if (abs(photoY - centerY) < 40) {
    photoY = centerY;
  }

  // slowly zoom in
  zoom = zoom + 0.0008;

  showPhoto(photoX, photoY, zoom);

  let mode = 'MANUAL';
  if (autoPlay) {
    mode = 'AUTO';
  }
  drawInfo('Photo ' + (current + 1) + ' of ' + totalPhotos + '   (' + mode + ')',
           'A = auto / manual     Arrows = next / back     M = menu     E = end');
}

function nextPhoto() {
  current = current + 1;
  if (current >= totalPhotos) {
    current = totalPhotos - 1; // stay on the last photo
    state = 'end';             // the show is over
  }
  newPhotoEffect();
}

function previousPhoto() {
  current = current - 1;
  if (current < 0) {
    current = 0;               // can't go before the first photo
  }
  newPhotoEffect();
}

// starts the slide-in from the side the mouse is on,
// and resets the zoom, every time the photo changes
function newPhotoEffect() {
  let centerX = width / 2;
  let centerY = (height - 80) / 2;

  // how far the mouse is from the center
  let distX = mouseX - centerX;
  let distY = mouseY - centerY;

  // start at the center, then move it off-screen on the mouse's side https://p5js.org/reference/p5/abs/
  photoX = centerX;
  photoY = centerY;

  if (abs(distX) > abs(distY)) {
    // mouse is more to the LEFT or RIGHT
    if (distX < 0) {
      photoX = -500;            // come in from the left
    } else {
      photoX = width + 500;     // come in from the right
    }
  } else {
    // mouse is more to the TOP or BOTTOM
    if (distY < 0) {
      photoY = -500;            // come in from the top
    } else {
      photoY = height + 500;    // come in from the bottom
    }
  }

  zoom = 1;
  lastChange = millis();
}

// ---------- STATE 3: FLIP-BOOK (stop-motion) ---------- this is new code i added to make the flipbook mode work
function drawFlipbook() {
  // timed event: switch photos very fast
  if (!paused && millis() - lastChange > flipSpeed) {
    current = current + 1;
    if (current >= totalPhotos) {
      current = 0;             // loop back to the start
      zoom = 1;                // and start the zoom over
    }
    lastChange = millis();
  }

  // slowly zoom in while it plays (not while paused)
  if (!paused) {
    zoom = zoom + 0.0006;
  }

  showPhoto(width / 2, (height - 80) / 2, zoom);

  let status = round(1000 / flipSpeed) + ' photos per second';
  if (paused) {
    status = 'PAUSED';
  }
  drawInfo('Flip-book: photo ' + (current + 1) + '   (' + status + ')',
           'SPACE = pause / play     UP / DOWN = faster / slower     M = menu');
}

// ---------- STATE 4: SHUFFLE ----------
function drawShuffle() {
  // timed event: random photo every 3 seconds
  if (millis() - lastChange > 3000) {
    randomPhoto();
  }

  // animation: over the first 0.8 seconds the photo grows and fades in
  let progress = (millis() - lastChange) / 800;   // goes from 0 to 1
  if (progress > 1) {
    progress = 1;
  }
  let grow = 0.6 + 0.4 * progress;    // size: from 60% up to 100%
  let fade = 255 * progress;          // see-through to solid

  tint(255, fade);
  showPhoto(width / 2, (height - 80) / 2, grow);
  noTint();

  drawInfo('Shuffle: photo ' + (current + 1),
           'Click for another     M = menu     E = end');
}

function randomPhoto() {
  current = floor(random(totalPhotos));   // random number from 0 to 208
  lastChange = millis();
}

// ---------- STATE 5: RECAP VIDEO ----------
function drawRecap() {
  // only draw once the video has loaded (width is 0 before that)
  if (recap.width > 0) {
    let s = min(width / recap.width, (height - 80) / recap.height);
    image(recap, width / 2, (height - 80) / 2, recap.width * s, recap.height * s);
  } else {
    fill(255);
    textSize(18);
    text('Loading recap video...', width / 2, height / 2);
  }

  drawInfo('Recap reel', 'SPACE = pause / play     M = menu     E = end');
}

function startRecap() {
  state = 'recap';
  recap.time(0);   // start from the beginning
  recap.play();
  paused = false;
}

// runs by itself when the recap video ends
function recapFinished() {
  if (state === 'recap') {
    restart();
  }
}

// ---------- MUSIC: plays everywhere except during the recap video ----------
function updateMusic() {
  if (musicOn && state !== 'recap') {
    if (!musicPlaying) {
      music.loop();
      musicPlaying = true;
    }
  } else {
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
    }
  }
}

// ---------- STATE 6: END ----------
function drawEnd() {
  noStroke();
  fill(255);
  textSize(40);
  text('Thanks for watching', width / 2, height / 2 - 30);
  textSize(18);
  text('Click to start over', width / 2, height / 2 + 30);
}

// start over from the beginning
function restart() {
  recap.stop();   // stop the video if it was playing
  state = 'menu';
  current = 0;
  zoom = 1;
  paused = false;
  menuPhoto = floor(random(totalPhotos));   // new random photo for the menu
}

// ---------- show the current photo at x, y with a zoom amount ----------
function showPhoto(x, y, z) {
  let img = photos[current];
  let s = min(width / img.width, (height - 80) / img.height) * z;
  image(img, x, y, img.width * s, img.height * s);
}

// black bar at the bottom with two lines of text
function drawInfo(topText, bottomText) {
  noStroke();
  fill(0);
  rect(0, height - 80, width, 80);
  fill(255);
  textSize(18);
  text(topText, width / 2, height - 52);
  fill(170);
  textSize(13);
  text(bottomText, width / 2, height - 22);
}

// ---------- MOUSE ---------- https://p5js.org/reference/p5/mousePressed/
function mousePressed() {
  musicOn = true;   // browsers only allow sound after a click

  if (state === 'menu') {
    if (mouseOver(270)) {
      state = 'slideshow';
      current = 0;              // always start at the first photo
      newPhotoEffect();
    } else if (mouseOver(345)) {
      state = 'flipbook';
      current = 0;
      zoom = 1;
      paused = false;
      lastChange = millis();
    } else if (mouseOver(420)) {
      state = 'shuffle';
      randomPhoto();
    } else if (mouseOver(495)) {
      startRecap();
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
    recap.stop();
    state = 'end';
  } else if (key === 's' || key === 'S') {
    musicOn = !musicOn;         // sound on / off
  } else if (state === 'recap' && key === ' ') {
    if (paused) {
      recap.play();
    } else {
      recap.pause();
    }
    paused = !paused;
  } else if (state === 'slideshow') {
    if (key === 'ArrowRight') {
      nextPhoto();
    } else if (key === 'ArrowLeft') {
      previousPhoto();
    } else if (key === 'a' || key === 'A') {
      autoPlay = !autoPlay;     // flip between true and false
      lastChange = millis();
    }
  } else if (state === 'flipbook') {
    if (key === ' ') {
      paused = !paused;
    } else if (key === 'ArrowUp') {
      flipSpeed = flipSpeed - 20;   // less time per photo = faster
      if (flipSpeed < 40) {
        flipSpeed = 40;
      }
    } else if (key === 'ArrowDown') {
      flipSpeed = flipSpeed + 20;   // more time per photo = slower
      if (flipSpeed > 500) {
        flipSpeed = 500;
      }
    }
  }
}
