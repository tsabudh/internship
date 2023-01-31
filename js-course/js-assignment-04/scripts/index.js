//* CURRENTLY WORKS ON MAXIMUM TWO BOXES
//! CHECK LOOP CONDITIONS i<boxOrderX.length
//* RECHECK SPEED CHANGE CONDITIONS
//* CHECK ISSUE ON CALCULATION ON BASIS OF BOXORDERX OR BOXORDERY
//* El is shorthand for ELEMENT

// GLOBAL CONSTANTS
const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 500;
const NUMBER_OF_BOXES = 2;
const BOX = { HEIGHT: 100, WIDTH: 100 };
const SPEED = 1;
const MAX_SPEED = 5;
const SIGN = [-1, +1];

// GLOBAL VARIABLES
let containerEl;
let boxCoordinates = {}; // object to contain {box0:{xOffset, yOffset, width, height}, }
let boxElementsArray = []; // array collection of box Element
let boxOrderAtX = [];
let boxOrderAtY = [];
let xDifference = {};
let yDifference = {};

/*
boxCoordinates:{
  box0:{
  "xOffset": 202,
  "yOffset": 79,
  "width": 50,
  "height": 50,
  "directionX": -1,
  "directionY": 1
}}

*/

function initializeContainer() {
  containerEl = document.createElement("div");
  containerEl.setAttribute("class", "container");
  containerEl.style.width = CONTAINER_WIDTH + "px";
  containerEl.style.height = CONTAINER_HEIGHT + "px";
  document.body.appendChild(containerEl);
}

function initializeBoxes() {
  let directionX = 1;
  let directionY = 1;
  console.log("initializing boxes");
  startIteration: for (let i = 0, j = 0; i < NUMBER_OF_BOXES; j++) {
    let xOffset, yOffset, width, height, speedX, speedY;

    //* Giving random speed to each boxes
    speedX = Math.ceil(Math.random() * MAX_SPEED);
    speedY = Math.ceil(Math.random() * MAX_SPEED);

    //* Giving random xOffset and yOffset to box within the container boundaries
    xOffset = Math.max(
      Math.floor(Math.random() * CONTAINER_WIDTH - BOX.WIDTH),
      0
    );
    yOffset = Math.max(
      Math.floor(Math.random() * CONTAINER_HEIGHT - BOX.HEIGHT),
      0
    );
    width = BOX.WIDTH;
    height = BOX.HEIGHT;

    console.log(`\nIn loop ${i}`); // loop number
    xDifference[`box${i}`] = {}; //!important to initialize object
    yDifference[`box${i}`] = {}; //!important to initialize object

    //* START OF CHECK NEW BOX'S POSITION AGAINST EXISTING BOXES'
    startDifferenceLoop: for (let d = 0; d < i; d++) {
      let currentXDifference, currentYDifference;
      let callDifferenceFunctionCount = 0;

      function calcDifference(i, d) {
        callDifferenceFunctionCount++;
        currentXDifference = Math.abs(
          //*     IDEA make current Difference at least box width
          xOffset - boxCoordinates[`box${d}`].xOffset
        );
        currentYDifference = Math.abs(
          //*     IDEA make current Difference at least box width
          yOffset - boxCoordinates[`box${d}`].yOffset
        );

        if (
          currentXDifference <= BOX.WIDTH &&
          currentYDifference <= BOX.HEIGHT
        ) {
          xOffset = Math.max(
            Math.floor(Math.random() * CONTAINER_WIDTH - BOX.WIDTH),
            0
          );
          yOffset = Math.max(
            Math.floor(Math.random() * CONTAINER_HEIGHT - BOX.HEIGHT),
            0
          );
          d = 0;
          return calcDifference(i, d);
        } else if (
          currentXDifference > BOX.WIDTH ||
          currentYDifference > boxCoordinates.WIDTH
        ) {
          return;
        } else {
          console.log("LOGIC ERROR: ELSE IF CONDITION ESCAPED");
        }
      }
      calcDifference(i, d);
      xDifference[`box${i}`][`differenceWithBox${d}`] = currentXDifference;
      yDifference[`box${i}`][`differenceWithBox${d}`] = currentYDifference;
    }

    boxCoordinates[`box${i}`] = {
      xOffset,
      yOffset,
      width,
      height,
      directionX,
      directionY,
      speedX,
      speedY,
    };

    let boxEl = document.createElement("div");
    boxEl.setAttribute("class", `box box-${i}`);
    containerEl.appendChild(boxEl);
    boxEl.textContent = `BOX-${i}`; //commented out text for good visuals
    setBoxStyles(boxEl);

    boxEl.style.marginLeft = xOffset + "px";
    boxEl.style.marginTop = yOffset + "px";
    boxEl.style.width = width + "px";
    boxEl.style.height = height + "px";

    i++;
  }
  boxOrderAtY = Object.getOwnPropertyNames(boxCoordinates);
}
boxOrderAtY = Object.getOwnPropertyNames(boxCoordinates);

function setBoxStyles(boxEl) {
  boxEl.style.width = BOX.WIDTH + "px";
  boxEl.style.height = BOX.HEIGHT + "px";
}

function calcBoxOrderAtX() {
  boxOrderAtX.sort((a, b) => {
    return boxCoordinates[`${a}`].xOffset - boxCoordinates[`${b}`].xOffset;
  });
}

function calcBoxOrderAtY() {
  boxOrderAtY.sort((a, b) => {
    return boxCoordinates[`${a}`].yOffset - boxCoordinates[`${b}`].yOffset;
  });
}

function translateX() {
  let i = 0;
  for (let box in boxCoordinates) {
    boxCoordinates[box].xOffset =
      boxCoordinates[box].xOffset +
      boxCoordinates[box].speedX * boxCoordinates[box].directionX;
    if (
      boxCoordinates[box].xOffset + BOX.WIDTH >= CONTAINER_WIDTH ||
      boxCoordinates[box].xOffset <= 0
    ) {
      boxCoordinates[box].directionX = boxCoordinates[box].directionX * -1;
    }
    document.getElementsByClassName("box")[i].style.marginLeft =
      boxCoordinates[box].xOffset + "px";
    i++;
  }
}
function translateY() {
  let i = 0;
  for (let box in boxCoordinates) {
    boxCoordinates[box].yOffset =
      boxCoordinates[box].yOffset +
      boxCoordinates[box].speedY * boxCoordinates[box].directionY;
    if (
      boxCoordinates[box].yOffset + BOX.HEIGHT >= CONTAINER_HEIGHT ||
      boxCoordinates[box].yOffset <= 0
    ) {
      boxCoordinates[box].directionY = boxCoordinates[box].directionY * -1;
    }
    document.getElementsByClassName("box")[i].style.marginTop =
      boxCoordinates[box].yOffset + "px";
    i++;
  }
}

// variables for collideBoxes
let checkedOnce = false;
let changedDir = false;
let checkedOverlapOnX = false;
let checkedOverlapOnY = false;
let checkedCollision = false;
let boxCollidedAt = "";
//!-----------------------------------------------------------------------------------------------------------------------
function collideBoxes() {
  debugger;

  //* depends on value from calcBoxOrderX, calcBoxOrderY


  for (let i = 0; i < boxOrderAtX.length - 1; i++) {
    let boxOverlappedOnX =
      Math.abs(
        boxCoordinates[`${boxOrderAtX[i + 1]}`].xOffset -
          boxCoordinates[`${boxOrderAtX[i]}`].xOffset
      ) < boxCoordinates[`${boxOrderAtX[i]}`].width;

    let boxOverlappedOnY =
      Math.abs(
        boxCoordinates[`${boxOrderAtY[i + 1]}`].yOffset -
          boxCoordinates[`${boxOrderAtY[i]}`].yOffset
      ) < boxCoordinates[`${boxOrderAtY[i]}`].height;

    let areBoxOverlapped = boxOverlappedOnX && boxOverlappedOnY;
    // console.log(areBoxOverlapped);
    let boxDirectionXSame =
      boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX ==
      boxCoordinates[`${boxOrderAtX[i]}`].directionX
        ? true
        : false;

    let boxDirectionYSame =
      boxCoordinates[`${boxOrderAtY[i + 1]}`].directionY ==
      boxCoordinates[`${boxOrderAtY[i]}`].directionY
        ? true
        : false;

    if (checkedCollision == false) {
      if (boxOverlappedOnX == true && boxOverlappedOnY == false) {
        boxCollidedAt = "Y";
      } else if (boxOverlappedOnY == true && boxOverlappedOnX == false) {
        boxCollidedAt = "X";
      }
    }
    if (areBoxOverlapped == true && changedDir == false) {
      checkedCollision == true;

      //*BOX COLLISION ON X
      if (boxCollidedAt == "X" && !boxDirectionXSame) {
        // change direction
        boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX *= -1;
        boxCoordinates[`${boxOrderAtX[i]}`].directionX *= -1;

        //change speed
        let tempSpeed = boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX =
          boxCoordinates[`${boxOrderAtX[i]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i]}`].speedX = tempSpeed;
      } else if (boxCollidedAt == "X" && boxDirectionXSame) {
        // change speedX only
        let tempSpeed = boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX =
          boxCoordinates[`${boxOrderAtX[i]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i]}`].speedX = tempSpeed;
      } else if (boxCollidedAt == "X" && !boxDirectionYSame) {
        //change directionX
        boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX *= -1;
        boxCoordinates[`${boxOrderAtX[i]}`].directionX *= -1;
      } else if (boxCollidedAt == "X" && boxDirectionYSame) {
        //change directionX
        boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX *= -1;
        boxCoordinates[`${boxOrderAtX[i]}`].directionX *= -1;
      }

      //* BOX COLLISION ON Y
      if (boxCollidedAt == "Y" && !boxDirectionYSame) {
        // change directionY
        boxCoordinates[`${boxOrderAtY[i + 1]}`].directionY *= -1;
        boxCoordinates[`${boxOrderAtY[i]}`].directionY *= -1;

        //change speedY
        let tempSpeed = boxCoordinates[`${boxOrderAtY[i + 1]}`].speedY;
        boxCoordinates[`${boxOrderAtY[i + 1]}`].speedY =
          boxCoordinates[`${boxOrderAtY[i]}`].speedY;
        boxCoordinates[`${boxOrderAtY[i]}`].speedY = tempSpeed;
      } else if (boxCollidedAt == "Y" && boxDirectionYSame) {
        // change speedY only
        let tempSpeed = boxCoordinates[`${boxOrderAtY[i + 1]}`].speedY;
        boxCoordinates[`${boxOrderAtY[i + 1]}`].speedY =
          boxCoordinates[`${boxOrderAtY[i]}`].speedY;
        boxCoordinates[`${boxOrderAtY[i]}`].speedY = tempSpeed;
      } else if (boxCollidedAt == "Y" && boxDirectionXSame) {
        // change directionY
        boxCoordinates[`${boxOrderAtY[i + 1]}`].directionY *= -1;
        boxCoordinates[`${boxOrderAtY[i]}`].directionY *= -1;
      } else if (boxCollidedAt == "Y" && !boxDirectionXSame) {
        // change directionY
        boxCoordinates[`${boxOrderAtY[i + 1]}`].directionY *= -1;
        boxCoordinates[`${boxOrderAtY[i]}`].directionY *= -1;
      }
      changedDir = true;
    }
    if (areBoxOverlapped == false) changedDir = false;
    checkedCollision = false;
  }

}
initializeContainer();
initializeBoxes();

//! IMPORTANT The function calcBoxOrderAtX, calcBoxOrderAtY should be calculated before other and at lowest intervals.
// setInterval(calcBoxOrderAtX, 10);
// setInterval(calcBoxOrderAtY, 10);

// setInterval(translateX, 20);
// setInterval(translateY, 20);

setInterval(() => {
  calcBoxOrderAtY();
  calcBoxOrderAtX();
  translateX();
  translateY();
  collideBoxes();
}, 50);
