import document from "document";

let btnTR = document.getElementById("btn-tr");
btnTR.onactivate = function(evt) {
  console.log("TOP RIGHT clicked!");
}

let btnBR = document.getElementById("btn-br");
btnBR.onactivate = function(evt) {
  console.log("Bottom RIGHT clicked!");
}

let homeScreen = document.getElementById("homeScreen");
let pranayamListScreen = document.getElementById("pranayamListScreen");
let countdownScreen = document.getElementById("countdownScreen");

function showHomeScreen() {
  console.log("Show home screen");
  homeScreen.style.display = "inline";
  pranayamListScreen.style.display = "none";
  countdownScreen.style.display = "none";
}

function showPranayamListScreen() {
  console.log("Show list screen");
  homeScreen.style.display = "none";
  pranayamListScreen.style.display = "inline";
  countdownScreen.style.display = "none";  
}

function showCountdownScreen() {
  console.log("Show countdown screen");
  homeScreen.style.display = "none";
  pranayamListScreen.style.display = "none";
  countdownScreen.style.display = "inline";
}

btnTR.onclick = function() {
  showPranayamListScreen();
}

btnBR.onclick = function () {
  showCountdownScreen();
}

document.onkeypress = function(evt) {
    console.log(evt.key);
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
    } else if (evt.key === "up" && homeScreen.style.display === "inline") {
        showPranayamListScreen();
        evt.preventDefault();
    } else if (evt.key === "down" && homeScreen.style.display === "inline") {
        showCountdownScreen();
        evt.preventDefault();
    }
  }