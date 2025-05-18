let windowAspect;
let x;
let y;
var canvas


function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

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
  image(gif,x,y,gif.height/2,gif.width/2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 

function mousePressed(){
  clear();
}
