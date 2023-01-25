//* Element creation scripts

const bodyEl = document.getElementsByTagName("body")[0];

createChildOf(bodyEl, {
  tagName: "div",
  classes: "tab",
});
const tabEl = document.getElementsByClassName("tab")[0];

createChildOf(tabEl, {
  tagName: "div",
  classes: "tab-item show-clock",

  text: "Clock",
});
createChildOf(tabEl, {
  tagName: "div",
  classes: "tab-item show-stopwatch",

  text: "Stopwatch",
});

createChildOf(bodyEl, {
  tagName: "div",
  classes: "clock",
  id: "clockDisplay",
});
// let clock = document.getElementById('clockDisplay');
// clock.setAttribute("onload", "showTime()");

createChildOf(bodyEl, {
  tagName: "div",
  classes: "buttons",
});
let buttonsEl = document.getElementsByClassName("buttons")[0];
createChildOf(buttonsEl, {
  tagName: "div",
  classes: "stopwatch_button",
  id: "pauseTimer",
  text: "Pause",
});
createChildOf(buttonsEl, {
  tagName: "div",
  classes: "stopwatch_button",
  id: "startTimer",
  text: "Start",
});
createChildOf(buttonsEl, {
  tagName: "div",
  classes: "stopwatch_button",
  id: "resetTimer",
  text: "Reset",
});

//functions for creating HTML Elements
function createSiblingAfter(e, passedObject) {
  const {
    tagName,
    classes,
    onclick,
    text,
    id,
    href,
    target,
    alt,
    placeholder,
  } = passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (alt) newElement.setAttribute("alt", alt);
  if (placeholder) newElement.setAttribute("placeholder", placeholder);

  let createdEl = e.insertAdjacentElement("afterend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
  return createdEl;
}

function createChildOf(e, passedObject) {
  const { tagName, classes, onclick, text, id, href, target, src, alt } =
    passedObject;

  let newElement = document.createElement(tagName);

  if (classes) newElement.setAttribute("class", classes);

  if (onclick) newElement.setAttribute("onclick", onclick);
  if (id) newElement.setAttribute("id", id);
  if (href) newElement.setAttribute("href", href);
  if (target) newElement.setAttribute("target", target);
  if (src) newElement.setAttribute("src", src);
  if (alt) newElement.setAttribute("alt", alt);

  e.insertAdjacentElement("beforeend", newElement);
  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }
}

//* DECLARING VARIABLES
let timeOutId;
// isClockRunning = false;
const showClockTab = document.getElementsByClassName("show-clock")[0];
const showStopwatchTab = document.getElementsByClassName("show-stopwatch")[0];
const startTimerButton = document.getElementById("startTimer");
const pauseTimerButton = document.getElementById("pauseTimer");
const resetTimerButton = document.getElementById("resetTimer");
const clockTab = document.getElementsByClassName("show-clock")[0];
const stopwatchTab = document.getElementsByClassName("show-stopwatch")[0];

showClockTab.addEventListener("click", showTime);
showStopwatchTab.addEventListener("click", myFunc);

//* function to show clock
function showTime() {
  // if (isClockRunning) {
  // }
  funcPauseTimer();
  startTimerButton.removeEventListener("click", funcStartTimer);
  pauseTimerButton.removeEventListener("click", funcPauseTimer);
  resetTimerButton.removeEventListener("click", funcResetTimer);
  startTimerButton.classList.add("disabled");
  pauseTimerButton.classList.add("disabled");
  resetTimerButton.classList.add("disabled");
  stopwatchTab.classList.remove("active-tab");
  clockTab.classList.add("active-tab");

  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("clockDisplay").innerText = time;
  document.getElementById("clockDisplay").textContent = time;

  timeOutId = setTimeout(showTime, 1000);

  //defining isClockRunning to true for disabling
  showClockTab.removeEventListener("click", showTime);
  showStopwatchTab.addEventListener("click", myFunc);
}

// showTime();

function myFunc() {
  time = "00:00:00";
  clearTimeout(timeOutId);
  // while(x--){
  //   clearTimeout(x);
  // }
  document.getElementById("clockDisplay").textContent = time;
  startTimerButton.addEventListener("click", funcStartTimer);
  pauseTimerButton.addEventListener("click", funcPauseTimer);
  resetTimerButton.addEventListener("click", funcResetTimer);
  startTimerButton.classList.remove("disabled");
  pauseTimerButton.classList.add("disabled");
  resetTimerButton.classList.add("disabled");
  // pauseTimerButton.classList.remove("disabled");
  // resetTimerButton.classList.remove("disabled");
  clockTab.classList.remove("active-tab");
  stopwatchTab.classList.add("active-tab");

  //making clock running status false
  showStopwatchTab.removeEventListener("click", myFunc);
  showClockTab.addEventListener("click", showTime);
}

//* STOPWATCH

let myClock = document.getElementById("clockDisplay");

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
// let timerRef = document.querySelector('.timerDisplay');

let int = null;
function funcStartTimer() {
  startTimerButton.classList.add("disabled");
  pauseTimerButton.classList.remove("disabled");
  resetTimerButton.classList.remove("disabled");

  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
}
function funcPauseTimer() {
  pauseTimerButton.classList.add("disabled");
  startTimerButton.classList.remove("disabled");

  clearInterval(int);
}
function funcResetTimer() {
  resetTimerButton.classList.add("disabled");
  pauseTimerButton.classList.add("disabled");
  startTimerButton.classList.remove("disabled");

  clearInterval(int);
  [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  myClock.innerHTML = "00:00:00";
}

function displayTimer() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;
  myClock.innerHTML = ` ${h}:${m}:${s}`;
  //  myClock.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}
