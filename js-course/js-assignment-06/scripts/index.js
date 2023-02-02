//global variable
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const WIDTH = 80;
const HEIGHT = 80;
const NUMBER_OF_LANE = 5;
const PILLAR_SIZE = 100;
const CAR_LENGTH = 140;
const OBSTACLE_SPEED = 10;
const FONT_SIZE = 30;

let birdImage = new Image();
birdImage.src = "./assets/bird.png";

let birdUpImage = new Image();
birdUpImage.src = "./assets/birdup.png";

let pillarImage = new Image();
pillarImage.src = "./assets/pillar.png";

// ctx = canvas.getContext("2d");
// ctx.drawImage(
//   carImage,
//   LANE_SIZE * myCar.lane,
//   myCar.distanceFromTop,
//   LANE_SIZE,
//   CAR_LENGTH
// );

class Canvas {
  constructor(id, container, width, height, numberOfPillar = 4) {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    canvas.setAttribute("width", width + "px");
    canvas.setAttribute("height", height + "px");

    this.width = width;
    this.height = height;
    this.parentId = container;
    this.id = id;
    this.pillarSpacing = 300;
    this.pillars = [];
    this.numberOfPillar = numberOfPillar;
    this.gameStatus = "NOT_STARTED";
    this.g = 10;
    this.t = 0.1; //*value of t multiplied by setInterval value argument ie:100
    this.score = 0;
    this.scoreAdded = false;

    this.flappy = new Flappy(this);
    this.drawFlappy = this.drawFlappy(canvas);
    this.createPillars(numberOfPillar);
    document.getElementById(container).appendChild(canvas);
  }

  createPillars(numberOfPillar) {
    this.pillars = []; //* clear the existing pillars array
    for (let i = 0; i <= numberOfPillar; i++) {
      this[`pillar${i}`] = new Pillar(this);
    }
  }
  updateScore() {
    this.pillars.forEach((pillar) => {
      if (
        this.flappy.xOffset + this.flappy.width > pillar.xOffset &&
        this.flappy.xOffset < pillar.xOffset + pillar.width &&
        (this.flappy.yOffset < pillar.gapStart ||
          this.flappy.yOffset + this.flappy.height >
            pillar.gapStart + pillar.gapWidth)
      ) {
        this.flappy.alive = false;
        this.gameStatus = "GAME_OVER";
      }
      if (
        this.flappy.xOffset > pillar.xOffset + pillar.width &&
        pillar.passedByFlappy == false
      ) {
        pillar.passedByFlappy = true;
        this.score += 1;
        console.log(this.score);
        this.scoreAdded = true;
      }
    });
  }

  drawFlappy(canvas) {
    let ctx = canvas.getContext("2d");
    console.log("from drawpillar within canvas class");
    ctx.drawImage(
      this.flappy.image,
      this.flappy.xOffset,
      this.flappy.yOffset,
      this.flappy.width,
      this.flappy.height
    );
  }
}

class Pillar {
  constructor(canvas) {
    this.xOffset = this.getPillarXOffset(canvas); //canvas.width;
    this.gapStart = 100; // make it random
    this.gapWidth = 200;
    this.width = 80;
    this.image = pillarImage;
    this.passedByFlappy = false;
    canvas.pillars.push(this);

    this.update = function () {
      if (this.xOffset < -this.width) {
        this.passedByFlappy = false;
        this.xOffset =
          canvas.pillarSpacing * (canvas.numberOfPillar - 2) - this.width; //* ????????
      }
      this.xOffset -= 10; //!change this magic number
    };

    this.getPillarXOffset(canvas);
  }
  getPillarXOffset(canvas) {
    if (canvas.pillars.length == 0) return canvas.pillarSpacing * 2;
    else {
      return (
        canvas.pillars[canvas.pillars.length - 1].xOffset + canvas.pillarSpacing
      );
    }
  }
}
class Flappy {
  constructor(canvas) {
    this.yOffset = canvas.height / 2;
    this.xOffset = 0.1 * canvas.width;
    this.height = 40;
    this.width = 40;
    this.alive = true;
    this.image = birdImage;
    this.flight = 80;
    this.u = 0;
    this.v = this.u - canvas.g * canvas.t;
    this.s = this.yOffset;
    this.fallSpeed = 0;
    this.passedPillars = 0;

    this.fall = function () {
      this.v = this.u - canvas.g * canvas.t;
      this.yOffset -= this.v;
    this.s = this.u * canvas.t - 0.5 * canvas.g * canvas.t * canvas.t;

      // this.fallSpeed += canvas.t * canvas.g;
      // this.yOffset += this.fallSpeed;
    };
  }
}

function gameLoop(canvasEl, canvas) {
  canvas.t += 0.5;
  let ctx = canvasEl.getContext("2d");
  let flappy = canvas.flappy;
  // let pillar0 = canvas.pillar0;
  let { pillar0, pillar1, pillar2, pillar3 } = { ...canvas };
  // console.log(canvas.t, canvas.g, flappy.fallSpeed);

  pillar0.update();
  pillar1.update();
  pillar2.update();
  flappy.fall();
  // console.log(flappy);
  // console.log(canvas, flappy);

  //* clear canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.drawImage(
    flappy.image,
    flappy.xOffset,
    flappy.yOffset,
    flappy.width,
    flappy.height
  );

  // ctx.rect(pillar.xOffset, 0, pillar.width, pillar.gapStart);
  ctx.lineWidth = "6";

  //*pillar  0
  ctx.beginPath();
  ctx.rect(pillar0.xOffset, 0, pillar0.width, pillar0.gapStart);
  ctx.rect(
    pillar0.xOffset,
    pillar0.gapStart + pillar0.gapWidth,
    pillar0.width,
    canvas.height
  );
  ctx.strokeStyle = "violet";
  ctx.stroke();
  //*pillar  1
  ctx.beginPath();
  ctx.rect(pillar1.xOffset, 0, pillar1.width, pillar1.gapStart);
  ctx.rect(
    pillar1.xOffset,
    pillar1.gapStart + pillar1.gapWidth,
    pillar1.width,
    canvas.height
  );
  ctx.strokeStyle = "indigo";
  ctx.stroke();

  //*pillar  2
  ctx.beginPath();
  ctx.rect(pillar2.xOffset, 0, pillar2.width, pillar2.gapStart);
  ctx.rect(
    pillar2.xOffset,
    pillar2.gapStart + pillar2.gapWidth,
    pillar2.width,
    canvas.height
  );
  ctx.strokeStyle = "blue";
  ctx.stroke();
  canvas.updateScore();
  console.log(flappy.s);
}

function main() {
  let canvas0 = new Canvas("canvas-0", "body", CANVAS_WIDTH, CANVAS_HEIGHT, 5);
  let canvas1 = new Canvas("canvas-1", "body", CANVAS_WIDTH, CANVAS_HEIGHT);
  let canvas0El = document.getElementsByTagName("canvas")[0];
  let canvas1El = document.getElementsByTagName("canvas")[1];

  console.log(canvas0);

  // let pillar0 = new Pillar(canvas0);

  setInterval(() => {
    gameLoop(canvas0El, canvas0);
  }, 100);

  window.addEventListener("click", (event) => {
    // canvas0.flappy.fallSpeed = 0;
    canvas0.t = 0;
    canvas0.flappy.u = 25;
    // canvas0.flappy.yOffset = canvas0.flappy.yOffset - canvas0.flappy.flight;
  });
}
main();
