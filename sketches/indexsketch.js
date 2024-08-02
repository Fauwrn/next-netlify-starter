let windowAspect;

function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/sustained.png');
  portrait = loadImage('assets/Portrait1.png');
  gif = loadImage('assets/PlayerBW.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  windowResized();

}

function draw() {
  background(0);  //sets background
  let mouseWRatio = 0.5-(mouseX/width);
  let mouseHRatio = 0.5-(mouseY/height);

  imageMode(CENTER);
  image(bgImg, width*0.5+(0.5-mouseWRatio*20), height*0.5+(0.5-mouseHRatio*20), 1920, 1080); //background image
  
  noStroke();
  rectMode(CENTER);
  let paralaxAmt = 10;
  translate(mouseWRatio*paralaxAmt,mouseHRatio*paralaxAmt); ///PARALAXING
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 
