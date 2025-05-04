
class backgroundCard {
  constructor(x, y, id) {
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = cardW;
    this.h = cardH;

    //Floating effect:
    this.floatOffset = random(TWO_PI); 
    this.floatSpeed = random(0.01, 0.03);
  }
    
  over(rolling) {
  // Is mouse over object
  if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
    this.rollover = true;
    var rolling = this.rollover
    } else {
      this.rollover = false;
      var rolling = this.rollover
    }
  return rolling
  }
  
  show(imageSet,x,y) {
    push();
    strokeWeight(2.5);

    // Different fill based on state
    if (this.rollover) {
      fill(255);
      } else {
      fill(0);
    }

    // Add floating effect:
    let floatY = sin(this.floatOffset) * 2; // drift up and down
    translate(floatY, floatY);

    rect(this.x-5, this.y-5, this.w+10, this.h+10); // hovering frame
    image(imageSet, gridWPos * (x + 1), y, cardW, cardH); // card graphic display

    pop();
    this.floatOffset += this.floatSpeed; // keep moving
  }
}

class cardDeck {
  constructor(x, y, id) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = cardW;
    this.h = cardH;
    this.id = id;
    this.offsetX = 0;
    this.offsetY = 0;

    // Floating effect:
    this.floatOffset = random(TWO_PI); 
    this.floatSpeed = random(0.01, 0.03);
  }
  
  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update(cardID) {
    // Adjust location if being dragged
    var cardID = this.id;
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    return cardID;
  }

  show(imageID) {
    push();
    stroke(0);
    strokeWeight(2.5)

    // Add floating effect:
    let floatY = sin(this.floatOffset) * 2; // drift up and down
    translate(floatY, floatY);

    // Different fill based on state
    if (this.dragging) {
      fill(50,50,50,255);
    } else if (this.rollover) {
      fill(100,100,100,255);
    } else {
      fill(255);
    }
    //rect(this.x, this.y, this.w, this.h);

    image(imageID, this.x, this.y,cardW,cardH)

    pop();
    this.floatOffset += this.floatSpeed; // keep moving
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      var dragState = this.dragging
      return dragState
    }
  }
  
  released() {
    // Quit dragging
    this.dragging = false;
  }
  
}

class timeline {
  constructor(x, y, id) {
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = timerWidth;
    this.h = timerHeight;
  }
    
  over(rolling) {
  // Is mouse over object
  if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
    this.rollover = true;
    var rolling = this.rollover
    } else {
      this.rollover = false;
      var rolling = this.rollover
    }
  return rolling
  }


  show() {
    push();
    strokeWeight(2.5);
    stroke(255)
    // Different fill based on state
    if (this.rollover) {
      fill(0);
      } else {
      fill(0);
    }
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    //text(round(this.x) ,this.x+(this.w*0.5),this.y+(this.w*0.5));
    pop();
  }
}

class timelineCard {
  constructor(x, y, id, time) {
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = 0;
    this.h = timerHeight*2;
    this.id = id;
    this.time = time;

    // Save the CARD NAME and GRAPHIC at the time it's placed
    this.cardName = major.deckShuffled[id];
    this.cardGraphic = major.cardGraphics[major.deckShuffled[id]];

    this.triggered = false;
  }
  
  show() {
    push();
    strokeWeight(2.5);
    stroke(0)
    fill(255);

    textAlign(CENTER, CENTER);
    
    let miniCardW = cardW/5
    let miniCardH = cardH/5
    if (this.time < timerValue){

      text(timerValue -(this.time) + ' secs', this.x, this.y - 20);
      text(this.cardName, this.x, this.y - 40);

      stroke(255)
      rect(this.x, this.y, this.w, this.h);

      image(this.cardGraphic, this.x - (miniCardW/2), this.y + this.h, miniCardW, miniCardH);

    } else if (this.time == timerValue  && !this.triggered ){

      console.log("Sending CC: " + this.cardName);
      midiOutput.channels[1].sendControlChange(5, this.cardName);
      this.triggered = true;
    }

    pop();
  }
}

class Branch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 0;
    this.maxLength = random(50, 100); 
    this.growthSpeed = random(0.5, 1.5);
    this.angle = random(-PI/8, PI/8);
  }

  update() {
    if (this.length < this.maxLength) {
      this.length += this.growthSpeed;
    }
  }

  display() {
    push();
    stroke(255);
    strokeWeight(5);
    translate(this.x, this.y);
    rotate(this.angle);
    line(0, 0, 0, -this.length);

    // tiny leaf when fully grown
    if (this.length >= this.maxLength) {
      fill(255);
      noStroke();
      //ellipse(0, -this.length, 6, 8);
    }


    pop();
  }
}