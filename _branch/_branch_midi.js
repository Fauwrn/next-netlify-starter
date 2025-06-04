//_BRANCH_//

let backgroundImg;
let font;
let textColour = 255;
let cardScheme = 'bw_small';
let pixelScale = 15;

let uitext_show = false;
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

let major = {
  deck: [],
  discardDeck: [],
  deckShuffled: [],
  effectPlayed: [],
  deckSize: 23,
  cardGraphics: [],
  effectCardInPlay: [0, 0, 0, 0],
  hovering: [false,false,false,false],
  discardHovering: false,
  effectCardDiscarded: 0,
  cardID: 0,
  slots: [],
}

let minor = {
  deck: [],
  discardDeck: [],
  deckShuffled: [],
  effectPlayed: [],
  deckSize: 12,
  cardGraphics: [],
  effectCardInPlay: [0, 0, 0, 0],
  hovering: [false,false,false,false],
  discardHovering: false,
  effectCardDiscarded: 0,
  cardID: 0,
}

let majorSlot = [];
let minorSlot = [];
let cardSlots = 4;

//let majorEffectCard = 0;

let loopCounter = [0,0,0,0]
let loopLimit = 3;

let loop0_card_graphic = [];
let loop1_card_graphic = [];
let loop2_card_graphic = [];
let loop3_card_graphic = [];
let loopCards = [loop0_card_graphic, loop1_card_graphic, loop2_card_graphic, loop3_card_graphic];


let isLooping = [false,false,false,false]
let isLoopingForward = [true,true,true,true]
let looping_graphic = [];
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

function preload() {
  backgroundImg = loadImage('assets/Tree04bw.png');
  playerGif = loadImage('assets/PlayerBW.gif');
  font = loadFont('assets/AveriaSerifLibre-Bold.ttf');

  I_label = loadImage('assets/other/labels_b/I_label.png');
  II_label = loadImage('assets/other/labels_b/II_label.png');
  III_label = loadImage('assets/other/labels_b/III_label.png');
  IV_label = loadImage('assets/other/labels_b/IV_label.png');

  MajorDeck_label = loadImage('assets/other/labels_b/MajorDeck_label.png');
  MajorDiscard_label = loadImage('assets/other/labels_b/MajorDiscard_label.png');
  MinorDeck_label = loadImage('assets/other/labels_b/MinorDeck_label.png');
  MinorDiscard_label = loadImage('assets/other/labels_b/MinorDiscard_label.png');
  

  for (let i = 0; i < loopLimit; i++) {

    loop0_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loopCards/loop0_card_'+i+'.png');
    loop1_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loopCards/loop1_card_'+i+'.png');
    loop2_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loopCards/loop2_card_'+i+'.png');
    loop3_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loopCards/loop3_card_'+i+'.png');

    //loopCards[i] = loop0_card_graphic[i]

  }
  for (let i = 0; i < major.deckSize; i++) {
    major.cardGraphics[i] = loadImage('assets/cards/'+cardScheme+'/majorCards/major_card_'+i+'.png');
  }
  for (let i = 0; i < minor.deckSize; i++) {
    minor.cardGraphics[i] = loadImage('assets/cards/'+cardScheme+'/minorCards/minor_card_'+i+'.png');
  }

  looping_graphic_false_forward = loadImage('assets/other/loopSpiral_false_forwards.gif');
  looping_graphic_true_forward = loadImage('assets/other/loopSpiral_true_forwards.gif');
  looping_graphic_false_backward = loadImage('assets/other/loopSpiral_false_backwards.gif');
  looping_graphic_true_backward = loadImage('assets/other/loopSpiral_true_backwards.gif');

  spiral = loadImage('assets/spiral_slow.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth()
  initialTimerValue = getItem('setupTime');
  timerValue = initialTimerValue;
  setInterval(timeIt, 1000);

  ////////////////////////////// MIDI ENABLE //////////////////////////////
  WebMidi
    .enable()
    .then(() => console.log("WebMidi enabled!"))
    .catch(err => alert(err));

  /////////////////////////////////////////////////////////////////////////

  gridWPos = width / gridWDiv;
  gridHPos = height / gridHDiv;

  majorGridH = gridHPos * 2.5
  minorGridH = gridHPos * 6

  alignCorrection = gridWPos/2-cardW/2

  timerHeight = cardH*0.1
  timerWidth = gridWPos * 5 + cardW
  timerPosX = gridWPos * 4
  timerPosY = gridHPos * 1
  timelineBar = new timeline(gridWPos, gridHPos * 1)

  textFont(font);

  for (let i = 0; i < cardSlots; i++) {
    majorSlot[i] = new backgroundCard(gridWPos * (i + 1), majorGridH)
    minorSlot[i] = new backgroundCard(gridWPos * (i + 1), minorGridH)
  }


  majorDiscardSlot = new backgroundCard(gridWPos * (6), majorGridH)
  minorDiscardSlot = new backgroundCard(gridWPos * (6), minorGridH)


  
  ////////////////////////// MIDI OUTPUT SETUP ///////////////////////////
  midiOutput = WebMidi.getOutputByName("Max 1");
  console.log(midiOutput);
  midiOutput.channels[1].sendControlChange(1, 0);
  midiOutput.channels[1].sendControlChange(2, 0);
  midiOutput.channels[1].sendControlChange(3, 0);
  midiOutput.channels[1].sendControlChange(4, 0);
  midiOutput.channels[1].sendControlChange(5, 0);
  /////////////////////////////////////////////////////////////////////////

  //timerInput = createInput();
  //timerInput.position(width/2, height/2);

  //timerValue = timerInput.value();

}


function onEnabled() {
  console.log("WebMIDI Enabled");
  WebMidi.inputs.forEach(input => console.log("Input: ",input.manufacturer, input.name));   // Inputs
  WebMidi.outputs.forEach(output => console.log("Output: ",output.manufacturer, output.name));   // Outputs
  
  console.log(WebMidi.outputs[0]);  //Looking at the first output available to us

  //assign that output as the one we will use later
  //myOutput = WebMidi.outputs[0];

}


function draw() {
  background(0);
  //translate(alignCorrection,0); // makes everything central, but then the mouse pos is off
  stying();


  //////////////////////////////draws shuffled minor deck//////////////////////////////
  if (minor.deck.length == 0){
    for (let i = 1; i < minor.deckSize; i++) {
      minor.deck[i-1] = new cardDeck(gridWPos * 5, (minorGridH) + ((i-1) * deckSpacing), minor.deck.length);

      minor.discardDeck[i-1] = new cardDeck(gridWPos * 6, (minorGridH) + ((i-1) * deckSpacing), minor.effectPlayed.length);

      minor.deckShuffled[i-1] = i
    }
    minor.effectPlayed = [];
    minor.deckShuffled = shuffle(minor.deckShuffled)
  }
  //////////////////////////////draw shuffled major deck//////////////////////////////
  if (major.deck.length == 0){
    for (let i = 1; i < major.deckSize; i++) {
      major.deck[i-1] = new cardDeck(gridWPos * 5, (majorGridH) + ((i-1) * deckSpacing), major.deck.length);

      major.discardDeck[i-1] = new cardDeck(gridWPos * 6, (majorGridH) + ((i-1) * deckSpacing), major.effectPlayed.length);

      major.deckShuffled[i-1] = i
    }
    major.effectPlayed = [];
    major.deckShuffled = shuffle(major.deckShuffled)
  }
  

  //////////////////////////////   TIMELINE   //////////////////////////////

  for (let i = 0; i < timelineCards.length; i++) {
    timelineCards[i].show();
  }

  timelineHover = timelineBar.over();
  timelineBar.show();
  timer()

  ///////////////////////////////RENDER CARDS///////////////////////////////

  major.discardHovering = cardRender(majorDiscardSlot, major.discardHovering, major.cardGraphics[0], 5, majorGridH)
  minor.discardHovering = cardRender(minorDiscardSlot, minor.discardHovering, minor.cardGraphics[0], 5, minorGridH)

  for (let i = 0; i < cardSlots; i++) {
    loopCounter[i] = loopCounter[i] % loopLimit
    major.hovering[i] = cardRender(majorSlot[i], major.hovering[i], loopCards[i][loopCounter[i]], i, majorGridH)
    minor.hovering[i] = cardRender(minorSlot[i], minor.hovering[i], minor.cardGraphics[minor.effectCardInPlay[i]], i, minorGridH)

    // Loop Indicators
    if(isLooping[i] === false && isLoopingForward[i] === true ){
      looping_graphic[i] = looping_graphic_false_forward
    } else if (isLooping[i] === true && isLoopingForward[i] === true ){
      looping_graphic[i] = looping_graphic_true_forward
    } else if (isLooping[i] === false && isLoopingForward[i] === false ){
      looping_graphic[i] = looping_graphic_false_backward
    } else if (isLooping[i] === true && isLoopingForward[i] === false ){
      looping_graphic[i] = looping_graphic_true_backward
    }

    image(looping_graphic[i], gridWPos * (i + 1), gridHPos * 5, looping_graphic[i].width * pixelScale, looping_graphic[i].height * pixelScale )

  }


 ////////////////////////////////////Show Major Discard Pile////////////////////////////////////
  for (let i = 0; i < major.effectPlayed.length; i++) {
    major.discardDeck[i].over();
    major.discardDeck[i].update();
    major.discardDeck[i].show(major.cardGraphics[major.effectCardDiscarded]);
  }
  ////////////////////////////////////Show Minor Discard Pile////////////////////////////////////
  for (let i = 0; i < minor.effectPlayed.length; i++) { 
    minor.discardDeck[i].over();
    minor.discardDeck[i].update();
    minor.discardDeck[i].show(minor.cardGraphics[minor.effectCardDiscarded]);
  }
  ////////////////////////////////////Show Minor Deck////////////////////////////////////
  for (let i = 0; i < minor.deck.length; i++) {
    minor.deck[i].over();
    minor.cardID = minor.deck[i].update();
    minor.deck[i].show(minor.cardGraphics[minor.deckShuffled[minor.cardID]]);
  }
  ////////////////////////////////////Show Major Deck////////////////////////////////////
  for (let i = 0; i < major.deck.length; i++) {
    major.deck[i].over();
    major.cardID = major.deck[i].update();
    major.deck[i].show(major.cardGraphics[major.deckShuffled[major.cardID]]);
  }

  //labels
  image(I_label, gridWPos * (1), gridHPos * 1.5, I_label.width * pixelScale, I_label.height * pixelScale )
  image(II_label, gridWPos * (2), gridHPos * 1.5, II_label.width * pixelScale, II_label.height * pixelScale )
  image(III_label, gridWPos * (3), gridHPos * 1.5, III_label.width * pixelScale, III_label.height * pixelScale )
  image(IV_label, gridWPos * (4), gridHPos * 1.5, IV_label.width * pixelScale, IV_label.height * pixelScale )
  image(MajorDeck_label, gridWPos * (5), gridHPos * 1.5, MajorDeck_label.width * pixelScale, MajorDeck_label.height * pixelScale )
  image(MajorDiscard_label, gridWPos * (6), gridHPos * 1.5, MajorDiscard_label.width * pixelScale, MajorDiscard_label.height * pixelScale )

  image(MinorDeck_label, gridWPos * (5), gridHPos * 5, MinorDeck_label.width * pixelScale, MinorDeck_label.height * pixelScale )
  image(MinorDiscard_label, gridWPos * (6), gridHPos * 5, MinorDiscard_label.width * pixelScale, MinorDiscard_label.height * pixelScale )
  

  /*
  for (let b of branches) {
    b.update();
    b.display();
  }
  */

  if (uitext_show == true){
    uitext();
  }
  if (debug == true){
    DEBUG_gridOutline();
  }
}

function mousePressed() {
  if (minor.deck.length > 0){
    minor.deck[minor.deck.length-1].pressed();
  }
  if (major.deck.length > 0){
    major.deck[major.deck.length-1].pressed();
  }


}

function mouseReleased() {

  if (major.discardHovering === true){ //discard major Card
    discardMajorCard()
    major.effectCardDiscarded = major.deckShuffled[major.cardID]
  }

  for (let i = 0; i < cardSlots; i++) {
    if (major.hovering[i] === true){ //apply top of major deck to loop 1
      loopCounter[i] ++
    }
  }

  if (minor.discardHovering === true){ //discard Minor Card
    discardMinorCard()
    minor.effectCardDiscarded = minor.deckShuffled[minor.cardID]
  } 

  for (let i = 0; i < cardSlots; i++) {
    if (minor.hovering[i] === true){ //apply top of minor deck to loop 1
      drawMinorCard()
      minor.effectCardInPlay[i] = minor.deckShuffled[minor.cardID]
        
      console.log("Sending CC:", i, " ", minor.effectCardInPlay[i]);
      midiOutput.channels[1].sendControlChange(i + 1, minor.effectCardInPlay[i]);

      // apply loop state
      if (minor.effectCardInPlay[i] === 1) {
        console.log("looped")
        isLooping[i] = true

      } else if (minor.effectCardInPlay[i] === 2) {
        console.log("unlooped")
        isLooping[i] = false
      }
      // apply loop direction
      if (minor.effectCardInPlay[i] === 7) {
        console.log("direction: forward")
        isLoopingForward[i] = true

      } else if (minor.effectCardInPlay[i] === 6) {
        console.log("direction: backward")
        isLoopingForward[i] = false
      }


    }
  }

  if (timelineHover === true){
    timelinePlacement = mouseX - gridWPos
    timerPlacementSec = int((timelinePlacement/timerWidth) * initialTimerValue)

    let newTimelineCard = new timelineCard(timelinePlacement + gridWPos, timerPosY, major.cardID, timerPlacementSec);
    timelineCards.push(newTimelineCard);
    drawMajorCard()
    //majorEffectCard = major.deckShuffled[major.cardID]

    branches.push(new Branch(timelinePlacement + gridWPos, timerPosY));
  }

}

function drawMajorCard() {
  if (major.deck.length > 0) {
    major.deck = shorten(major.deck);
  } else {
    return
  }
}

function drawMinorCard() {
  if (minor.deck.length > 0) {
    minor.deck = shorten(minor.deck);
  } else {
    return
  }
}

function discardMajorCard() {
  if (major.deck.length > 1) {
    major.effectPlayed.push(major.deckShuffled[major.cardID]);
    major.deck = shorten(major.deck);
  } else {
    major.deck = [];
    return
  }
}

function discardMinorCard() {
  if (minor.deck.length > 1) {
    minor.effectPlayed.push(minor.deckShuffled[minor.cardID]);
    minor.deck = shorten(minor.deck);
  } else {
    minor.deck = [];
    return
  }
}

function uitext(){
    //UI Text
    push();
    fill(textColour);
    stroke(0)
    strokeWeight(2.5)
    textSize(36);
    text('_BRANCH', gridWPos, gridHPos*9);
    text('\n this machine kills fascists', gridWPos, gridHPos*9);

    textSize(24);
    textAlign(CENTER, BOTTOM);

    let textSpacing = gridHPos * 0.1
    text('I', gridWPos * 1 + (cardW/2), majorGridH - textSpacing);
    text('II', gridWPos * 2 + (cardW/2), majorGridH - textSpacing);
    text('III', gridWPos * 3 + (cardW/2), majorGridH - textSpacing);
    text('IV', gridWPos * 4 + (cardW/2), majorGridH - textSpacing);
    text('MAJOR DECK', gridWPos * 5 + (cardW/2), majorGridH - textSpacing);
    text('MAJOR DISCARD', gridWPos * 6 + (cardW/2), majorGridH - textSpacing);
    text('MINOR DECK', gridWPos * 5 + (cardW/2),minorGridH - textSpacing);
    text('MINOR DISCARD', gridWPos * 6 + (cardW/2), minorGridH - textSpacing);

    textSize(10);

    /////////////////////////// Major Deck Card Text ///////////////////////////
    text(major.effectPlayed + ' Discarded', gridWPos * 6 + (cardW/2), majorGridH)
    text(loopCounter[0] + 1, gridWPos * 1 + (cardW/2), majorGridH)
    text(loopCounter[1] + 1, gridWPos * 2 + (cardW/2), majorGridH)
    text(loopCounter[2] + 1, gridWPos * 3 + (cardW/2), majorGridH)
    text(loopCounter[3] + 1, gridWPos * 4 + (cardW/2), majorGridH)
    text('Current Major: '+major.deckShuffled[major.cardID] + ', ' + major.deck.length+' cards left', gridWPos * 5 + (cardW/2), majorGridH)
    
  

    /////////////////////////// Minor Deck Card Text ///////////////////////////
    text(minor.effectCardInPlay[0], gridWPos * 1 + cardW/2, minorGridH)
    text(minor.effectCardInPlay[1], gridWPos * 2 + cardW/2, minorGridH)
    text(minor.effectCardInPlay[2], gridWPos * 3 + cardW/2, minorGridH)
    text(minor.effectCardInPlay[3], gridWPos * 4 + cardW/2, minorGridH)
    text('Current Minor: '+minor.deckShuffled[minor.cardID] + ', ' + minor.deck.length+' cards left', gridWPos * 5 + (cardW/2), minorGridH)
    text(minor.effectPlayed+' Discarded', gridWPos * 6 + (cardW/2), minorGridH)
  
    pop()
}

function timer() {
  //Branch Timer
  push();
  stroke(255)
  strokeWeight(2.5)
  textAlign(CENTER,TOP);
  fill(255)
  rect(gridWPos, timerPosY, (timerWidth/initialTimerValue)*timerValue, timerHeight);

  fill(0)
  stroke(255)
  strokeWeight(2.5)
  
  if (timerValue > 0) {
    text(timerValue + ' seconds left', timerPosX, timerPosY);
  }
  if (timerValue == 0) {
    text('end', timerPosX, timerPosY);
  }

  //timerPlacementSec = int((timelinePlacement/timerWidth) * initialTimerValue)

  pop();
}

function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}

function stying(){

  image(spiral, gridWPos * (0.5), gridHPos * 1, spiral.width * pixelScale, spiral.height * pixelScale )
  image(spiral, gridWPos * (6.5) + (cardW) - (spiral.width * pixelScale) , gridHPos * 1, -spiral.width * pixelScale, spiral.height * pixelScale )

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
    if (key === 't') {
      uitext_show = !uitext_show
    } else if (key === '1'){

    }
    
    if (key === 'z' || key === 'Z') {
      if (timelineCards.length > 0) {
        timelineCards.pop();
      }
    }
    
}

function cardRender(slot, hover, imageSet, x, y) {
  hover = slot.over();
  slot.show(imageSet,x,y);
  return hover
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