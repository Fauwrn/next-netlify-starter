let windowAspect;
let canvas;
let color_mode = 0;
let image_movement = 0;
let image_movement_rand = 0;
let x = 0;
let y = 0;

let bioString = 'Benjamin Thorn is an artist and designer whose work as a digital artist explores virtual space as an interface for software instruments, focusing on alienation and the politics of aesthetics in obscurantism. Their practice also includes releasing and performing ambient-shoegaze music under the alias [my grey leaving].';
let bioStringShuffled= '';
let bioArray = [];
let bioArrayShuffled = [];

let stylingString = '____ {}{}{} [][][] ***** ------ &&&&& ^^^^^^ %%%% |||||| /////'
let stylingArray = [];
let bioRandPos = 0;


function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)
  canvas.style('z-index','-1')

  windowResized();
  noSmooth();
  
  bioArray = split(bioString, ' ');
  bioStringShuffled = bioString;

  stylingArray = split(stylingString, ' ');

}

function draw() {
  //background(color_mode);  //sets background
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
  image(bgImg, width*0.5, height*0.5, bgImg.width*0.35, bgImg.height*0.35); //background image


  textAlign(CENTER,CENTER)
  textSize(32)
  fill(255)
  strokeWeight(2)
  stroke(0)
  text('Benjamin Thorn', x, y)

  pop();
  borderBoxes();
  push();
  imageMode(CENTER);
  image(gif,width*0.5,height*0.5);
  //image(entrance,width*0.5,height*0.85, entrance.width*1, entrance.height*1);
  pop();

  push();
  rectMode(CENTER)
  textAlign(CENTER,TOP)

  textSize(14)
  fill(255)
  strokeWeight(2)
  stroke(0)

  if(frameCount % 60 == 0 ) {
    bioArrayShuffled = bioArray
    //bioArrayShuffled = shuffle(bioArray)

    bioRandPos = int(random(bioArray.length))

    //arrayCopy(stylingArray, int(random(stylingArray.length)), bioArrayShuffled, bioRandPos, 1)
    arrayCopy(stylingArray, 0, bioArrayShuffled, bioRandPos, 1)

    bioStringShuffled = join(bioArrayShuffled,' ')
  }
  if(frameCount % 300 == 0 ) {
    bioArray = split(bioString, ' ');
    bioStringShuffled = bioString;
  }

  text(bioStringShuffled, width*0.5, 130, width*0.5)
  pop();


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