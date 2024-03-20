var totalDuration = 3; //sequence restarts every 3 minutes
var screenNum = 0;

function setScreenNum(n) {
  screenNum = n;
}

const off = "000";

var textString = "";
var backgroundColor = off;
var backgroundColorList = ["#" + off];
var textColor = off;
var textColorList = ["#" + off];

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("screen");
};

function draw() {
  screenSequence(screenNum);
  frameRate(2.5);
  background(random(backgroundColorList));
  fill(random(textColorList));
  textFont("Menlo")
  textAlign(CENTER);
  textSize(windowWidth/20);
  text(textString, windowWidth/2, windowHeight/2);

  // for debugging:
  // var date = new Date();
  // var sec = date.getSeconds();
  // fill("red");
  // text(sec, 50, 50);
};


function nearbyColors(start, spread) {
  var dec = parseInt(start, 16);
  if (dec == 0) {
    colorList = ["#000"];
  } else {
    // code taken from https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
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
  };
  return colorList;
}


function screenSequence(n) {
  //current time
  var date = new Date();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  //get text and colors intended to be displayed at the current time
  // var imageArray = getText(min % totalDuration, sec);
  var imageInfo = getText(0, sec % 52); //currently only hooked up this far
  var colorSpread = imageInfo[3];

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
};


//image arrangements in the form [[textStrings], [backgroundColors], [textColors], colorVariation]
const title = [
  ["coming back", "to where you started", "is not the same", "as never", "having left"],
  ["62cccc", "62cc8c", "62adcc", "9de3e5", "62cccc"],
  ["ffffff"],
  -50
];
const blank = [
  ["", "", "", "", ""],
  [off, off, off, off, off],
  [off],
  0
];
const triptych = [
  ["", "nobody feels any pain", "every day is a new year", "the entrance is your only exit", ""],
  [off, "ff7f50", "afeeee", "4b0082", off],
  ["ffffff"],
  50
];
const triptychPt1 = [
  ["", "nobody feels any pain", "", "", ""],
  [off, "ff7f50", off, off, off],
  ["ffffff"],
  -50
];
const triptychPt2 = [
  ["", "", "every day is a new year", "", ""],
  [off, off, "afeeee", off, off],
  ["ffffff"],
  -50
];
const triptychPt3 = [
  ["", "", "", "the entrance is your only exit", ""],
  [off, off, off, "4b0082", off],
  ["000000"],
  -50
];
const sorrow = [
  ["tread in sorrow", "", "", "", "drown in answers"],
  ["000075", off, off, off, "008090"],
  ["ffffff"],
  50
];
const authority = [
  ["", "we silence ourselves", "", "nobody is in charge", "we silence ourselves"],
  ["ff7f50"],
  ["ffffff"],
  -20
];
const onlyExitRow = [
  ["the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit", "the entrance is your only exit"],
  ["4b0082"],
  ["000000"],
  -50
];
const armSlut = [
  ["the strong arms to carry you away", "", "", "I am not a slut", ""],
  ["cc0000", off, off, "ddff99", off],
  ["0033cc", off, off, "ff66b3", off],
  -50
];

//choose image arrangement and colors based on the current time
function getText(m, s) {
  var imageInfo;
  if (m === 0) {
    if (0 <= s && s <= 9) {
      imageInfo = title;
    } else if (10 <= s && s <= 12) {
      imageInfo = blank;
    } else if (13 <= s && s <= 22) {
      imageInfo = triptych;
    } else if (23 <= s && s <= 27) {
      imageInfo = triptychPt1;
    } else if (28 <= s && s <= 31) {
      imageInfo = triptychPt2;
    } else if (32 <= s && s <= 35) {
      imageInfo = triptychPt3;
    } else if (36 <= s && s <= 39) {
      imageInfo = onlyExitRow;
    } else if (40 <= s && s <= 42) {
      imageInfo = blank;
    } else if (43 <= s && s <= 52) {
      imageInfo = sorrow;
    }
  } else if (m === 1) {
    //TODO
  } else if (m === 2) {
    //TODO
  };
  return imageInfo;
};
