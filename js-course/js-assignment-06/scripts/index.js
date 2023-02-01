// global constants
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 600;
const WIDTH = 80;
const HEIGHT = 80;
const NUMBER_OF_LANE = 5;
const LANE_SIZE = 100;
const CAR_LENGTH = 140;
const OBSTACLE_SPEED = 10;
const GAME_LEVEL = 1;

// global variables
let obstacles = [];
let gameStatus = "PLAYING";
// let gameStatus = "NOT_STARTED";
let carImage = new Image();
carImage.src ="./assets/mycar1.png";

let obstacle1Image = new Image();
obstacle1Image.src = "./assets/obstacle1.png";

let obstacle2Image = new Image();
obstacle2Image.src = "./assets/obstacle2.png";

let obstacle3Image = new Image();
obstacle3Image.src = "./assets/obstacle3.png";

let obstacle4Image = new Image();
obstacle4Image.src = "./assets/obstacle4.png";

let obstacle5Image = new Image();
obstacle5Image.src = "./assets/obstacle5.png";

// const canvas = document.getElementById('canvas'); 
// const context = canvas.getContext('2d'); 
// const img = new Image();
// img.src = './cat.jpg'; 
// img.onload = () => {context.drawImage(img, 0, 0);};

// function to create elements
function createElement(tagName, className, parentQuery) {
  let newElement = document.createElement(tagName);
  newElement.className = className;
  //   console.log(typeof document.querySelector(parentQuery));
  document.querySelector(parentQuery).appendChild(newElement);
  return newElement;
}

function initiateCanvas(parentQuery) {
  let canvasEl = createElement("canvas", "canvas", parentQuery);
  canvasEl.setAttribute("height", CANVAS_HEIGHT + "px");
  canvasEl.setAttribute("width", CANVAS_WIDTH + "px");
}

class GameContext {
  constructor(parentQuery) {}
}

class Car {
  constructor() {
    this.lane = Math.ceil(Math.random() * (NUMBER_OF_LANE - 1));
    this.distanceFromTop = CANVAS_HEIGHT - CAR_LENGTH;
    console.log("car is in", this.lane);
  }
}

class Obstacle {
  constructor() {
    this.lane = makeObstacleLane();
    this.length = makeObstacleLength();
    this.distanceFromTop = makeDistanceFromTop();
    this.speed = Math.random() * 5 + 9;

    //update global obstacle collection
    obstacles.push(this);

    this.update = function () {
      if (this.distanceFromTop <= CANVAS_HEIGHT) {
        this.distanceFromTop += GAME_LEVEL * this.speed;
      } else {
        this.distanceFromTop = -this.length * Math.random() * 4.5;
      }
    };

    function makeObstacleLane() {
      let newLane = Math.floor(Math.random() * NUMBER_OF_LANE);
      // if new obstacle's lane == any of existing obstacle's lane: render again
      for (let i = 0; i < obstacles.length; i++) {
        if (newLane == obstacles[i].lane) {
          newLane = Math.floor(Math.random() * NUMBER_OF_LANE);
          i = -1;
        }
      }
      return newLane;
    }
    function makeObstacleLength() {
      return Math.floor((Math.random() * CAR_LENGTH) / 2 + CAR_LENGTH);
    }
    function makeDistanceFromTop() {
      let newDistance = -Math.random() * 3 * CAR_LENGTH * 3;

      if (
        obstacles.length != 0 &&
        Math.abs(newDistance) -
          Math.abs(obstacles[obstacles.length - 1].distanceFromTop) <
          CAR_LENGTH
      ) {
        newDistance = Math.floor(Math.random() * NUMBER_OF_LANE);
      }

      return newDistance;
    }
    // return this;
  }
}

function main() {
  initiateCanvas("body");
  let obstacle1, obstacle2, obstacle3, obstacle4, obstacle5;

  gameStatus = "GAME_NOT_STARTED";
  let myCar = new Car();
  let myScore = 0;
  let playButton = {
    top: CANVAS_HEIGHT / 1.3 - 100 / 2, //100 is playButton's height
    left: CANVAS_WIDTH / 2 - 200 / 2, //200 is playButton's width
    width: 200,
    height: 100,
  };
  
  let canvas = document.getElementsByClassName("canvas")[0];
  let ctx = canvas.getContext("2d");
  
  // carImage.onload = () => {ctx.drawImage(carImage, 0, 0);};
  // gameStatus = "GAME_OVER";
  setInterval(() => {
    if (gameStatus == "GAME_NOT_STARTED") {
      // rendering game menu
      ctx.beginPath;
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("CAR LANE GAME", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "red";
      ctx.rect(
        CANVAS_WIDTH / 2 - playButton.width / 2,
        CANVAS_HEIGHT / 1.3 - playButton.height / 2,
        200,
        100
      );
      // ctx.rect(CANVAS_WIDTH - LANE_SIZE, CANVAS_HEIGHT - CAR_LENGTH , LANE_SIZE, CAR_LENGTH);
      ctx.stroke();
      ctx.fillText(`START GAME`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 1.3);
    }

    if (gameStatus == "GAME_START") {
      //* clear obstacles global collection
      obstacles = [];
      obstacle1 = new Obstacle();
      obstacle2 = new Obstacle();
      obstacle3 = new Obstacle();
      obstacle4 = new Obstacle();
      obstacle5 = new Obstacle();

      gameStatus = "PLAYING";
    }

    if (gameStatus == "PLAYING") {
      myScore = myScore + 0.1;

      //clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      //*updating obstacle data
      obstacle1.update();
      obstacle2.update();
      obstacle3.update();
      obstacle4.update();
      obstacle5.update();
      // obstacle4.update();

      //* mycar rendering car
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "red";
      ctx.rect(LANE_SIZE * myCar.lane, myCar.distanceFromTop, LANE_SIZE, 100);
      
      ctx.drawImage(carImage,LANE_SIZE * myCar.lane, myCar.distanceFromTop,LANE_SIZE,CAR_LENGTH);

      // check for collision
      obstacles.forEach((obstacle) => {
        if (
          myCar.distanceFromTop - obstacle.distanceFromTop < obstacle.length &&
          myCar.lane == obstacle.lane
        ) {
          console.log("game over!!");
          gameStatus = "GAME_OVER";
        }
      });

      //*new path for obstacle
      //*obstacle 1
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "black";

      ctx.drawImage(obstacle1Image,LANE_SIZE * obstacle1.lane, obstacle1.distanceFromTop,LANE_SIZE,obstacle1.length);


      //* obstacle 2
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "green";

      ctx.drawImage(obstacle2Image,LANE_SIZE * obstacle2.lane, obstacle2.distanceFromTop,LANE_SIZE,obstacle2.length);


      //* obstacle 3
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "orangered";
 
      ctx.drawImage(obstacle3Image,LANE_SIZE * obstacle3.lane, obstacle3.distanceFromTop,LANE_SIZE,obstacle3.length);


      //* obstacle 4
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "blue";
 
      ctx.drawImage(obstacle4Image,LANE_SIZE * obstacle4.lane, obstacle4.distanceFromTop,LANE_SIZE,obstacle4.length);


      //* obstacle 5
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "cyan";
  
      ctx.drawImage(obstacle5Image,LANE_SIZE * obstacle5.lane, obstacle5.distanceFromTop,LANE_SIZE,obstacle5.length);

    }
    if (gameStatus == "GAME_OVER") {
      myScore = Math.floor(myScore);
      //clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // rendering game over
      ctx.beginPath;
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "transparent";
      ctx.rect(
        CANVAS_WIDTH / 2 - playButton.width / 2,
        CANVAS_HEIGHT / 1.3 - playButton.height / 2,
        200,
        100
      );

      ctx.stroke();

      ctx.strokeStyle = "pink";
      ctx.rect(
        playButton.left,
        playButton.top,
        playButton.width,
        playButton.height
      );
      ctx.stroke();
      // ctx.moveTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 1.5);
      ctx.fillText(
        `Your Score is ${myScore}`,
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 1.5
      );
      // ctx.moveTo(CANVAS_WIDTH/2, CANVAS_HEIGHT/1.7);
      ctx.fillText(`Play Again`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 1.3);
    }
  }, 100);
  //

  window.addEventListener("click", (event) => {
    let canvasMarginLeft = window
      .getComputedStyle(canvas)
      .getPropertyValue("margin-left");
    let canvasMarginTop = window
      .getComputedStyle(canvas)
      .getPropertyValue("margin-top");
    let x = event.pageX - parseInt(canvasMarginLeft);
    let y = event.pageY - parseInt(canvasMarginTop);
    console.log(x, y, canvasMarginLeft, canvasMarginTop);

    if (
      (gameStatus == "GAME_OVER" || gameStatus == "GAME_NOT_STARTED") &&
      y > playButton.top &&
      y < playButton.top + playButton.height &&
      x > playButton.left &&
      x < playButton.left + playButton.width
    ) {
      gameStatus = "GAME_START";
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft" && myCar.lane >= 1) {
      myCar.lane = myCar.lane - 1;
    }
    if (e.code == "ArrowRight" && myCar.lane < NUMBER_OF_LANE - 1) {
      myCar.lane = myCar.lane + 1;
    }
  });
}
main();
