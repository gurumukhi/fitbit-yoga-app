import document from "document";
import { vibration } from "haptics";

let homeScreen = document.getElementById("homeScreen");
let pranayamListScreen = document.getElementById("pranayamListScreen");
let countdownScreen = document.getElementById("countdownScreen");
let listButton = document.getElementById("btn-tr");
let playButton = document.getElementById("btn-br");

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
  showPranayamListScreen();
};

playButton.onactivate = function(evt) {
  showCountdownScreen();
};

startCountdown();

function getSecondsInMinutes(seconds) {
  var date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
}

function startCountdown(i = 0) {
  var prNameList = ['Bhastrika','KapaalBhaati','Baahya','AnulomVilom','Bharaamari','Udgeet','Pranav'];
  var prTimeList = [1,3,1,5,1,1,1];
  var header = document.getElementById("cdHeader");
  var timer = document.getElementById("cdTimer");
  if (i == prNameList.length) {
    showSummary();
    return;
  }
  header.text = prNameList[i];
  var countdown = prTimeList[i] * 60;
  var timerSetInterval = setInterval(() => {
    timer.text = getSecondsInMinutes(countdown);
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
