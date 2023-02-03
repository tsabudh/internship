// import Canvas from "./canvas.js";

//global variable
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 500;
const PILLAR_SIZE = 100;
const OBSTACLE_SPEED = 10;
const FONT_SIZE = 30;

let assets = new Image();
assets.src = "./assets/assets.png";

const glidingBird = {
  sx: 4,
  sy: 762,
  width: 27,
  height: 27,
};
const groundImage = {
  sx: 456,
  sy: 0,
  width: 256,
  height: 88,
};
const pillarTop = {
  sx: 86,
  sy: 502,
  width: 44,
  height: 255,
};
const pillarBottom = {
  sx: 86,
  sy: 502,
  width: 44,
  height: 255,
};
const flyingBird = {
  sx: 48,
  sy: 762,
  width: 27,
  height: 27,
};
const birdImage = new Image();
birdImage.src = "./assets/bird.png";

const birdUpImage = new Image();
birdUpImage.src = "./assets/birdup.png";

const pillarImage = new Image();
pillarImage.src = "./assets/pillar.png";

// ctx = canvas.getContext("2d");
// ctx.drawImage(
//   carImage,
//   LANE_SIZE * myCar.lane,
//   myCar.distanceFromTop,
//   LANE_SIZE,
//   CAR_LENGTH
// );

import { Canvas } from "./canvas.js";
// import Ground from "./ground";
// import Pillar from "./pillar";
// import Flappy from "./flappy";

function gameLoop(canvasEl, canvas) {
  // console.log(canvas.gameStatus);
  let ctx = canvasEl.getContext("2d");
  let flappy = canvas.flappy;
  let { pillar0, pillar1, pillar2 } = { ...canvas };

  if (canvas.gameStatus == "NOT_STARTED") {
    ctx.drawImage(
      assets,
      226,
      0,
      227,
      403,
      -10,
      -10,
      canvas.width + 40,
      canvas.height + 20
    );
    canvas.drawImage(
      canvas.sprites.gameTitle,
      canvas.width / 2 - canvas.sprites.gameTitle.width / 2,
      canvas.height / 10
    );
    canvas.drawImage(
      canvas.sprites.tapToPlay,
      canvas.width / 2 - canvas.sprites.tapToPlay.width / 2,
      canvas.height / 2 + canvas.flappy.height
    );
    canvas.drawFlappy();
    canvas.drawGround();
    canvas.ground.update();
    // canvas.gameStatus = "STARTED";
  }
  // console.log(canvas.gameStatus);
  if (canvas.gameStatus == "GAME_START") {
    canvas.flappy.yOffset=canvas.height/2;
    // canvas.pillars=[];
    canvas.createPillars();
    canvas.t=0;
    canvas.score=0;
    canvas.gameStatus = "PLAYING";
  }
  if (canvas.gameStatus == "PLAYING") {
    canvas.t += 0.005;
    flappy.fall();

    //check if flappy is flying up or down
    if (flappy.v > 0) {
      flappy.flyingUp = true;
    } else {
      flappy.flyingUp = false;
    }
    //* clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //* draw background
    ctx.drawImage(
      assets,
      226,
      0,
      227,
      403,
      -10,
      -10,
      canvas.width + 40,
      canvas.height + 20
    );

    //* draw bird
    ctx.beginPath();
    ctx.rect(
      //  birdImage
      flappy.xOffset,
      flappy.yOffset,
      flappy.width,
      flappy.height
    );
    // ctx.drawImage(
    //   assets,
    //   flappy.selectImage.sx,
    //   flappy.selectImage.sy,
    //   flappy.selectImage.width,
    //   flappy.selectImage.height,
    //   flappy.xOffset,
    //   flappy.yOffset,
    //   flappy.width,
    //   flappy.height
    // );
    //*----------
    canvas.drawFlappy();

    if (flappy.flyingUp == true) {
      flappy.color = "red";
      flappy.selectImage = flyingBird;
    } else {
      flappy.color = "blue";
      flappy.selectImage = glidingBird;
    }
    ctx.strokeStyle = flappy.color;
    ctx.stroke();

    // ctx.rect(pillar.xOffset, 0, pillar.width, pillar.gapStart);
    ctx.lineWidth = "6";

    //*pillar  0
    ctx.beginPath();
    ctx.rect(pillar0.xOffset, 0, pillar0.width, pillar0.gapStart);

    canvas.drawPillar(canvas.sprites.pillarTop, pillar0);
    //GAP

    ctx.rect(
      pillar0.xOffset,
      pillar0.gapStart + pillar0.gapWidth,
      pillar0.width,
      canvas.height
    );

    canvas.drawPillar(canvas.sprites.pillarBottom, pillar0);
    ctx.stroke();
    ctx.strokeStyle = "violet";

    //*pillar  1
    ctx.beginPath();
    ctx.rect(pillar1.xOffset, 0, pillar1.width, pillar1.gapStart);
    canvas.drawPillar(canvas.sprites.pillarTop, pillar1);
    ctx.rect(
      pillar1.xOffset,
      pillar1.gapStart + pillar1.gapWidth,
      pillar1.width,
      canvas.height
    );
    canvas.drawPillar(canvas.sprites.pillarBottom, pillar1);
    ctx.strokeStyle = "indigo";
    ctx.stroke();

    //*pillar  2
    ctx.beginPath();
    ctx.rect(pillar2.xOffset, 0, pillar2.width, pillar2.gapStart);
    canvas.drawPillar(canvas.sprites.pillarTop, pillar2);
    ctx.stroke();

    ctx.rect(
      pillar2.xOffset,
      pillar2.gapStart + pillar2.gapWidth,
      pillar2.width,
      canvas.height
    );
    canvas.drawPillar(canvas.sprites.pillarBottom, pillar2);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    //* draw ground

    // console.log(canvas.ground);
    ctx.rect(canvas.ground.xOffset, canvas.height - 85, canvas.width, 88);
    ctx.strokeStyle = "red";
    ctx.stroke();

    canvas.drawGround();
    ctx.rect(canvas.ground.xOffset, canvas.height - 85, canvas.width * 2, 88);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    canvas.ground.update();
    pillar0.update();
    pillar1.update();
    pillar2.update();
    canvas.updateScore();
  }

  if (canvas.gameStatus == "GAME_OVER") {
    //check if achieved high score
    canvas.highScore =
      canvas.score > canvas.highScore ? canvas.score : canvas.highScore;

    // draw scoreboard
    ctx.rect(
      canvas.width / 2 - canvas.sprites.scoreBoard.width / 2,
      canvas.height / 2.5 - canvas.sprites.scoreBoard.height / 2,
      canvas.sprites.scoreBoard.width,
      canvas.sprites.scoreBoard.height
    );
    ctx.strokeStyle = "red";
    ctx.stroke();
    canvas.drawScoreBoard();
    canvas.drawImage(
      canvas.sprites.gameOver,
      canvas.width / 2 - canvas.sprites.gameOver.width / 2,
      canvas.height / 6
    );
    canvas.drawImage(
      canvas.sprites.playButton,
      canvas.width / 2 - canvas.sprites.playButton.width / 2,
      canvas.height / 1.8
    ); // same value to  be used in click event listener
    canvas.context.rect(
      canvas.width / 2 - canvas.sprites.playButton.width / 2,
      canvas.height / 1.8,
      canvas.sprites.playButton.width,
      canvas.sprites.playButton.height
    );
  }
}

function startGame(canvasEl, canvas) {
  setInterval(() => {
    gameLoop(canvasEl, canvas);
  }, 10);

  canvasEl.addEventListener("click", (event) => {
    let canvasMarginLeft = window
      .getComputedStyle(canvasEl)
      .getPropertyValue("margin-left");
    let canvasMarginTop = window
      .getComputedStyle(canvasEl)
      .getPropertyValue("margin-top");
    let x = event.pageX - parseInt(canvasMarginLeft);
    let y = event.pageY - parseInt(canvasMarginTop);
    console.log(x, y);
    // if clicked during gameplay
    if (canvas.gameStatus == "PLAYING") {
      console.log("Clicked during gameplay");
      canvas.t = 0;
      canvas.flappy.u = 2.5;
    }

    //if clicked during menu
    if (
      canvas.gameStatus == "GAME_OVER" ||
      canvas.gameStatus == "GAME_NOT_STARTED"
    ) {
      console.log("clicked during menu gameover or gamenotstarted");
    }
    let playButton = {
      left: canvas.width / 2 - canvas.sprites.tapToPlay.width / 2,
      top: canvas.height / 2 + canvas.flappy.height,
    };
    if (
      (canvas.gameStatus == "GAME_OVER" ||
        canvas.gameStatus == "GAME_NOT_STARTED") &&
      y > playButton.top &&
      y < playButton.top + canvas.sprites.tapToPlay.height &&
      x > playButton.left &&
      x < playButton.left + canvas.sprites.tapToPlay.width
    ) {
      canvas.gameStatus = "GAME_START";
    }
    if (canvas.gameStatus == "NOT_STARTED") {
      console.log("clicked while game not started");
      console.log("changing gamestatus to start");
      canvas.gameStatus = "GAME_START";
      console.log("game status is", canvas.gameStatus);
      //   canvas.drawImage(
      //     canvas.sprites.tapToPlay,
      //     canvas.width / 2 - canvas.sprites.tapToPlay.width / 2,
      //     canvas.height / 2 + canvas.flappy.height
      //   );
    }
  });
}
function main() {
  let canvas0 = new Canvas("canvas-0", "body", CANVAS_WIDTH, CANVAS_HEIGHT, 5);
  let canvas1 = new Canvas("canvas-1", "body", CANVAS_WIDTH, CANVAS_HEIGHT);
  let canvas0El = document.getElementsByTagName("canvas")[0];
  let canvas1El = document.getElementsByTagName("canvas")[1];
  assets.onload = () => (canvas0.gameStatus = "NOT_STARTED");

  console.log(canvas0.gameStatus);

  // setInterval(() => {
  //   gameLoop(canvas0El, canvas0);
  // }, 10);

  // window.addEventListener("click", (event) => {
  //   canvas0.gameStatus="PLAYING"
  //   canvas0.t = 0;
  //   canvas0.flappy.u = 2.5;
  // });
  startGame(canvas0El, canvas0);
}
main();
