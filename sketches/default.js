let windowAspect;
let color_mode = 0;
let image_movement = 0;
let image_movement_rand = 0;
let x = 0;
let y = 0;



function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  portrait = loadImage('assets/Portrait1.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  windowResized();
  noSmooth();

}

function draw() {
  background(color_mode);  //sets background
  let mouseWRatio = 0.5+(mouseX/width);
  let mouseHRatio = 0.5+(mouseY/height);
  x = lerp(x, mouseX, 0.05);
  y = lerp(y, mouseY, 0.05);
  let paralaxAmt = 10;
  push();
  
  if(frameCount%60 == 0 ) {
    image_movement_rand = random(10)
  }

  image_movement = lerp(image_movement,image_movement_rand,0.01)
  translate(image_movement,image_movement); ///image_movement
  translate(-mouseWRatio*paralaxAmt,-mouseHRatio*paralaxAmt); ///PARALAXING
  imageMode(CENTER);
  //image(bgImg, width*0.5, height*0.5, 1920, 1080); //background image
  //image(bgImg, width*0.5, height*0.5, bgImg.width*0.35, bgImg.height*0.35); //background image
  pop();
  
  
  
  push();
  textAlign(CENTER,CENTER)
  textSize(32)
  fill(255)
  stroke(0)
  //text('Benjamin Thorn', x, y)
  pop();



  interiorBox()

  push();
  imageMode(CENTER);
  image(gif,x,y);
  //image(entrance,width*0.5,height*0.85, entrance.width*1, entrance.height*1);
  pop();

  push();
  textAlign(CENTER,TOP)
  textSize(16)
  fill(255)
  stroke(0)
  rectMode(CENTER)
  //text(bioString, width*0.5, 140, width*0.5)

  


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 


function interiorBox() {
  push()
  noStroke();
  fill(color_mode);
  rect(width/2,height/2,width/2,height);
  pop()
}
