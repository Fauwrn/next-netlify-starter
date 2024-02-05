let cam;
let windowAspect;

let portWPos;
let contentBoxW;
let descTextAlign;

let homelink

function preload() {
  ///////////////////////////////////////////////   load fonts
  fontKJV1611 = loadFont('assets/fonts/KJV1611.otf');
  fontChomsky = loadFont('assets/fonts/Chomsky.otf');
  fontMain = loadFont('assets/fonts/SHPinscher-Regular.otf');
  fontName = loadFont('assets/fonts/Dearest_outline.ttf');
  
  ///////////////////////////////////////////////   load images
  bgImg = loadImage('assets/background.png');
  portrait = loadImage('assets/Portrait1.png');
  gif = loadImage('assets/PlayerBW.gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  homelink = createA('obscurus.html','');
  homelink.position(width*0.135, 115);
  homelink.size(40,40);

}

function draw() {
  windowResized();
  background(0);  //sets background
  let mouseWRatio = 0.5-(mouseX/width);
  let mouseHRatio = 0.5-(mouseY/height);

  imageMode(CENTER);
  image(bgImg, width*0.5+(0.5-mouseWRatio*20), height*0.5+(0.5-mouseHRatio*20), 1920, 1080); //background image

  if (windowAspect < 1){
    mobileAspect();
    portWPos = width*0.5;
    contentBoxW = width*1.1;
    descTextAlign = width*0.5; 
    

  } else {
    desktopAspect()
    portWPos = width*0.3;
    contentBoxW = width*0.75;
    descTextAlign = width*0.65; 
  }

  ////Content Box
  noStroke();
  rectMode(CENTER);
  let paralaxAmt = 10;
  translate(mouseWRatio*paralaxAmt,mouseHRatio*paralaxAmt); ///PARALAXING
  rect(width*0.5, 400, contentBoxW, 600); //content box
  ////
  image(portrait, portWPos, 400,400*windowAspect/2,400*windowAspect/2); //portrait
  image(gif, width*0.82, 605,200,200); //portrait
  gif.play();
  staticText();
  textAlign(CENTER);
  //text(windowAspect,width/2,height*0.8); //debug aspect ratio
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  windowAspect = width / height;
  homelink.position(width*0.135, 115);
} 

function staticText(){
  noStroke();
  textSize(68);
  textAlign(CENTER);
  textFont(fontName);
  text('Benjamin Thorn',width*0.5, 150); //Name
  textSize(18);
  textFont(fontKJV1611);
  textAlign(LEFT,TOP);
  textWrap(WORD);
  //main text
  text('I make things - Sound and visuals.\nI studied Games design at college and am currently studying creative computing at CCI for a year, in between my BA studies in Sound Arts. \n \nI’m Interested in Ambient, Drone and Shoegaze, and ‘creativly’ often seem to fall back onto pixel art/glitch and ghosts.\n \nI spend a lot of my free time improvising with guitar, effects Ive made myself and singing (as long as nobody else is about).',descTextAlign, 250, width*0.35); //HEADER
  monogram();
} 

function monogram(){
  textSize(32);
  text('Þ',width*0.135, 100); //monogram
}

function desktopAspect(){

}

function mobileAspect(){
  //scale(0.5);
  //textAlign(CENTER);
}

/*
function mousePressed() {
  if (colorValue === 0) {
  } else {
  }
}
*/