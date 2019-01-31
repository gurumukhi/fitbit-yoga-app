import document from "document";
import { vibration } from "haptics";
// Disable app timeout
import { me } from "appbit";

if (me.appTimeoutEnabled) {
 console.log("Timeout is enabled");
}

me.appTimeoutEnabled = false; // Disable timeout

let homeScreen = document.getElementById("homeScreen");
let pranayamListScreen = document.getElementById("pranayamListScreen");
let countdownScreen = document.getElementById("countdownScreen");
let listButton = document.getElementById("btn-tr");
let playButton = document.getElementById("btn-br");
let timerSetInterval = null;

function hideAll() {
  listButton.style.visibility = "hidden";
  playButton.style.visibility = "hidden";
  homeScreen.style.display = "none";
  pranayamListScreen.style.display = "none";
  countdownScreen.style.display = "none";
}

function showHomeScreen() {
  hideAll();
  listButton.style.visibility = "visible";
  playButton.style.visibility = "visible";
  homeScreen.style.display = "inline";
}

function showPranayamListScreen() {
  hideAll();
  pranayamListScreen.style.display = "inline";
}

function showCountdownScreen() {
  hideAll();
  me.appTimeoutEnabled = false; // Disable timeout
// if (!me.appTimeoutEnabled) {
 console.log("Timeout is enabled now?" + me.appTimeoutEnabled);
// }
  countdownScreen.style.display = "inline";
  startCountdown();
}

document.onkeypress = function(evt) {
  if (evt.key === "back") {
    if (countdownScreen.style.display === "inline") {
      showHomeScreen();
      evt.preventDefault();
    } else if (pranayamListScreen.style.display === "inline") {
      showHomeScreen();
      evt.preventDefault();
    } else if (homeScreen.style.display === "inline") {
      // Default behaviour to exit the app
    }
  }
};

listButton.onactivate = function(evt) {
  console.log(homeScreen.style.display);
  if (homeScreen.style.display === "inline" || homeScreen.style.display === "inherit") {
    showPranayamListScreen();
  }
};

playButton.onactivate = function(evt) {
  if (homeScreen.style.display === "inline" || homeScreen.style.display === "inherit") {
    showCountdownScreen();
  }
};

function getSecondsInMinutes(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

function setTimerText(countdown, originalMins) {
  let mins = getSecondsInMinutes(countdown);
  let minsLeft = countdown/60;
  // console.log(countdown + '..' + minsLeft + '..' + originalMins);
  if (minsLeft <= originalMins) {
    document.getElementById("cdTimer").text = mins;
    if (document.getElementById("cdText").text != 'time') {
      vibration.start("ring");
      setTimeout(() => {
        vibration.stop();
        // startCountdown(i+1);
      }, 1000);
      document.getElementById("cdText").text = 'time';
    }
  } else {
    setTimeout(() => {
      document.getElementById("cdTimer").text = '';
    }, 500)
    document.getElementById("cdTimer").text = '--:--';
    document.getElementById("cdText").text = 'get ready!';
  }
}

function startCountdown(i = 0) {
  if (timerSetInterval) {
    clearInterval(timerSetInterval);
  }
  var prNameList = ['Bhastrika','KapaalBhaati','Baahya','AnulomVilom','Bharaamari','Udgeet','Pranav'];
  var prTimeList = [1,3,1,5,1,1,1];
  // var prNameList = ['Bhastrika','KapaalBhaati','Baahya'];
  // var prTimeList = [0.5,0.5,0.5];
  var header = document.getElementById("cdHeader");
  var timer = document.getElementById("cdTimer");
  if (i == prNameList.length) {
    showSummary();
    return;
  }
  
  header.text = prNameList[i];
  var countdown = prTimeList[i] * 60 + 5;
  var total = countdown;
  setTimerText(countdown--, prTimeList[i]);
  timerSetInterval = setInterval(() => {
    setTimerText(countdown, prTimeList[i]);
    if (!countdown--) {
      vibration.start("ring");
      setTimeout(() => {
        vibration.stop();
        startCountdown(i+1);
      }, 1000);
      clearInterval(timerSetInterval);
    }
  }, 1000);
}

function showSummary() {
  document.getElementById("cdHeader").text = 'Relax';
  document.getElementById("cdTimer").text = 'Done!';
  document.getElementById("cdText").text = '';
}
