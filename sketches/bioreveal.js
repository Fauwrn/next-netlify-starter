let windowAspect;
let canvas;
let color_mode = 0;
let x = 0;
let y = 0;

//Floating effect:
let floatOffset
let floatSpeed

let backgroundScale = 0.35

let bioString = 'Benjamin Thorn is an artist and designer whose work as a digital artist explores virtual space as an interface for software instruments, focusing on alienation and the politics of aesthetics in obscurantism. Their practice also includes releasing and performing ambient-shoegaze music under the alias [my grey leaving].';
let bioStringShuffled= '';
let bioArray = [];
let bioArrayShuffled = [];

let stylingString = '____ {}{}{} [][][] ***** ------ &&&&& ^^^^^^ %%%% |||||| /////'
let stylingArray = [];
let bioRandPos = 0;

let myLink


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

  floatOffset = random(TWO_PI); 
  floatSpeed = random(0.01, 0.02);
  
  bioArray = split(bioString, ' ');
  bioStringShuffled = bioString;

  stylingArray = split(stylingString, ' ');

  for (let index = 0; index < bioArray.length; index++) {
    let intialStyling = random(stylingArray.length)
    //intialStyling = 0
    arrayCopy(stylingArray, intialStyling, bioArrayShuffled, index, 1)
  }

  //myLink = createA("index3d.html", "3d");
  //myLink.position(width/2, height/2);

}

function draw() {
  let mouseWRatio = 0.5+(mouseX/width);
  let mouseHRatio = 0.5+(mouseY/height);
  x = lerp(x, mouseX, 0.05);
  y = lerp(y, mouseY, 0.05);
  let paralaxAmt = 10;


  if (mouseX > width/4 && mouseX < (width/4*3) && mouseY > height/4 && mouseY < (height/4*3)) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }

  push();

  let floatY = sin(floatOffset) * 2; // drift up and down
  translate(floatY, floatY);
  translate(-mouseWRatio*paralaxAmt,-mouseHRatio*paralaxAmt); ///PARALAXING


  imageMode(CENTER);
  image(bgImg, width*0.5, height*0.5, bgImg.width*backgroundScale, bgImg.height*backgroundScale); //background image

  pop()

  push()
    textAlign(CENTER,CENTER)
    textSize(32)
    fill(255)
    strokeWeight(2)
    stroke(0)
    text('Benjamin Thorn', x, y)
  pop()

  borderBoxes();
  push();
  imageMode(CENTER);
  image(gif,width*0.5,height*0.5);
  pop();

  push();
  rectMode(CENTER)
  textAlign(CENTER,TOP)

  textSize(14)
  fill(255)
  strokeWeight(2)
  stroke(0)

  if(frameCount % 30 == 0 ) {
    bioRandPos = int(random(bioArray.length))
    arrayCopy(bioArray, bioRandPos, bioArrayShuffled, bioRandPos, 1)

    bioStringShuffled = join(bioArrayShuffled,' ')

    backgroundScale = 0.35
  }

  if (mouseIsPressed === true) {
    bioArray = split(bioString, ' ');
    bioStringShuffled = bioString;

    //backgroundScale = 0.1
  }

  text(bioStringShuffled, width*0.5, 130, width*0.5)
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

/*
function mouseWheel(event) {
  backgroundScale = constrain(backgroundScale,0.05,0.25)
  if (event.delta > 0) {
    backgroundScale -= 0.01
    clear()
  } else {
    backgroundScale += 0.01
    clear()
  }
}
*/
