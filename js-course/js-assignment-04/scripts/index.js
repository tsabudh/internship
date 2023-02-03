//**THIS IS WORKING */
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

// create a container for colliding boxes
function initializeContainer() {
  containerEl = document.createElement("div");
  containerEl.setAttribute("class", "container");
  containerEl.style.width = CONTAINER_WIDTH + "px";
  containerEl.style.height = CONTAINER_HEIGHT + "px";
  document.body.appendChild(containerEl);
}

// create boxes
function initializeBoxes() {
  let directionX = 1;
  let directionY = 1;

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

    //initialize objects for calculation of difference in X and Y axes
    xDifference[`box${i}`] = {}; 
    yDifference[`box${i}`] = {}; 

    //* CHECK NEW BOX'S POSITION AGAINST EXISTING BOXES'
    startDifferenceLoop: for (let d = 0; d < i; d++) {
      let currentXDifference, currentYDifference;
      let callDifferenceFunctionCount = 0;

      function calcDifference(i, d) {
        callDifferenceFunctionCount++;
        currentXDifference = Math.abs(
          xOffset - boxCoordinates[`box${d}`].xOffset
        );
        currentYDifference = Math.abs(
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

    //append created element to DOM
    let boxEl = document.createElement("div");
    boxEl.setAttribute("class", `box box-${i}`);
    containerEl.appendChild(boxEl);
    setBoxStyles(boxEl);

    boxEl.style.marginLeft = xOffset + "px";
    boxEl.style.marginTop = yOffset + "px";
    i++;
  }
}

//rendering height and width of boxes 
function setBoxStyles(boxEl) {
  boxEl.style.width = BOX.WIDTH + "px";
  boxEl.style.height = BOX.HEIGHT + "px";
}

// calculate order of boxes by position at X axis at any moment
function calcBoxOrderAtX() {
  boxOrderAtX = Object.getOwnPropertyNames(boxCoordinates);

  for (let i = 0; i < boxOrderAtX.length; i++) {}
  boxOrderAtX.sort(() => {
    for (let i = 0; i < boxOrderAtX.length - 1; i++) {
      if (
        boxCoordinates[`box${i}`].xOffset >
        boxCoordinates[`box${i + 1}`].xOffset
      ) {
        return -1;
      }
    }
  });
}

// calculate order of boxes by position at Y axis at any moment
function calcBoxOrderAtY() {
  boxOrderAtY = Object.getOwnPropertyNames(boxCoordinates);

  boxOrderAtY.sort(() => {
    for (let i = 0; i < boxOrderAtY.length - 1; i++) {
      if (
        boxCoordinates[`box${i}`].yOffset >
        boxCoordinates[`box${i + 1}`].yOffset
      ) {
        return -1;
      }
    }
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

let checkedOnce = false;
let changedDir = false;
let checkedOverlapOnX = false;
let checkedOverlapOnY = false;
let checkedCollision = false;
let boxCollidedAt = "";
function collideBoxes() {
  //* depends on value from calcBoxOrderX, calcBoxOrderY
  for (let i = 0; i < boxOrderAtX.length - 1; i++) {
    //*take length from boxOrderAtX or boxOrderAtY

    let boxSeparatedAfterTouching;

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

        console.log(boxCollidedAt);
      } else if (boxOverlappedOnY == true && boxOverlappedOnX == false) {
        boxCollidedAt = "X";
        console.log(boxCollidedAt);
      }
    }
    if (areBoxOverlapped == true && changedDir == false) {
      checkedCollision == true;
      //*BOX COLLISION ON X
      if (boxCollidedAt == "X" && !boxDirectionXSame) {
        // change directionX of each box
        boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX *= -1;
        boxCoordinates[`${boxOrderAtX[i]}`].directionX *= -1;

        // exchange speed of boxes
        let tempSpeed = boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX =
          boxCoordinates[`${boxOrderAtX[i]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i]}`].speedX = tempSpeed;
      } else if (boxCollidedAt == "X" && boxDirectionXSame) {
        // change speedX only of each box
        let tempSpeed = boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i + 1]}`].speedX =
          boxCoordinates[`${boxOrderAtX[i]}`].speedX;
        boxCoordinates[`${boxOrderAtX[i]}`].speedX = tempSpeed;
      } else if (boxCollidedAt == "X" && !boxDirectionYSame) {
        //change directionX of each box
        boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX *= -1;
        boxCoordinates[`${boxOrderAtX[i]}`].directionX *= -1;
      } else if (boxCollidedAt == "X" && boxDirectionYSame) {
        //change directionX of each box
        boxCoordinates[`${boxOrderAtX[i + 1]}`].directionX *= -1;
        boxCoordinates[`${boxOrderAtX[i]}`].directionX *= -1;
      }

      //* BOX COLLISION ON Y
      if (boxCollidedAt == "Y" && !boxDirectionYSame) {
        boxCoordinates[`${boxOrderAtY[i + 1]}`].directionY *= -1;
        boxCoordinates[`${boxOrderAtY[i]}`].directionY *= -1;
      } else if (boxCollidedAt == "Y" && boxDirectionYSame) {
        // change speedY only of each box
        let tempSpeed = boxCoordinates[`${boxOrderAtY[i + 1]}`].speedY;
        boxCoordinates[`${boxOrderAtY[i + 1]}`].speedY =
          boxCoordinates[`${boxOrderAtY[i]}`].speedY;
        boxCoordinates[`${boxOrderAtY[i]}`].speedY = tempSpeed;
      } else if (boxCollidedAt == "Y" && boxDirectionXSame) {
        // change directionY of each box
        boxCoordinates[`${boxOrderAtY[i + 1]}`].directionY *= -1;
        boxCoordinates[`${boxOrderAtY[i]}`].directionY *= -1;
      } else if (boxCollidedAt == "Y" && !boxDirectionXSame) {
        // change directionY of each box
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

//! IMPORTANT The order should be calculated first and at lowest interval
setInterval(calcBoxOrderAtX, 5);
setInterval(calcBoxOrderAtY, 5);
setInterval(translateX, 20);
setInterval(translateY, 20);
setInterval(collideBoxes, 10);
