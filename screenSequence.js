const debugQ = false;

var screenNum = 0;

var frameRateN = (1/60)/60;

function setScreenNum(n) {
  screenNum = n;
  debugQ == (debugQ || screenNum == 0);
  if (debugQ) {frameRateN = 0.5}
}

const off = "#000";

var transparency = "11";

var textString = "";
var backgroundColor = off;
var textColor = "#fff";

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("screen");
}

function draw() {
    if (screenNum == 0) {
    // debugging code (test page that shows all 5 screens)
    for (var i = 1; i <= 5; i++) {
      screenSequence(i);
      frameRate(frameRateN);
      fill(off);
      rect((i - 1) * windowWidth/5, windowHeight/5, windowWidth/5, windowHeight/5);
      fill(backgroundColor);
      rect((i - 1) * windowWidth/5, windowHeight/5, windowWidth/5, windowHeight/5);
      fill(textColor);
      textFont("Menlo")
      textAlign(CENTER);
      textSize(windowWidth/20/5);
      text(textString, (2 * i - 1) * windowWidth/10, 3 * windowHeight/10);
    };
  } else {
    // actual code
    screenSequence(screenNum);
    frameRate(frameRateN);
    background(off);
    fill(backgroundColor);
    rect(0, 0, windowWidth, windowHeight);
    fill(textColor);
    textFont("Menlo")
    textAlign(CENTER);
    textSize(windowWidth/20);
    text(textString, windowWidth/2, windowHeight/2);
  };
}

function screenSequence(n) {
  //current time
  var date = new Date();
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  //update transparency each day
  //exhibition runs from April 15-21
         if (day == 15) {transparency = "11";}
    else if (day == 16) {transparency = "33";}
    else if (day == 17) {transparency = "55";}
    else if (day == 18) {transparency = "77";}
    else if (day == 19) {transparency = "99";}
    else if (day == 20) {transparency = "bb";}
    else if (day == 21) {transparency = "dd";}

  //get text and colors intended to be displayed at the current time
  if (debugQ) {
    var imageInfo = getText(min % 24, sec);
  } else {
    var imageInfo = getText(hour, min);
  };

  textString = imageInfo[0][n - 1];
  backgroundColor = imageInfo[1] + transparency;
}

//image arrangements in the form [[textStrings], backgroundColor]
const blank = [["", "", "", "", ""], off];
const title = [
  ["coming back", "to where you started", "is not the same", "as never", "having left"],
  "#def0ff"
];
const nobodyFeels = [
  ["nobody", "feels", "", "any", "pain"],
  "#e37861"
];
const everyDay = [
  ["every", "day", "is a", "new", "year"],
  "#96c4e8"
];
const sorrow = [
  ["tread", "in sorrow", "drown", "in answers"],
  "#2233aa"
];
const onlyExit = [
  ["the entrance", "is", "your", "only", "exit"],
  "#1a0042"
];
const audrey = [
  ["I", "am", "not", "a", "slut"],
  "#9ed680"
];
const silence = [
  ["", "we", "silence", "ourselves", ""],
  "#ffff00"
];
const dontWait = [
  ["", "don't wait", "to be", "good", ""],
  "#abcdef"
];
const getting = [
  ["there", "is", "nothing", "to", "get"],
  "#995599"
];

//choose image arrangement and colors based on the current time (hour, minute)
function getText(h, m) {
  var imageInfo;
  var mod4 = h % 4; //loop every 4 hours (could expand based on submissions)
  if (mod4 == 0) {
    if (0 <= m && m <= 40) {
      imageInfo = title;
    } else if (41 <= m && m <= 59) {
      imageInfo = nobodyFeels;
    }
  } else if (mod4 === 1) {
    if (0 <= m && m <= 22) {
      imageInfo = everyDay;
    } else if (23 <= m && m <= 33) {
      imageInfo = title;
    } else if (34 <= m && m <= 50) {
      imageInfo = onlyExit;
    } else if (51 <= m && m <= 59) {
      imageInfo = dontWait;
    }
  } else if (mod4 === 2) {
    if (0 <= m && m <= 22) {
      imageInfo = title;
    } else if (23 <= m && m <= 33) {
      imageInfo = silence;
    } else if (34 <= m && m <= 50) {
      imageInfo = title;
    } else if (51 <= m && m <= 59) {
      imageInfo = getting;
    }
  } else if (mod4 === 3) {
    if (0 <= m && m <= 18) {
      imageInfo = onlyExit;
    } else if (19 <= m && m <= 30) {
      imageInfo = nobodyFeels;
    } else if (31 <= m && m <= 59) {
      imageInfo = everyDay;
    }
  } else {
    imageInfo = title;
  };
  return imageInfo;
}
