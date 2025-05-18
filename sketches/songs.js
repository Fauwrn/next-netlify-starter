let windowAspect;

//Floating effect:
let floatOffset
let floatSpeed

let song = [];
let erosion;



function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  portrait = loadImage('assets/Portrait1.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

  erosion = loadStrings('/assets/songs/erosion.txt');

}

function setup() {
  background(255);
  windowResized();
  noSmooth();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)
  canvas.style('z-index','-1')
  

  song = erosion;

  floatOffset = random(TWO_PI); 
  floatSpeed = random(0.01, 0.02);

}

function draw() {
  background(255);  //sets background
  push(); 

  let floatY = sin(floatOffset) * 2; // drift up and down
  translate(floatY, floatY);

  imageMode(CENTER);



  //push();
  rectMode(CENTER)
  textAlign(CENTER,TOP)

  textSize(16)
  fill(0)
  stroke(255)

  for (let i = 0; i < song.length; i++) {
    text(song[i], width*0.5, 160+(i*20), width*0.5)
  }
  pop();

  floatOffset += floatSpeed; // keep moving
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 
