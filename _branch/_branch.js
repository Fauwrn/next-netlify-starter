//_BRANCH_//

let backgroundImg;
let font;
let textColour = 255;
let cardScheme = 'indexed';

let uitext_show = true;

let midiOutput;


//Timer
var initialTimerValue = 600;
var timerValue;

//Card Dimensions // cardH = 256 or 261 or 255
const cardH = 255;
const cardW = 192;

var cardCount = 6;

//Grid Layout Divisions
var gridWDiv = 8;
var gridHDiv = 10;
var gridWPos;
var gridHPos;
var deckSpacing = 1.5;
var alignCorrection;

let discardDeck = [];

let minorDeck = [];
let shuffledMinorDeck = [];
let minorDeckSize = 24;
let minorCardID=0;

let majorDeck = [];
let shuffledMajorDeck = [];
let majorDeckSize = 14;
let majorCardID = 0;

//let majorDeckDrawn = false;
let majorHover_1 = false;
let majorHover_2 = false;
let majorHover_3 = false;
let majorHover_4 = false;
let majorHover_6 = false;
let majorDiscard = false;
//////////////////
//let minorDeckDrawn = false;
let minorHover_1 = false;
let minorHover_2 = false;
let minorHover_3 = false;
let minorHover_4 = false;
let minorDiscard = false;

let majorEffectCard = 0;
let majorEffectCardPlayed_1 = 0;
let majorEffectCardPlayed_2 = 0;
let majorEffectCardPlayed_3 = 0;
let majorEffectCardPlayed_4 = 0;

let minorEffectCardPlayed_1 = 0;
let minorEffectCardPlayed_2 = 0;
let minorEffectCardPlayed_3 = 0;
let minorEffectCardPlayed_4 = 0;
let minorEffectCardDiscarded = 0;

let minorEffectPlayed = [];
let majorEffectPlayed = [];

let loop1_counter = 0;
let loop2_counter = 0;
let loop3_counter = 0;
let loop4_counter = 0;
let loopLimit = 3;

let loop1_card_graphic = [];
let loop2_card_graphic = [];
let loop3_card_graphic = [];
let loop4_card_graphic = [];
let major_card_graphic = [];
let minor_card_graphic = [];

function preload() {
  backgroundImg = loadImage('assets/Tree04bw.png');
  playerGif = loadImage('assets/PlayerBW.gif');
  font = loadFont('assets/AveriaSerifLibre-Bold.ttf');
  for (let i = 0; i < loopLimit; i++) {
    loop1_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loop1_card_'+i+'.png');
    loop2_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loop2_card_'+i+'.png');
    loop3_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loop3_card_'+i+'.png');
    loop4_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/loop4_card_'+i+'.png');
  }
  for (let i = 0; i < majorDeckSize; i++) {
    major_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/major_card_'+i+'.png');
  }
  for (let i = 0; i < minorDeckSize; i++) {
    minor_card_graphic[i] = loadImage('assets/cards/'+cardScheme+'/minor_card_'+i+'.png');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth()
  timerValue = initialTimerValue;
  setInterval(timeIt, 1000);

  WebMidi
    .enable()
    .then(() => console.log("WebMidi enabled!"))
    .catch(err => alert(err));

  gridWPos = width / gridWDiv;
  gridHPos = height / gridHDiv;

  majorGridH = gridHPos*2
  minorGridH = gridHPos*5

  alignCorrection = gridWPos/2-cardW/2

  textFont(font);
  majorSlot_1 = new backgroundCard(gridWPos * (1), majorGridH)
  majorSlot_2 = new backgroundCard(gridWPos * (2), majorGridH)
  majorSlot_3 = new backgroundCard(gridWPos * (3), majorGridH)
  majorSlot_4 = new backgroundCard(gridWPos * (4), majorGridH)

  midiOutput = WebMidi.getOutputByName("Max 1");
  console.log(midiOutput);
  midiOutput.channels[1].sendControlChange(1, 0);
  midiOutput.channels[1].sendControlChange(2, 0);
  midiOutput.channels[1].sendControlChange(3, 0);
  midiOutput.channels[1].sendControlChange(4, 0);

}

function onEnabled() {
  //WebMIDI Example Output Setup:
  
  console.log("WebMIDI Enabled");
  
  // Inputs
  WebMidi.inputs.forEach(input => console.log("Input: ",input.manufacturer, input.name));
  
  // Outputs
  WebMidi.outputs.forEach(output => console.log("Output: ",output.manufacturer, output.name));
  
  //Looking at the first output available to us
  console.log(WebMidi.outputs[0]);

  //assign that output as the one we will use later
  //myOutput = WebMidi.outputs[0];

}
  
function draw() {
  background(0);

  //image(backgroundImg,0,0)
  //image(backgroundImg,0,0,backgroundImg.width/2,backgroundImg.height/2)
  translate(alignCorrection,0); // makes everything central, but then the mouse pos is off
  stying();

  //////////////////////////////draws shuffled minor deck//////////////////////////////
  if (minorDeck.length == 0){
    for (let i = 0; i < minorDeckSize; i++) {
      minorDeck[i] = new card(gridWPos * 5, (minorGridH) + (i * deckSpacing), minorDeck.length);

      discardDeck[i] = new card(gridWPos * 6, (minorGridH) + (i * deckSpacing), minorEffectPlayed.length);

      shuffledMinorDeck[i] = i
    }
    minorEffectPlayed = [];
    shuffledMinorDeck = shuffle(shuffledMinorDeck)
  }
  //////////////////////////////draw shuffled major deck//////////////////////////////
  if (majorDeck.length == 0){
    for (let i = 0; i < majorDeckSize; i++) {
      majorDeck[i] = new card(gridWPos * 5, (majorGridH) + (i * deckSpacing), majorDeck.length);
      shuffledMajorDeck[i] = i
    }
    shuffledMajorDeck = shuffle(shuffledMajorDeck)
  }
  
  ///////////////////////////////RENDER CARDS///////////////////////////////
  /////////////////////////////BACKGROUND CARDS/////////////////////////////
  ///////////////////////////////MAJOR CARDS////////////////////////////////
  //majorSlot_1 = new backgroundCard(gridWPos * (1), majorGridH)
  majorHover_1 = majorSlot_1.over();
  majorSlot_1.show();
  loop1_counter = loop1_counter % loopLimit
  image(loop1_card_graphic[loop1_counter],gridWPos * 1, majorGridH, cardW, cardH)

  //majorSlot_2 = new backgroundCard(gridWPos * (2), majorGridH)
  majorHover_2= majorSlot_2.over();
  majorSlot_2.show();
  loop2_counter = loop2_counter % loopLimit
  image(loop2_card_graphic[loop2_counter],gridWPos * 2, majorGridH, cardW, cardH)

  //majorSlot_3 = new backgroundCard(gridWPos * (3), majorGridH)
  majorHover_3= majorSlot_3.over();
  majorSlot_3.show();
  loop3_counter = loop3_counter % loopLimit
  image(loop3_card_graphic[loop3_counter],gridWPos * 3, majorGridH, cardW, cardH)

  //majorSlot_4 = new backgroundCard(gridWPos * (4), majorGridH)
  majorHover_4= majorSlot_4.over();
  majorSlot_4.show();
  loop4_counter = loop4_counter % loopLimit
  image(loop4_card_graphic[loop4_counter],gridWPos * 4, majorGridH, cardW, cardH)

  majorEffectSlot = new backgroundCard(gridWPos * (6), majorGridH)
  majorHover_6 = majorEffectSlot.over();
  majorEffectSlot.show();
  image(major_card_graphic[majorEffectCard],gridWPos * 6, majorGridH, cardW, cardH)

  //////////////////////////////MINOR CARDS///////////////////////////////
  minorSlot_1 = new backgroundCard(gridWPos * (1), minorGridH)
  minorHover_1= minorSlot_1.over();
  minorSlot_1.show();
  image(minor_card_graphic[minorEffectCardPlayed_1],gridWPos * 1, minorGridH, cardW, cardH)

  minorSlot_2 = new backgroundCard(gridWPos * (2), minorGridH)
  minorHover_2= minorSlot_2.over();
  minorSlot_2.show();
  image(minor_card_graphic[minorEffectCardPlayed_2],gridWPos * 2, minorGridH, cardW, cardH)

  minorSlot_3 = new backgroundCard(gridWPos * (3), minorGridH)
  minorHover_3= minorSlot_3.over();
  minorSlot_3.show();
  image(minor_card_graphic[minorEffectCardPlayed_3],gridWPos * 3, minorGridH, cardW, cardH)

  minorSlot_4 = new backgroundCard(gridWPos * (4), minorGridH)
  minorHover_4= minorSlot_4.over();
  minorSlot_4.show();
  image(minor_card_graphic[minorEffectCardPlayed_4],gridWPos * 4, minorGridH, cardW, cardH)

  
  discardSlot = new backgroundCard(gridWPos * (6), minorGridH)
  minorDiscard = discardSlot.over();
  discardSlot.show();
  image(minor_card_graphic[0],gridWPos * 6, minorGridH, cardW, cardH)
  

  ////////////////////////////////////Discard Pile////////////////////////////////////
  for (let i = 0; i < minorEffectPlayed.length; i++) {
    discardDeck[i].over();
    discardDeck[i].update();
    discardDeck[i].show();
    image(minor_card_graphic[minorEffectCardDiscarded],discardDeck[i].x, discardDeck[i].y, cardW, cardH)
  }
  ////////////////////////////////////Show Major Deck////////////////////////////////////
  for (let i = 1; i < minorDeck.length; i++) {
    minorDeck[i].over();
    minorDeck[i].update();
    minorCardID = minorDeck[i].show();
    image(minor_card_graphic[shuffledMinorDeck[minorCardID]], minorDeck[minorCardID].x, minorDeck[minorCardID].y, cardW, cardH);
    //}
  }
  ////////////////////////////////////Show Major Deck////////////////////////////////////
  for (let i = 0; i < majorDeck.length; i++) {
    majorDeck[i].over();
    majorDeck[i].update();
    majorCardID = majorDeck[i].show();
    image(major_card_graphic[shuffledMajorDeck[majorCardID]], majorDeck[majorCardID].x, majorDeck[majorCardID].y, cardW, cardH);
  }

  if (uitext_show == true){
    uitext();
  }
  //textSize(24)

  timer()
  //fill(255)
  //text(loop1_counter,width/2,height/2)
  //DEBUG_gridOutline();
}

function mousePressed() {
  if (minorDeck.length > 0){
    minorDeck[minorDeck.length-1].pressed();
  }
  if (majorDeck.length > 0){
    majorDeck[majorDeck.length-1].pressed();
  }


}

function mouseReleased() {
  if (minorDeck.length > 0){
    if (minorDiscard === true){ //discard Minor Card
      discardMinorCard()
      minorEffectCardDiscarded = shuffledMinorDeck[minorCardID]
    } else if (minorHover_1 === true){ //apply top of minor deck to loop 1
      drawMinorCard()
      minorEffectCardPlayed_1 = shuffledMinorDeck[minorCardID]
      
      console.log("Sending CC:", minorEffectCardPlayed_1);
      midiOutput.channels[1].sendControlChange(1, minorEffectCardPlayed_1);
      

    } else if (minorHover_2 === true){ //apply top of minor deck to loop 2
      drawMinorCard()
      minorEffectCardPlayed_2 = shuffledMinorDeck[minorCardID]

      console.log("Sending CC:", minorEffectCardPlayed_2);
      midiOutput.channels[1].sendControlChange(2, minorEffectCardPlayed_2);

    } else if (minorHover_3 === true){ //apply top of minor deck to loop 3
      drawMinorCard()
      minorEffectCardPlayed_3 = shuffledMinorDeck[minorCardID]

      console.log("Sending CC:", minorEffectCardPlayed_3);
      midiOutput.channels[1].sendControlChange(3, minorEffectCardPlayed_3);

    } else if (minorHover_4 === true){ //apply top of minor deck to loop 4
      drawMinorCard()
      minorEffectCardPlayed_4 = shuffledMinorDeck[minorCardID]

      console.log("Sending CC:", minorEffectCardPlayed_4);
      midiOutput.channels[1].sendControlChange(4, minorEffectCardPlayed_4);

    }
    minorDeck[minorDeck.length-1].released();
  }
  if (majorDeck.length > 0){
    if (majorDiscard === true){ //discard major Card
      drawMajorCard()
    } else if (majorHover_1 === true){ //apply top of major deck to loop 1
      //drawMajorCard()
      loop1_counter ++
      majorEffectCardPlayed_1 = shuffledMajorDeck[majorCardID]
    } else if (majorHover_2 === true){ //apply top of major deck to loop 2
      //drawMajorCard()
      loop2_counter ++
      majorEffectCardPlayed_2 = shuffledMajorDeck[majorCardID]
    } else if (majorHover_3 === true){ //apply top of major deck to loop 3
      //drawMajorCard()
      loop3_counter ++
      majorEffectCardPlayed_3 = shuffledMajorDeck[majorCardID]
    } else if (majorHover_4 === true){ //apply top of major deck to loop 4
      //drawMajorCard()
      loop4_counter ++
      majorEffectCardPlayed_4 = shuffledMajorDeck[majorCardID]
    } else if (majorHover_6 === true){ //apply top of minor deck to loop 4
      drawMajorCard()
      //majorEffectCard = majorCardID
      majorEffectCard = shuffledMajorDeck[majorCardID]
    }
    majorDeck[majorDeck.length-1].released();
  }
}

function drawMinorCard() {
  if (minorDeck.length > 0) {
    minorDeck = shorten(minorDeck);
    //append(minorEffectPlayed,1)
  } else {
    return
  }
}

function discardMinorCard() {
  if (minorDeck.length > 1) {
    append(minorEffectPlayed,shuffledMinorDeck[minorCardID])
    minorDeck = shorten(minorDeck);
  } else {
    for (let i = 0; i < minorDeckSize; i++) {
      minorDeck = [];
    }
    return
  }
}

function drawMajorCard() {
  if (majorDeck.length > 0) {
    majorDeck = shorten(majorDeck);
  } else {
    return
  }
}

/*
function discardMajorCard() {
  if (majorDeck.length > 0) {
    append(majorEffectPlayed,shuffledMajorDeck[minorCardID])
    majorDeck = shorten(majorDeck);
  } else {
    for (let i = 0; i < majorDeckSize; i++) {
      majorEffectPlayed = [];
      minorEffectPlayed = [];
    }
    return
  }
}
*/

function uitext(){

    //UI Text
    push();
    fill(textColour);
    stroke(0)
    strokeWeight(2.5)
    textSize(36);
    text('_BRANCH', gridWPos, gridHPos*1);
    //text('\n this machine kills facists', gridWPos, gridHPos*1);
    translate(0, gridHPos*1.65);
    textSize(24);
    textAlign(CENTER, BASELINE);

    text('I', gridWPos * 1 + (cardW/2), 0);
    text('II', gridWPos * 2 + (cardW/2), 0);
    text('III', gridWPos * 3 + (cardW/2), 0);
    text('IV', gridWPos * 4 + (cardW/2), 0);
    text('MAJOR DECK', gridWPos * 5 + (cardW/2),0);
    text('MAJOR EFFECTS', gridWPos * 6 + (cardW/2), 0);

    text('MINOR DECK', gridWPos * 5 + (cardW/2),gridHPos*3);
    text('DISCARD', gridWPos * 6 + (cardW/2), gridHPos*3);
    pop();

    push()
    fill(textColour)
    textAlign(CENTER,BOTTOM);
  
    /////////////////////////// Major Deck Card Text ///////////////////////////
    text(majorEffectCard+' in Play',gridWPos * 6 + (cardW/2),majorGridH) 
    
    text(loop1_counter+1, gridWPos * 1 + (cardW/2), majorGridH)
    text(loop2_counter+1, gridWPos * 2 + (cardW/2), majorGridH)
    text(loop3_counter+1, gridWPos * 3 + (cardW/2), majorGridH)
    text(loop4_counter+1, gridWPos * 4 + (cardW/2), majorGridH)
    
  
    text('Current Major: '+shuffledMajorDeck[majorCardID],gridWPos * 5 + (cardW/2), gridHPos*1.85)

    text(majorDeck.length+' cards left', gridWPos * 5 + (cardW/2), majorGridH)
    /////////////////////////// Minor Deck Card Text ///////////////////////////
    text('Current Minor: '+shuffledMinorDeck[minorCardID],gridWPos * 5 + (cardW/2),gridHPos*4.85)

    text(minorDeck.length+' cards left', gridWPos * 5 + (cardW/2), minorGridH)
    text(minorEffectPlayed+' Discarded', gridWPos * 6 + (cardW/2), minorGridH)
    // Applied Cards
    textAlign(CENTER, CENTER);
    text(minorEffectCardPlayed_1, gridWPos * (1) + cardW/2, gridHPos * 4.5)
    text(minorEffectCardPlayed_2, gridWPos * (2) + cardW/2, gridHPos * 4.5)
    text(minorEffectCardPlayed_3, gridWPos * (3) + cardW/2, gridHPos * 4.5)
    text(minorEffectCardPlayed_4, gridWPos * (4) + cardW/2, gridHPos * 4.5)
    


    pop()
}

function timer() {
  //Branch Timer
  push();
  fill(0)
  stroke(255)
  strokeWeight(2.5)
  textAlign(CENTER,TOP);
  timerPosX = gridWPos*4
  timerPosY = gridHPos*8.5

  //rect(gridWPos, gridHPos*8, gridWPos*5 + cardW, cardH*0.5);
  fill(255)
  rect(gridWPos, gridHPos*8.5, ((gridWPos*5+ cardW)/initialTimerValue)*timerValue, cardH*0.1);

  fill(0)
  stroke(255)
  strokeWeight(2.5)

  if (timerValue > 0) {
    text(timerValue + ' seconds left', timerPosX, timerPosY);
  }
  if (timerValue == 0) {
    text('end', timerPosX, timerPosY);
  }

  pop();
}

function timeIt() {
  if (timerValue > 0) {
    timerValue--;
  }
}

function stying(){
    push();
    strokeWeight(2.5)
    stroke(255)
    for (let i = 0; i < cardCount - 2; i += 1) {
      fill(textColour)
      textAlign(CENTER,BOTTOM);
      fill(0)
      rectMode(CENTER)
      rect(gridWPos * (i+1) + cardW/2, gridHPos * 4.5 , cardW, 30);
      //rect(gridWPos * (i+1), gridHPos * 5 - cardH/5, cardW, cardH/8);
    };
    //image(playerGif,gridWPos * 4 - (playerGif.width/2), gridHPos - (playerGif.height/2))

    line(gridWPos * 4.5 + (cardW/2), gridHPos * 2, gridWPos * 4.5 + (cardW/2), gridHPos * 8)
    pop();
}

function keyTyped() {
    if (key === 't') {
      uitext_show = !uitext_show
    } else if (key === '1'){

    }
    
}

//DEBUG GRID
function DEBUG_gridOutline(){
  ////////////////////////////// TEXT ELEMENTS //////////////////////////////
  push()
  var gridWPos = width / gridWDiv;
  var gridHPos = height / gridHDiv;   
  stroke(255)
  strokeWeight(2.5)

  for (let i = 0; i < gridWPos; i += 1) {
    
    line(gridWPos*(i), 0, gridWPos*(i), height);
    line(gridWPos*(i*1.5), 0, gridWPos*(i*1.5), height);

  };
  for (let i = 0; i < gridHPos; i += 1) {

    line(0, gridHPos*(i), width, gridHPos*(i));

  };

  stroke(0)
  fill(255)
  textSize(36)
  //text(shuffledMinorDeck,200,100) //why are there duplicates?
  //text(shuffledMajorDeck,200,150) //why are there duplicates?
  pop()
}