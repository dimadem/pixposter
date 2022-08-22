/* eslint-disable no-undef, no-unused-vars */

// inspired by Tim Rodenbröker & his youtube channel
// So Tim if you being there - thank you!
// https://www.youtube.com/watch?v=KL_b6eTm9Ag&t=1934s

// const variables
const fr = 60;
const pd = 1.0;
const cW = 1752;
const cH = 810;
const wW = 584;
const wH = 810;

// variables
let images = [];
let currentImage;
let source, target, result; // canvases
let sx, sy, sw, sh, dx, dy, dw, dh; // copy

// interface
let button;
let thresholdBrightness = 57;

// TILE for result
// One PIXEL
let TILES_X = wW / 9;
let TILES_Y = wH / 9;
let tileW, tileH;
let px, py;
let colors = [];

// magic effects
let c, b; // colour, brightness
let scalar = 1; // scale source
let offsetX = 0; // position source
let offsetY = 0;
let sq = -70; // square size

function Canvas(p5) {
  //   p5.preload = () => {
  //     for (let i = 1; i <= 4; i++) {
  //       images.push(p5.loadImage("./img/1.JPG"));
  //     }
  //   };

  p5.setup = () => {
    // basic setup
    p5.frameRate(fr);
    p5.colorMode(p5.RGB, 255, 255, 255, 255);

    // main canvas
    p5.createCanvas(cW, cH);
    p5.background(241, 241, 241);

    // canvases setup
    source = p5.createGraphics(wW, wH);
    target = p5.createGraphics(wW, wH);
    result = p5.createGraphics(wW, wH);

    // first image on drawTarget this is demo add api
    // currentImage = p5.loadImage(props.image);
  };
  //
  p5.draw = () => {
    // draw functions
    drawSource();
    drawTarget();
    drawResult();

    // frames
    p5.image(source, 0, 0);
    p5.image(target, wW, 0);
    p5.image(result, wW * 2, 0);

    // copy brush
    p5.noFill();
    p5.strokeWeight(2);
    p5.stroke(0, 255, 0);
    p5.rect(p5.mouseX, p5.mouseY, sq, sq);

    // paste brush
    p5.noFill();
    p5.stroke(255, 0, 255);
    p5.rect(p5.mouseX + wW, p5.mouseY, sq, sq);
  };

  //test it
  function drawSource() {
    // drawSource
    source.background(241, 241, 241);
    source.imageMode(p5.CENTER);
    source.push();
    source.translate(source.width / 2 + offsetX, source.height / 2 + offsetY);
    source.scale(scalar);
    source.image(currentImage, 0, 0);
    source.pop();
  }

  function drawTarget() {
    // setup copy parameters
    sx = p5.mouseX;
    sy = p5.mouseY;
    sw = sq;
    sh = sq;
    dx = p5.mouseX;
    dy = p5.mouseY;
    dw = sq;
    dh = sq;

    // copy picture to buffer
    let sourceBuffer = source.get();

    // target.background(241, 241, 241);

    // freeze background
    // if (p5.frameRate === 1) {
    //   target.background(0);
    // }

    //copy-paste square
    if (p5.mouseIsPressed) {
      //   target.background(421, 421, 421);
      target.copy(sourceBuffer, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }

  function drawResult() {
    // decrease Canvas resolution
    tileW = wW / TILES_X;
    tileH = wH / TILES_Y;

    // copy from target data
    let bufferTarget = target.get();

    // BG COLOR
    result.background(241, 241, 241);
    result.noStroke();

    for (let col = 0; col < TILES_X; col++) {
      for (let row = 0; row < TILES_Y; row++) {
        // each pixel of grid is stored
        px = Math.floor(col * tileW);
        py = Math.floor(row * tileH);

        // get color from buffer of each pixel
        c = bufferTarget.get(px, py);
        // brightness
        b = p5.brightness(c);

        if (b > thresholdBrightness) {
          result.fill(0);
        } else {
          result.fill(241, 241, 241);
        }

        result.push();
        result.translate(col * tileW, row * tileH);
        result.rect(0, 0, tileW, tileH);
        result.pop();
      }
    }
  }

  // key change image
  function keyPressed() {
    // 1, 2, 3, 4 photos
    if (keyCode === 49) {
      currentImage = images[0];
      console.log(currentImage);
    }
    if (keyCode === 50) {
      currentImage = images[1];
      console.log(currentImage);
    }
    if (keyCode === 51) {
      currentImage = images[2];
    }
    if (keyCode === 52) {
      currentImage = images[3];
    }
    // r - random scale and position
    if (keyCode === 82) {
      scalar = random(1, 5);
      offsetX = random(-800, 800);
      offsetY = random(-800, 800);
    }

    // consoles
    console.log(key, "key");
    console.log(keyCode, "KeyCode");
  }

  // ui square size
  function mouseWheel(event) {
    console.log(event.delta);
    //move the square according to the vertical scroll amount
    sq += event.delta;

    //uncomment to block page scrolling
    //return false;
  }

  // This Redraws the Canvas when resized
  // windowResized = function () {
  //   resizeCanvas(windowWidth, windowHeight);
  // };
}

export default Canvas;
