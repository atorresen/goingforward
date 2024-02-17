var totalDuration = 3; //sequence restarts every 3 minutes
var i = 0;

function screenSequence(n) {
  //current time
  var date = new Date();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  //// TODO: sync to milliseconds

  //array of images intended to be displayed at current time for a given duration
  // var imageArray = getImages(min % totalDuration, sec);
  var imageArray = getImages(0, sec % 22); //currently only hooked up for the first 22 seconds
  var duration = imageArray[5] * 1000;

  //image that belongs to screen n
  var image = imageArray[n - 1];

  document.getElementById("screen" + n).src = "images/" + image + ".gif";
  i++;

  setTimeout(screenSequence, duration, n);
};

//choose image arrangement and duration based on the current time
function getImages(m, s) {
  var imageArray;
  if (m === 0) {
    if (0 <= s && s <= 9) {
      imageArray = title;
    } else if (10 <= s && s <= 12) {
      imageArray = blank;
    } else if (13 <= s && s <= 22) {
      imageArray = triptych
    }
  } else if (m === 1) {

  } else if (m === 2) {

  };
  return imageArray;
};

//image arrangements with durations
const title = ["cb", "twys", "ints", "an", "hl", 2];
const blank = ["x", "x", "x", "x", "x", 3];
const triptych = ["x", "nfap", "ediany", "teiyoe", "x", 4];
const triptychPt1 = ["x", "nfap", "x", "x", "x"];
const triptychPt2 = ["x", "x", "ediany", "x", "x"];
const triptychPt3 = ["x", "x", "x", "teiyoe", "x"];
const sorrow = ["tis", "x", "x", "x", "dia"];
const authority = ["x", "wso", "x", "niic", "wso"];
const onlyExitRow = ["teiyoe", "teiyoe", "teiyoe", "teiyoe", "teiyoe"];
