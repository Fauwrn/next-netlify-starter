let windowAspect;

function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04S.jpg');
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
  let mouseWRatio = 0.5+(mouseX/width);
  let mouseHRatio = 0.5+(mouseY/height);

  let paralaxAmt = 10;
  push();
  translate(-mouseWRatio*paralaxAmt,-mouseHRatio*paralaxAmt); ///PARALAXING

  imageMode(CENTER);
  image(bgImg, width*0.5, height*0.5, 1920, 1080); //background image
  
  
  pop();
  noStroke();
  fill(0);
  rect(0,0,width/4,height);
  rect((width/4)*3,0,width/4,height);
  rect(0,0,width,height/4);
  rect(0,(height/4)*3,width,height);
  
  push();
  imageMode(CENTER);
  image(gif,width*0.5,height*0.5);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 
