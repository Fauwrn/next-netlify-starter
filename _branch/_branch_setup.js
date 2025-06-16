//_BRANCH_//

let backgroundImg;
let font;
let textColour = 255;
let cardScheme = 'bw_small';
let pixelScale = 15;

let uitext_show = true;
let debug = false;

let midiOutput;

//Grid Layout Divisions
let gridWDiv = 8;
let gridHDiv = 10;
let gridWPos;
let gridHPos;
let deckSpacing = 1.5;
let alignCorrection;

//Card Dimensions // cardH = 256 or 261 or 255
const cardH = 255;
const cardW = 192;
let cardCount = 6;


let majorSlot = [];
let minorSlot = [];
let cardSlots = 4;

let spiral

//Timer
let initialTimerValue = 600;
let timerValue;
let timerInput;
let timelineCards = [];
let timelinePlacement;
let timelinePlacements = [];
let timerPlacementSec;
let timelineHover = false;

let branches = [];

let story = [];
let intro;
let currentPage = 0;
let storyPage;

function preload() {
  backgroundImg = loadImage('assets/Tree04bw.png');
  font = loadFont('assets/AveriaSerifLibre-Bold.ttf');
  fire = loadImage('assets/fire.gif');
  keygif = loadImage('assets/key.gif');
  spiral = loadImage('assets/spiral_slow.gif');

  intro = loadStrings('assets/text/introduction.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth()
  timerValue = initialTimerValue;
  setInterval(timeIt, 1000);

  gridWPos = width / gridWDiv;
  gridHPos = height / gridHDiv;

  majorGridH = gridHPos * 2.5
  minorGridH = gridHPos * 6

  alignCorrection = gridWPos/2-cardW/2

  textFont(font);

  timerInput = createInput();
  timerInput.size(cardW)
  timerInput.position(gridWPos * 4 - cardW/2 , gridHPos * 6);

  timerInput.changed(secondsLoad);

  storyPage = [intro,intro,intro]
  story = storyPage[currentPage]

}



function draw() {
  background(0);
  stying();

  if (uitext_show == true){
    uitext();
  }
  if (debug == true){
    DEBUG_gridOutline();
  }

   push(); 

  //let floatY = sin(floatOffset) * 2; // drift up and down
  //translate(floatY, floatY);

  imageMode(CENTER);



  //push();
  rectMode(CENTER)
  textAlign(CENTER,TOP)

  textSize(20)
  fill(255)
  stroke(0)

  for (let i = 0; i < story.length; i++) {
    text(story[i], width*0.5, 160+(i*40), width*0.9)
  }
  pop();

}

function secondsLoad(){
  timerValue = timerInput.value();

}

function mousePressed(){
  currentPage = currentPage % (storyPage.length-1)
  currentPage ++
  story = storyPage[currentPage]
}

function mouseReleased() {

}

function uitext(){
    //UI Text
    push();
    fill(textColour);
    stroke(0)
    strokeWeight(2.5)
    textSize(36);
    //text('_BRANCH', gridWPos, gridHPos*9);
    //text('\n this machine kills fascists', gridWPos, gridHPos*9);

    textSize(24);
    textAlign(CENTER, BOTTOM);

    let textSpacing = gridHPos * 0.1
    text('tempus in secundis', gridWPos * 4 , minorGridH - textSpacing);

    text(timerValue, gridWPos * 4 , gridHPos * 7 - (textSpacing));

    pop()
}

function timeIt() {
  //if (timerValue > 0) {
  //  timerValue--;
  //}
}

function stying(){

  image(spiral, gridWPos * (0.5), gridHPos * 1, spiral.width * pixelScale, spiral.height * pixelScale )
  image(spiral, gridWPos * (6.5) + (cardW) - (spiral.width * pixelScale) , gridHPos * 1, -spiral.width * pixelScale, spiral.height * pixelScale )

  //image(fire, gridWPos * 4 - ((fire.width * 2)/2) , gridHPos * 4 - ((fire.height * 2)/2), fire.width * 2, fire.height * 2 )
  image(keygif, gridWPos * 4 - ((keygif.width * 2)/2) , gridHPos * 4 - ((keygif.height * 2)/2), keygif.width * 2, keygif.height * 2 )

  push();
    //image(backgroundImg,0,0)
    //image(backgroundImg,0,0,backgroundImg.width/2,backgroundImg.height/2)
    strokeWeight(2.5)
    stroke(255)

    for (let i = 0; i < cardCount - 2; i += 1) {
      fill(textColour)
      textAlign(CENTER,BOTTOM);
      fill(0)
      rectMode(CENTER)
      boxHeight = cardH/4
    };
  pop();
}

function keyTyped() {
    secondsLoad()
    if (keyCode === ENTER) {
      window.open("_branch.html","_top");
      storeItem('setupTime', timerValue);
    }
}

//DEBUG GRID
function DEBUG_gridOutline(){
  ////////////////////////////// TEXT ELEMENTS //////////////////////////////
  push()
  let gridWPos = width / gridWDiv;
  let gridHPos = height / gridHDiv;
  stroke(255)
  strokeWeight(2.5)

  for (let i = 0; i < gridWPos; i += 1) {
    
    line(gridWPos*(i), 0, gridWPos*(i), height);

  };
  for (let i = 0; i < gridHPos; i += 1) {

    line(0, gridHPos*(i), width, gridHPos*(i));

  };

  stroke(0)
  fill(255)
  textSize(36)
  //text(minor.deckShuffled,200,100) //why are there duplicates?
  //text(major.deckShuffled,200,150) //why are there duplicates?
  pop()
}