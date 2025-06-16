let windowAspect;

let currentSong = 0
//Floating effect:
let floatOffset
let floatSpeed
//Songs
let song = []
let blueSun,bridleway,emptyWalls,erosion,exhale,fallenTree,labyrinth,makeItClear,makeMeKnowMe,noMoreFun,oldNotes,overgrown,poemsOfYou,shelter,shesWatchingMe,silenceLens,sinkingStone,solitaire,somewhere,stopPretending,strained,theOtherNight,underTheDeadTree;
let songName = [];


function preload() {
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background_images/Tree04bw.png');
  gif = loadImage('assets/PlayerBW.gif');
  entrance = loadImage('assets/images/entrance_bw.png');

  introduction = loadStrings('/assets/songs/introduction.txt');
  solitaire = loadStrings('/assets/songs/solitaire.txt');
  blueSun = loadStrings('/assets/songs/blueSun.txt');
  bridleway = loadStrings('/assets/songs/bridleway.txt');
  emptyWalls = loadStrings('/assets/songs/emptyWalls.txt');
  erosion = loadStrings('/assets/songs/erosion.txt');
  exhale = loadStrings('/assets/songs/exhale.txt');
  fallenTree = loadStrings('/assets/songs/fallenTree.txt');
  labyrinth = loadStrings('/assets/songs/labyrinth.txt');
  makeItClear = loadStrings('/assets/songs/makeItClear.txt');
  makeMeKnowMe = loadStrings('/assets/songs/makeMeKnowMe.txt');
  noMoreFun = loadStrings('/assets/songs/noMoreFun.txt');
  oldNotes = loadStrings('/assets/songs/oldNotes.txt');
  overgrown = loadStrings('/assets/songs/overgrown.txt');
  poemsOfYou = loadStrings('/assets/songs/poemsOfYou.txt');
  shelter = loadStrings('/assets/songs/shelter.txt');
  shesWatchingMe = loadStrings('/assets/songs/shesWatchingMe.txt');
  silenceLens = loadStrings('/assets/songs/silenceLens.txt');
  sinkingStone = loadStrings('/assets/songs/sinkingStone.txt');
  somewhere = loadStrings('/assets/songs/somewhere.txt');
  stopPretending = loadStrings('/assets/songs/stopPretending.txt');
  strained = loadStrings('/assets/songs/strained.txt');
  theOtherNight = loadStrings('/assets/songs/theOtherNight.txt');
  underTheDeadTree = loadStrings('/assets/songs/stopPretending.txt');


}

function setup() {
  background(255);
  windowResized();
  noSmooth();
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0)
  canvas.style('z-index','-1')

  
  songName = [introduction, blueSun,bridleway,emptyWalls,erosion,exhale,fallenTree,labyrinth,makeItClear,makeMeKnowMe,noMoreFun,oldNotes,overgrown,poemsOfYou,shelter,shesWatchingMe,silenceLens,sinkingStone,solitaire,somewhere,stopPretending,strained,theOtherNight,underTheDeadTree];
  song = songName[currentSong]
  //songString = song[currentSong];

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

  textAlign(CENTER,BOTTOM)
  text('song '+ currentSong, mouseX, mouseY)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
} 

function mousePressed(){
  currentSong = currentSong % (songName.length-1)
  currentSong ++
  //currentSong % songName.length
  song = songName[currentSong]
}