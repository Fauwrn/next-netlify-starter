// based on Click and Drag an object, Daniel Shiffman <http://www.shiffman.net>

class timeline {
  constructor(x, y, id) {
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = cardW;
    this.h = cardH;

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
      fill(255);
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
