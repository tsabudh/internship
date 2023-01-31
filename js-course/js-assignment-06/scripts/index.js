// global constants
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 1000;
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

  gameStatus = "GAME_START";
  let myCar = new Car();
  let myScore = 0;
  let playButton = {
    top: 700,
    left: 150,
    height: 100,
    width: 200,
  };

  let canvas = document.getElementsByClassName("canvas")[0];
  let ctx = canvas.getContext("2d");

  // gameStatus = "GAME_OVER";
  setInterval(() => {
    if (gameStatus == "GAME_START") {
      console.log("GAME STARTED INSIDE SETINVETVAL");
      debugger;
      obstacle1 = new Obstacle();
      obstacle2 = new Obstacle();
      obstacle3 = new Obstacle();
      obstacle4 = new Obstacle();
      obstacle5 = new Obstacle();
      gameStatus = "PLAYING";
    }
    console.log("kdkdkdkd", gameStatus);
    if (gameStatus == "PLAYING") {
      console.log("PLAYING");
      myScore = myScore + 0.1;
      console.log(myScore);
      //clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      //*updating obstacle data
      obstacle1.update();
      obstacle2.update();
      obstacle3.update();
      obstacle4.update();
      obstacle5.update();
      // obstacle4.update();

      // rendering car
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "red";
      ctx.rect(LANE_SIZE * myCar.lane, myCar.distanceFromTop, LANE_SIZE, 100);
      // ctx.rect(CANVAS_WIDTH - LANE_SIZE, CANVAS_HEIGHT - CAR_LENGTH , LANE_SIZE, CAR_LENGTH);
      ctx.stroke();

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
      ctx.rect(
        LANE_SIZE * obstacle1.lane,
        obstacle1.distanceFromTop,
        LANE_SIZE,
        obstacle1.length
      );
      ctx.stroke();

      //* obstacle 2
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "green";
      ctx.rect(
        LANE_SIZE * obstacle2.lane,
        obstacle2.distanceFromTop,
        LANE_SIZE,
        obstacle2.length
      );
      ctx.stroke();

      //* obstacle 3
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "orangered";
      ctx.rect(
        LANE_SIZE * obstacle3.lane,
        obstacle3.distanceFromTop,
        LANE_SIZE,
        obstacle3.length
      );
      ctx.stroke();

      //* obstacle 4
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "orangered";
      ctx.rect(
        LANE_SIZE * obstacle4.lane,
        obstacle4.distanceFromTop,
        LANE_SIZE,
        obstacle4.length
      );
      ctx.stroke();

      //* obstacle 5
      ctx.beginPath();
      ctx.lineWidth = "6";
      ctx.strokeStyle = "orangered";
      ctx.rect(
        LANE_SIZE * obstacle5.lane,
        obstacle5.distanceFromTop,
        LANE_SIZE,
        obstacle5.length
      );
      ctx.stroke();
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
      ctx.strokeStyle = "red";
      ctx.rect(150, 700, 200, 100);
      // ctx.rect(CANVAS_WIDTH - LANE_SIZE, CANVAS_HEIGHT - CAR_LENGTH , LANE_SIZE, CAR_LENGTH);
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

  console.log(myCar.lane);

  window.addEventListener("click", (event) => {
    let x = event.pageX;
    let y = event.pageY;

    if (
      (gameStatus == "GAME_OVER" || gameStatus == "NOT_STARTED") &&
      y > playButton.top &&
      y < playButton.top + playButton.height &&
      x > playButton.left &&
      x < playButton.left + playButton.width
    ) {
      console.log("clicked");
      gameStatus = "GAME_START";
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft" && myCar.lane >= 1) {
      console.log(myCar.lane);
      myCar.lane = myCar.lane - 1;
    }
    if (e.code == "ArrowRight" && myCar.lane < NUMBER_OF_LANE - 1) {
      console.log(myCar.lane);
      myCar.lane = myCar.lane + 1;
    }
  });
}
main();