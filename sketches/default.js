let windowAspect;
let x;
let y;
var canvas

let playerGif, fireGif, keyGif
let gif = []

let counter = 0;

function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  playerGif = loadImage('assets/PlayerBW.gif');
  fireGif = loadImage('assets/images/fire.gif');
  keyGif = loadImage('assets/images/key.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

  gif = [playerGif,fireGif,keyGif]

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)
  canvas.style('z-index','0')
  windowResized();
  noSmooth();
  x = width/2
  y = height/2
}

function draw() {
  //background(color_mode);  //sets background
  x = lerp(x, mouseX, 0.05);
  y = lerp(y, mouseY, 0.05);

  imageMode(CENTER);

  image(gif[counter],x,y,gif[counter].height/2,gif[counter].width/2);

  //line(pmouseX, pmouseY, mouseX, mouseY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 

function mousePressed(){
  clear();
  counter ++
  counter = counter % 3
}
