///////////////////////////////////
////OBSCURUS SONUS INSTRUMENTUM////
////   TENEBRARUM ATTRAHENS    ////
///////////////////////////////////
////////////Variables//////////////
let cam;                         // 
////Chaotic Attractor Variables////
let dim = 128;                   // 
let scale = 25;                  //
let t = 0.1;                     //
let b = 0.19                     //
let [xA,yA,zA] = [[],[],[]];     //
let [xM,yM,zM] = [[],[],[]];     //
//////////Text and Images//////////
let wikiText = [0];              //
let currentWikiText;             //
let x = 0;                       //
                                 //
let splitString = [];            //
let secRand = 0;                 //
let cubeRotate=0 ;               //
let vignetteColor = 0;           //
                                 //
let images = [0];                //
let numImages = 10;              //
/////////////File Loading//////////
let input;                       //
let audioFiles = [0];            //
let audioFilesCount = 6;         //
let audioFileSelect = 0;         //
let soundFile;                   //
let loopStart = 0.0;             //
let loopDuration = 0.2;          //
let distLevel=0;                 //
                                 //
///////////////////////////////////

function preload() {
  ///////////////////////////////////////////////   load fonts
  wikiText = loadStrings('/assets/obscurus/text.txt');
  font = loadFont('/assets/obscurus/fonts/SHPinscher-Regular.otf');
  fontTitle = loadFont('/assets/obscurus/fonts/Chomsky.otf');
  fontMain = loadFont('/assets/obscurus/fonts/SHPinscher-Regular.otf');

  ///////////////////////////////////////////////   load images
  for (let i = 0; i < numImages; i++) {
    images[i] = loadImage('/assets/obscurus/images/img' + i + '.png');
  }
  soundFormats('mp3', 'wav');
  //soundFile = loadSound('assets/audio/audio2.wav');
  
  ///////////////////////////////////////////////   load audio files
  for (let i = 0; i < audioFilesCount; i++) {
    audioFiles[i] = loadSound('/assets/obscurus/audio/audio' + i + '.wav');
  }
}

function setup() {
  ///////////////////////////////////////////////   WEBGL Camera set up
  createCanvas(windowWidth, windowHeight,WEBGL);
  cam = createCamera();
  cam.ortho(-width/2, width/2, -height/2, height/2);
  ///////////////////////////////////////////////   P5.Sound effect proccessing
  delay = new p5.Delay();
  reverb = new p5.Reverb();
  dist = new p5.Distortion();
  for (let i = 0; i<audioFilesCount;i++ ){ 
    delay.process(audioFiles[i], 0.3, 0.7, 2300);
    dist.process(audioFiles[i], distLevel);
    reverb.process(audioFiles[i], 10, 10);
  }
  dist.chain(delay,reverb);
  getAudioContext().suspend();
  ///////////////////////////////////////////////   Setup
  background(0);
  setPoints();
  frameRate(60);
  ///////////////////////////////////////////////   File Input
  //input = createFileInput(handleFile,true);
  //input.position(width*0.5-45, 700);
  //resizeCanvas(windowWidth, windowHeight);

}

function draw() {
  background(0);  //sets background
  cam.ortho(-width/2, width/2, -height/2, height/2);
  //orbitControl(); /////////////////////////////   for debuging
  chaoticAttr(); 
  translate(-width*0.5,-height*0.5,0); //////////   moves drawing to top left (as its in WEBGL)
  staticText();
  movingText();
  reverb.drywet(1);
  visuals();

  //text(mouseX +'/'+ mouseY, width*0.5,height*0.95)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  //input.position(width*0.5-45, 700);
} 

function mousePressed() {
  userStartAudio(); //initalizes audio.
  
}

function keyTyped() {
  if (key === ' ') {
    currentWikiText = wikiText[int(random(wikiText.length))]; //randomly chooses which line of the text file to use
    splitString = split(currentWikiText, ' '); //splits the text file at each 'space' 
    shuffle(splitString,true); //shuffles the text

    audioFileSelect = int(random(audioFilesCount));

    loopDuration = audioFiles[audioFileSelect].duration()/splitString.length;
    //loopDuration = soundFile.duration()/splitString.length;
    print('Loop Dur: '+loopDuration+' /audio' + audioFileSelect + '.wav');
  } else {
  }
  
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (t<0.5){
      t = t+0.005; 
    }
  } else if (keyCode === DOWN_ARROW) {
    if (t>0.001){
      t = t-0.005;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (b<0.3){
      b = b+0.005;
    } 
  } else if (keyCode === LEFT_ARROW) {
    if (b>0.1){
      b = b-0.005;
    } 
  }
}

function staticText(){
  x = frameCount % width;
  fill(255);
  noStroke();
  textSize(36);
  textAlign(CENTER);
  textFont(font);
  if (getAudioContext().state == 'suspended'){
    text('CLICK ANYWHERE TO START AUDIO.\n PRESS SPACE TO GENERATE A NEW TEXT.\nUSE ARROW KEYS TO CONTROL CHAOS.', width*0.5, height*0.5);
  } else {
    print('Audio: ON');
  }

  textFont(fontTitle);
  text('OBSCURUS SONUS INSTRUMENTUM\nTENEBRARUM ATTRAHENS',width*0.5, 100) . //HEADER
  fill(255);
  textFont(font);
  text(x,width*0.2,100) //number 

  text(currentWikiText,width*0.5,700);  //plain text at bottom
  text(round(t,3),width*0.25,height*0.6);
  text(round(b,3),width*0.7,height*0.7);
} 

function movingText(){ ////////INCLUDES AUDIO PLAYBACK////////////
  for (let i = 0; i<splitString.length;i++ ){
    //Take coordinates from Chatoic Attractor and scale position from center to corner for mouse position sync
    textFont(fontMain); //text setup
    textSize(20);

    let hoverXPos = xA[i]*(width/scale)+(width*0.5);
    let hoverYPos = yA[i]*(width/scale)+(height*0.5);
    let textBoxSize = 20; //hover over area of each word
    if ((mouseX > hoverXPos-textBoxSize) && (mouseX < hoverXPos+textBoxSize) &&
        (mouseY > hoverYPos-(textBoxSize*0.5)) && (mouseY < hoverYPos+(textBoxSize*0.5))) {
      
      fill(255, 0, 0);  //Sets text color to red if hovering over position
      
      ellipse(width*0.5, 100, 50, 50); ///////////// red circle in top left
      vignetteColor = (255);

      if (audioFiles[audioFileSelect].isPlaying()==false){
        let sampleSpeed = hoverXPos/300;
        //let sampleSpeed = t*8;
        distLevel = constrain(1-(yA[i]/2),0,1);
        print(audioFileSelect)
        //audioFiles[audioFileSelect].pan( yA[i]); 
        audioFiles[audioFileSelect].play(0,sampleSpeed,0.85,i*loopDuration,loopDuration); 
      }
     
    } else {
      fill(255);//Sets text color to white if NOT hovering over position
      vignetteColor = (0);
      //audioFiles[audioFileSelect].stop(0.5);
    }
    
    text(splitString[i].toUpperCase(),hoverXPos, hoverYPos);
    textFont(font);
    for (let y = 0; y < 5; y++){
      text(splitString[int(random(y))], (width*0.1+(70*y)), 100+(i*10)); //text wall on left
      text(splitString[i], (width*0.9), 700-(i*10)); //text wall on right
      text(splitString[i], (width*0.85), 100+(i*12)); //text wall on right
    }
    text(splitString.length,width*0.8, height*0.8)
    translate(width*0.5,height*0.5,0);

    fill(vignetteColor);
    sphere(1100-frameCount%200*t);
    translate(-width*0.5,-height*0.5,0);
    
    audioFiles[audioFileSelect].pan(yA[i]); 
    //audioFiles[audioFileSelect].stop(0.5);
  }
}

function setPoints() { //////////////Sets up init position of particles texts//////////////
  for (let i = 0; i < dim; i++) {
    xA[i] = map(random(100),0,100,-1,1);
    yA[i] = map(random(100),0,100,-1,1);
    zA[i] = map(random(100),0,100,-1,1,true);
  }
}

function chaoticAttr(){

  /*
  if (b < 0.23){
    b = b + 0.0001;
  } else {
    b = 0.1;
  }
  */

  // Thomas Attraktor - converted mathematical formula from http://www.3d-meier.de/tut19/Seite0.html
  for (let i = 0; i < dim; i++) {

    xM[i] = -b*xA[i]+sin(yA[i]);
    yM[i] = -b*yA[i]+sin(zA[i]);
    zM[i] = -b*zA[i]+sin(xA[i]);
    
    // Updating the position of the particles (and setting the speed)
    xA[i] = xA[i]+(xM[i]*t);
    yA[i] = yA[i]+(yM[i]*t);
    zA[i] = zA[i]+(zM[i]*t);
    
    push(); 
    for (let n = 0; n < dim; n++) {
      xPos = xA[n]*(width/scale);
      yPos = yA[n]*(width/scale);
    }
    pop();  
  }
}

function visuals(){ //////////////VISUALS//////////////
  if (frameCount %(60*(round(0.7-t,1))) == 0){ //////// events to occur every 60 frames multiplied by time (t) variable
    cubeRotate++;
    secRand = random(100);
    shuffle(images, true); ///////// shuffles the images
  }
  for (let imgSel = 0; imgSel < numImages; imgSel++){
    textureWrap(MIRROR);
    push();
    translate(width*0.2*imgSel,height*0.5,-1000);
    rotateY(cubeRotate%(imgSel*100)*0.5*PI);
    rotateX(cubeRotate*PI);
    rotateZ(cubeRotate);
    //let tex = images[int(random(imgSel))];
    texture(images[imgSel]);
    let imgScale = 0.8;
    box(images[imgSel].width*imgScale,images[imgSel].height*imgScale,images[imgSel].width*imgScale)
    pop();
  }
}


/*
function handleFile(file) { //////////////Loading Audio Files//////////////
  if (file.type === 'audio') {
    file = loadSound(file.data,'');
    //file.hide();
  } else if (file.type === 'image') {
    //file = createImg(file.data, '');
    //file.hide();
  } else {
    //file = null;
  }
}
*/