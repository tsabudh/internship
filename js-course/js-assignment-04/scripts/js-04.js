"use strict";
//* El is shorthand for ELEMENT

// GLOBAL CONSTANTS
const CONTAINER_HEIGHT = 500;
const CONTAINER_WIDTH = 500;
const NUMBER_OF_BOXES = 2;
const BOX = { HEIGHT: 150, WIDTH: 150 };

// GLOBAL VARIABLES
let containerEl;
let boxCoordinates = {};

/**
 *
 * @param {*} boxEl is an HTML element
 * @param {x:Number, y:Number} boxCoordinates is  position and dimension of box
 */
function spawnBoxes(boxEl, boxCoordinates) {
  boxEl.textContent = "BOX ";
  boxEl.style.marginLeft = Math.floor(Math.random() * ROOM_WIDTH) + "px";
  boxCoordinates.x = boxEl.style.marginLeft.split("px")[0];
  boxEl.style.marginTop = Math.floor(Math.random() * ROOM_HEIGHT) + "px";
  boxCoordinates.y = boxEl.style.marginTop.split("px")[0];
}

function initializeContainer() {
  containerEl = document.createElement("div");
  containerEl.setAttribute("class", "container");
  containerEl.style.width = CONTAINER_WIDTH + "px";
  containerEl.style.height = CONTAINER_HEIGHT + "px";
  document.body.appendChild(containerEl);
}
function initializeBoxes() {
  let direction = [1, -1];

  for (let i = 0; i < NUMBER_OF_BOXES; i++) {
    let boxEl = document.createElement("div");
    boxEl.setAttribute("class", `box box-${i}`);
    containerEl.appendChild(boxEl);
    boxEl.textContent = `BOX-${i}`;
    setBoxStyles(boxEl);

    let x, y, width, height;
    x = Math.max(Math.floor(Math.random() * CONTAINER_WIDTH - BOX.WIDTH),0);
    y = Math.max(Math.floor(Math.random() * CONTAINER_HEIGHT - BOX.HEIGHT),0);
    width = BOX.WIDTH;
    height = BOX.HEIGHT;
    boxEl.style.marginLeft = x + 'px';
    boxEl.style.marginTop = y + 'px';
    boxEl.style.width = width + 'px';
    boxEl.style.height = height+ 'px';
    boxCoordinates[`box${i}`] = [x, y, width, height];

  }
  console.log();
}

function translateX(boxEl) {
  if (boxEl.style.marginLeft.split("px")[0] >= CONTAINER_WIDTH - BOX.WIDTH) {
    directionX = -1;
  } else if (boxEl.style.marginLeft.split("px")[0] <= 0) {
    directionX = 1;
  }

  //  boxObj.marginLeftOfBox = box.style.marginLeft.split("px")[0];
  boxObj.marginLeftOfBox = boxObj.marginLeftOfBox + incrementX * directionX;
  box.style.marginLeft = boxObj.marginLeftOfBox + "px";
}

function setBoxStyles(boxEl) {
  boxEl.style.width = BOX.width + "px";
  boxEl.style.height = BOX.height + "px";
}

initializeContainer();
initializeBoxes();
