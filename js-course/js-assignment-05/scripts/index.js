// global variable
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const WIDTH = 80;
const HEIGHT = 80;
const NUMBER_OF_ANTS = 3;
// function to create elements
function createElement(tagName, className, parentQuery) {
  let newElement = document.createElement(tagName);
  newElement.className = className;
  console.log(typeof(document.querySelector(parentQuery)));
  document.querySelector(parentQuery).appendChild(newElement);
  return newElement;
}
function initiateCanvas(parentQuery) {
  let canvasEl = createElement("canvas", "canvas-1", parentQuery);
  canvasEl.setAttribute('height',CANVAS_HEIGHT)
  canvasEl.setAttribute('width',CANVAS_WIDTH)
//   canvasEl.style.width =CANVAS_WIDTH ;
//   canvasEl.style.height = CANVAS_HEIGHT;
}
class Car{
  constructor(){
    this.lane=Math.floor(Math.random()*3);

  }

}
Class Obstacle{
  constructor(){
    this.lane=Math.floor(Math.random()*3);
  }
}

initiateCanvas("body");
