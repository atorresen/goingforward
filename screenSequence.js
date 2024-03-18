var totalDuration = 3; //sequence restarts every 3 minutes
var i = 0;
var screenNum = 0;

var offColor = "black";

var textString = "";
var backgroundColor = offColor;
var textColor = offColor;


//p5.js canvas
function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("screen1");
}

function draw() {
  background(backgroundColor);
  fill(textColor);
  textAlign(CENTER);
  textSize(38);
  text(textString, windowWidth/2, windowHeight/2);
}


//choreography
function screenSequence(n) {
  screenNum = n;

  //current time
  var date = new Date();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  //array of images intended to be displayed at current time for a given duration
  // var imageArray = getImages(min % totalDuration, sec);
  var imageInfo = getImages(0, sec % 22); //currently only hooked up for the first 22 seconds
  var duration = imageInfo[3];

  //image that belongs to screen n
  textString = imageInfo[0][n - 1];


  console.log(textString);

  if (imageInfo[1].length == 1) {
    backgroundColor = imageInfo[1][0]
  } else {
    backgroundColor = imageInfo[1][n - 1]
  };

  if (imageInfo[2].length == 1) {
    textColor = imageInfo[2][0]
  } else {
    textColor = imageInfo[2][n - 1]
  };

  document.getElementById("screen" + screenNum).src = "images/" + image + ".gif";
  i++;

  setTimeout(getImages, duration, screenNum, sec);
};

//choose image arrangement, colors, and duration based on the current time
function getImages(m, s) {
  var imageInfo;
  if (m === 0) {
    if (0 <= s && s <= 9) {
      imageInfo = title;
    } else if (10 <= s && s <= 12) {
      imageInfo = sorrow;
    } else if (13 <= s && s <= 22) {
      imageInfo = onlyExitRow
    }
  } else if (m === 1) {

  } else if (m === 2) {

  };
  return imageInfo;
};

//image arrangements with durations, in the form [[textStrings], [backgroundColors], [textColors], duration]
const title = [
  ["coming back", "to where you started", "is not the same", "as never", "having left"],
  ["red", "orange", "red", "orange", "red"],
  ["white"],
  2
];
const blank = [
  ["", "", "", "", ""],
  [offColor, offColor, offColor, offColor, offColor],
  [offColor],
  2
];
const triptych = [
  ["", "nobody feels any pain", "every day is a new year", "the entrance is your only exit", ""],
  [offColor, "orange", "lightblue", "eggplant", offColor],
  ["white"],
  2
];
const triptychPt1 = [
  ["", "nobody feels any pain", "", "", ""],
  [offColor, "orange", offColor, offColor, offColor],
  ["white"],
  2
];
const triptychPt2 = [
  ["", "", "every day is a new year", "", ""],
  [offColor, offColor, "lightblue", offColor, offColor],
  ["white"],
  2
];
const triptychPt3 = [
  ["", "", "", "the entrance is your only exit", ""],
  [offColor, offColor, offColor, "eggplant", offColor],
  ["black"],
  2
];
const sorrow = [
  ["tread in sorrow", "", "", "", "drown in answers"],
  ["blue", offColor, offColor, offColor, "teal"],
  ["white"],
  2
];
const authority = [
  ["", "wso", "", "niic", "wso"],
  ["orange"],
  ["white"],
  2
];
const onlyExitRow = [
  ["the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit"],
  ["eggplant"],
  ["black"],
  2
];
