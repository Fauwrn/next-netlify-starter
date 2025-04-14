// based on Click and Drag an object, Daniel Shiffman <http://www.shiffman.net>

class card {
    constructor(x, y, id) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the ellipse?
      this.x = x;
      this.y = y;
      this.w = cardW;
      this.h = cardH;

      this.name = id;

      this.offsetX = 0;
      this.offsetY = 0;
    }
    
    over() {
      // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
    }
  
    update() {
      // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }
  
    show(cardID) {
      var cardID = this.name;
      push();
      //stroke(255);
      noStroke()
      //strokeWeight(2.5)
      // Different fill based on state
      if (this.dragging) {
        fill(50,50,50,255);
      } else if (this.rollover) {
        fill(100,100,100,255);
      } else {
        fill(0,0,0,255);
      }
      /*
      rect(this.x, this.y, this.w, this.h);
      fill(255);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(cardID+1,this.x+(this.w*0.5),this.y+(this.w*0.5));
      */
      pop();
      return cardID;
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