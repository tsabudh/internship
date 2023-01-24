let x;
const startTimerButton = document.getElementById("startTimer");
const pauseTimerButton = document.getElementById("pauseTimer");
const resetTimerButton = document.getElementById("resetTimer");

function showTime() {
  startTimerButton.removeEventListener("click", funcStartTimer);
  pauseTimerButton.removeEventListener("click", funcPauseTimer);
  resetTimerButton.removeEventListener("click", funcResetTimer);
  startTimerButton.classList.add("disabled");
  pauseTimerButton.classList.add("disabled");
  resetTimerButton.classList.add("disabled");
  

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

  x = setTimeout(showTime, 1000);
}

showTime();

function myFunc() {
  clearTimeout(x);
  time = "00:00:00";
  document.getElementById("clockDisplay").textContent = time;
  startTimerButton.addEventListener("click", funcStartTimer);
  pauseTimerButton.addEventListener("click", funcPauseTimer);
  resetTimerButton.addEventListener("click", funcResetTimer);
  startTimerButton.classList.remove("disabled");
  pauseTimerButton.classList.remove("disabled");
  resetTimerButton.classList.remove("disabled");
}

//* STOPWATCH

let myClock = document.getElementById("clockDisplay");

let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
// let timerRef = document.querySelector('.timerDisplay');

let int = null;
function funcStartTimer() {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(displayTimer, 10);
}
function funcPauseTimer() {
  clearInterval(int);
}
function funcResetTimer() {
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
