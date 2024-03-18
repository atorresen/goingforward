var totalDuration = 3; //sequence restarts every 3 minutes
var screenNum = 0;

const offColor = "000000";

var textString = "";
var backgroundColor = offColor;
var backgroundColorList = [backgroundColor];
var textColor = offColor;
var textColorList = [textColor];

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("screen");
};

function draw() {
  frameRate(2.5);
  background(random(backgroundColorList));
  fill(random(textColorList));
  textFont("Menlo")
  textAlign(CENTER);
  textSize(38);
  text(textString, windowWidth/2, windowHeight/2)
};

function nearbyColors(start, spread) {
  // code taken from https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
  var dec = parseInt(start, 16);
  let r = (dec >> 16) + spread;
  r > 255 && (r = 255);
  r < 0 && (r = 0);
  let g = (dec & 0x0000ff) + spread;
  g > 255 && (g = 255);
  g < 0 && (g = 0);
  let b = ((dec >> 8) & 0x00ff) + spread;
  b > 255 && (b = 255);
  b < 0 && (b = 0);
  var end = (g | (b << 8) | (r << 16)).toString(16);

  var numColors = Math.abs(spread);
  var colorList = [];
  for (var i = 1; i <= numColors; i++) {
    colorList.push(
      lerpColor(color("#" + start), color("#" + end), i / numColors)
    )
  };
  return colorList;
}


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
  var colorSpread = imageInfo[4];

  //design screen n
  textString = imageInfo[0][n - 1];

  if (imageInfo[1].length == 1) {
    backgroundColor = imageInfo[1][0];
  } else {
    backgroundColor = imageInfo[1][n - 1]
  };

  if (imageInfo[2].length == 1) {
    textColor = imageInfo[2][0]
  } else {
    textColor = imageInfo[2][n - 1]
  };

  backgroundColorList = nearbyColors(backgroundColor, colorSpread);
  textColorList = nearbyColors(textColor, colorSpread);

  //reset every second
  setTimeout(getImages, duration, screenNum, sec);
};


//image arrangements with durations, in the form [[textStrings], [backgroundColors], [textColors], duration]
const title = [
  ["coming back", "to where you started", "is not the same", "as never", "having left"],
  ["62cccc", "62cc8c", "62adcc", "9de3e5", "62cccc"],
  ["ffffff"],
  2,
  -50
];
const blank = [
  ["", "", "", "", ""],
  [offColor, offColor, offColor, offColor, offColor],
  [offColor],
  2,
  0
];
const triptych = [
  ["", "nobody feels any pain", "every day is a new year", "the entrance is your only exit", ""],
  [offColor, "ff7f50", "afeeee", "4b0082", offColor],
  ["ffffff"],
  2,
  50
];
const triptychPt1 = [
  ["", "nobody feels any pain", "", "", ""],
  [offColor, "ff7f50", offColor, offColor, offColor],
  ["ffffff"],
  2,
  -50
];
const triptychPt2 = [
  ["", "", "every day is a new year", "", ""],
  [offColor, offColor, "afeeee", offColor, offColor],
  ["ffffff"],
  2,
  -50
];
const triptychPt3 = [
  ["", "", "", "the entrance is your only exit", ""],
  [offColor, offColor, offColor, "4b0082", offColor],
  ["000000"],
  2
];
const sorrow = [
  ["tread in sorrow", "", "", "", "drown in answers"],
  ["000075", offColor, offColor, offColor, "008090"],
  ["ffffff"],
  2,
  50
];
const authority = [
  ["", "we silence ourselves", "", "nobody is in charge", "we silence ourselves"],
  ["ff7f50"],
  ["ffffff"],
  2,
  -20
];
const onlyExitRow = [
  ["the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit"],
  ["4b0082"],
  ["000000"],
  2,
  -50
];

//choose image arrangement, colors, and duration based on the current time
function getImages(m, s) {
  var imageInfo;
  if (m === 0) {
    if (0 <= s && s <= 9) {
      imageInfo = title;
    } else if (10 <= s && s <= 12) {
      imageInfo = sorrow;
    } else if (13 <= s && s <= 22) {
      imageInfo = onlyExitRow;
    }
  } else if (m === 1) {
    //TODO
  } else if (m === 2) {
    //TODO
  };
  return imageInfo;
};
