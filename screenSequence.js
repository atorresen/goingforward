const debugQ = false;
const font = "Lato";

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
  loadFont(font + ".ttf");
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
      rect((i - 1) * windowWidth/5, windowHeight/5, windowWidth/5.1, windowHeight/5.1);
      fill(backgroundColor);
      rect((i - 1) * windowWidth/5, windowHeight/5, windowWidth/5.1, windowHeight/5.1);
      fill(textColor);
      textFont(font);
      textStyle(BOLD);
      textAlign(CENTER);
      textSize(windowWidth/15/5);
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
    textFont(font);
    textStyle(BOLD);
    textAlign(CENTER);
    textSize(windowWidth/15);
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
  //exhibition runs from April 18-25
         if (day == 18) {transparency = "11";}
    else if (day == 19) {transparency = "22";}
    else if (day == 20) {transparency = "44";}
    else if (day == 21) {transparency = "66";}
    else if (day == 22) {transparency = "88";}
    else if (day == 23) {transparency = "aa";}
    else if (day == 24) {transparency = "cc";}
    else if (day == 15) {transparency = "ee";}

  //get text and colors intended to be displayed at the current time
  if (debugQ) {
    var imageInfo = getText(sec % 24, sec);
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
