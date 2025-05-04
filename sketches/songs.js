let windowAspect;
let color_mode = 0;
let image_movement = 0;
let image_movement_rand = 0;
let x = 0;
let y = 0;

//Floating effect:
let floatOffset
let floatSpeed

let song = [];
let erosion;


let bioString = 'Benjamin Thorn is an artist and designer whose work as a digital artist explores virtual space as an interface for software instruments, focusing on alienation and the politics of aesthetics in obscurantism.';
let bioStringShuffled= '';
let bioArray = [];
let bioArrayShuffled = [];

let stylingString = '***** {}{}{} [][][] ____ ------ &&&&& ^^^^^^ %%%% |||||| /////'
let stylingArray = [];
let bioRandPos = 0;


function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  portrait = loadImage('assets/Portrait1.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

  erosion = loadStrings('/assets/songs/erosion.txt');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  windowResized();
  noSmooth();
  
  bioArray = split(bioString, ' ');
  bioStringShuffled = bioString;

  stylingArray = split(stylingString, ' ');

  song = erosion;

  floatOffset = random(TWO_PI); 
  floatSpeed = random(0.01, 0.03);

}

function draw() {
  background(color_mode);  //sets background
  let mouseWRatio = 0.5+(mouseX/width);
  let mouseHRatio = 0.5+(mouseY/height);
  let paralaxAmt = 10;
  push(); 

  let floatY = sin(floatOffset) * 1; // drift up and down
  translate(floatY, floatY);
  
  if(frameCount%60 == 0 ) {
    image_movement_rand = random(10)
  }

  image_movement = lerp(image_movement,image_movement_rand,0.01)
  //translate(image_movement,image_movement); ///image_movement
  //translate(-mouseWRatio*paralaxAmt,-mouseHRatio*paralaxAmt); ///PARALAXING
  imageMode(CENTER);


  


  //image(bgImg, width*0.5, height*0.5, 1920, 1080); //background image
  //image(bgImg, width*0.5, height*0.5, bgImg.width*0.35, bgImg.height*0.35); //background image  

  //borderBoxes();

  //image(gif,width*0.5,height*0.5);
  //image(entrance,width*0.5,height*0.85, entrance.width*1, entrance.height*1);
  //pop();


  //push();
  rectMode(CENTER)
  textAlign(CENTER,TOP)

  textSize(16)
  fill(255)
  stroke(0)

  for (let i = 0; i < song.length; i++) {
    text(song[i], width*0.5, 140+(i*20), width*0.5)
  }
  pop();

  floatOffset += floatSpeed; // keep moving
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 

function borderBoxes() {
  push()
  noStroke();
  fill(color_mode);
  rect(0,0,width/4,height);
  rect((width/4)*3,0,width/4,height);
  rect(0,0,width,height/4);
  rect(0,(height/4)*3,width,height);
  pop()
}