import document from "document";

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
  console.log("Show home screen");
  hideAll();
  listButton.style.visibility = "visible";
  playButton.style.visibility = "visible";
  homeScreen.style.display = "inline";
}

function showPranayamListScreen() {
  console.log("Show list screen");
  hideAll();
  pranayamListScreen.style.display = "inline";
}

function showCountdownScreen() {
  console.log("Show countdown screen");
  hideAll();
  countdownScreen.style.display = "inline";
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
