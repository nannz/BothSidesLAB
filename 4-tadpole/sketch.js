"use strict";
var mumR = 30;
var childR = 10;
var t;
var C_GRAVITY = 20;
var mumPos;
var tadpoles = [];
var thisTime;

function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  ellipseMode(CENTER);
  fill(0);
  mumPos = createVector(width / 2, height / 2);
  t = new Tadpole(random(width), random(height), childR);

  for (var i = 0; i < 20; i++) {
    tadpoles.push(new Tadpole(random(width), random(height), childR));
  }
  
  thisTime = second();
}

function draw() {
  background(255);
  var mouseVec = createVector(mouseX, mouseY);

  //update the tadpoles
  for (var i = 0; i < tadpoles.length; i++) {
    var t = tadpoles[i];
    t.flock(tadpoles);
    t.update();
    t.checkEdges();
    t.display();
  }

  //draw the mouse
  if (mouseX != 0 && mouseY != 0) {
    mumPos.x = mouseX;
    mumPos.y = mouseY;
    ellipse(mouseX, mouseY, mumR, mumR);
  } else {
    mumPos.x = width / 2;
    mumPos.y = height / 2;
    ellipse(width / 2, height / 2, mumR, mumR);
  }


  //draw new tabpoles
  //set a timer, each 1 sseconds
  if(second()-thisTime>1){
    drawTabpoles();
    thisTime = second();
  }
  
  //delete the old tadpoles
  if(tadpoles.length > 50){
    //tadpoles = tadpoles.reverse();
    //tadpoles.pop();
  }
}

function drawTabpoles(){
  var a = 0.0;
  var inc = TWO_PI / 25.0;
  for (var i = 0; i < 25; i++) {
    t = new Tadpole(100+200*cos(a), 100+200*sin(a));
    tadpoles.push(t);
    a = a + inc;
  }
}