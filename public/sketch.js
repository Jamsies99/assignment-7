var socket;
var buttonSmall, buttonLarge, buttonNormal, buttonCircle, buttonSquare;
var shapeSize;

var emoji1, emoji2, emoji3;
var isSquare;

var slider;

function preload(){
  emoji1 = loadImage('images/arm.png');
  emoji2 = loadImage('images/heart.png');
  emoji3 = loadImage('images/skull.png');
}

function setup() {
  createCanvas(1000, 1000);


  socket = io.connect('https://drawingfunthings.herokuapp.com/');
  //socket = io.connect('https://localhost:3000');

  background(color(random(255), random(100), random(255)));
  // handle the broadcast calls coming from the server
  socket.on('circle', newShapeDrawing);
  socket.on('emoji', newEmojiDrawing);
  isSquare = true;

  shapeSize = 25;
  buttonSmall = select('#smaller');
  buttonLarge = select('#larger');
  buttonNormal = select('#normal');
  buttonCircle = select('#circle');
  buttonSquare = select('#square');


  buttonSmall.mousePressed( makeSmaller );
  buttonLarge.mousePressed( makeLarger );
  buttonNormal.mousePressed( makeNormal );
  buttonSquare.mousePressed(makeSquare);
  buttonCircle.mousePressed(makeCircle);

  colorMode(HSB);

  slider = createSlider(0,360,0);
}

function makeSquare(){
  isSquare = true;
}
function makeCircle(){
  isSquare = false;
}

function makeSmaller(){
  shapeSize = 15;
}

function makeLarger(){
  shapeSize = 55;
}

function makeNormal(){
  shapeSize = 25;
}

function newShapeDrawing(data, shape, isSquare){
  if (!isSquare){
  fill(data.hue, 100, 100);
  ellipse(data.x, data.y, data.size, data.size);
}
else {
  fill(slider.value(), 100, 100);
  square(data.x, data.y, shapeSize);
}
}

function newEmojiDrawing(data){
  if(data.img == 1){
    image(emoji1, data.x, data.y, 50, 50);
  }
  else if(data.img == 2){
      image(emoji2, data.x, data.y, 50, 50);
    }

  else{
    image(emoji3, data.x, data.y, 50,50);
  }
}

function draw() {
}

// will activate whenever you click and drag
function mouseDragged(){
  if(isSquare){
  fill(slider.value(), 100, 100);
  square(mouseX, mouseY, shapeSize);
}
else {
    fill(slider.value(), 100, 100);
    ellipse(mouseX, mouseY, shapeSize, shapeSize);
}


  var data = {
    x: mouseX,
    y: mouseY,
    size: shapeSize,
    hue: slider.value()
  };

  socket.emit('circle', data);
}

function mouseClicked(){
  var data = {
    x: mouseX,
    y: mouseY,
    img: 1
  };
  if (slider.value()< 120){
    image(emoji1, mouseX, mouseY, 50, 50);
    data.img = 1;
  }
  else if (120<slider.value() && slider.value()<240){
    image(emoji2, mouseX, mouseY, 50, 50);
    data.img = 2;
  }
  else {
    image(emoji3, mouseX, mouseY, 50, 50);
    data.img =3;
  }

  socket.emit('emoji', data);
}
