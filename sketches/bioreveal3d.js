let windowAspect;
let canvas;
let color_mode = 0;
let x = 0;
let y = 0;

//Floating effect:
let floatOffset
let floatSpeed

let backgroundScale = 0.14

let bioString = 'Benjamin Thorn is an artist and designer whose work as a digital artist explores virtual space as an interface for software instruments, focusing on alienation and the politics of aesthetics in obscurantism. Their practice also includes releasing and performing ambient-shoegaze music under the alias [my grey leaving].';
let bioStringShuffled= '';
let bioArray = [];
let bioArrayShuffled = [];

let stylingString = '____ {}{}{} [][][] ***** ------ &&&&& ^^^^^^ %%%% |||||| /////'
let stylingArray = [];
let bioRandPos = 0;

let font

function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

  font = loadFont('assets/obscurus/fonts/SHPinscher-Regular.otf');


}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
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

  textFont(font)

  ortho()

}

function draw() {
  background(color_mode);  //sets background
  let mouseWRatio = 0.5+(mouseX/width);
  let mouseHRatio = 0.5+(mouseY/height);
  x = lerp(x, mouseX, 0.05);
  y = lerp(y, mouseY, 0.05);
  let paralaxAmt = 10;

  orbitControl();



  push();

  let floatY = sin(floatOffset) * 2; // drift up and down
  translate(floatY, floatY);

  //translate(-mouseWRatio*paralaxAmt,-mouseHRatio*paralaxAmt); ///PARALAXING

  imageMode(CENTER);

  texture(bgImg);
  rotateY(millis()/10000);
  box(bgImg.width*0.5, bgImg.height*0.5);


  pop()

  push()
    textAlign(CENTER,CENTER)
    textSize(32)
    fill(255)
    strokeWeight(2)
    stroke(0)
    text('Benjamin Thorn', x - width/2, y - height/2)
  pop()


  push();
  imageMode(CENTER);
  image(gif, 0, 0);

  //texture(gif);
  //box(gif.width*1);

  pop();

  push();
  rectMode(CENTER)
  textAlign(CENTER,TOP)

  textSize(18)
  fill(255)
  strokeWeight(2)
  stroke(0)


  if(frameCount % 30 == 0 ) {
    bioRandPos = int(random(bioArray.length))
    arrayCopy(bioArray, bioRandPos, bioArrayShuffled, bioRandPos, 1)

    bioStringShuffled = join(bioArrayShuffled,' ')

  }

  if (mouseIsPressed === true) {
    bioArray = split(bioString, ' ');
    bioStringShuffled = bioString;

  }

  text(bioStringShuffled, 0, -300, width*0.5)
  pop();

  floatOffset += floatSpeed; // keep moving

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
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
