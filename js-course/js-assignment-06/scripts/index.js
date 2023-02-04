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

  if (canvas.gameStatus == "GAME_NOT_STARTED") {
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
    canvas.flappy.yOffset = canvas.height / 2;
    // canvas.pillars=[];
    canvas.createPillars();
    canvas.t = 0;
    canvas.score = 0;
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

       ctx.lineWidth = "6";

    //*pillar  0
    ctx.beginPath();
   
    canvas.drawPillar(canvas.sprites.pillarTop, pillar0);
    //GAP

   

    canvas.drawPillar(canvas.sprites.pillarBottom, pillar0);
    ctx.stroke();
    ctx.strokeStyle = "violet";

    //*pillar  1
    ctx.beginPath();
      canvas.drawPillar(canvas.sprites.pillarTop, pillar1);
   
    canvas.drawPillar(canvas.sprites.pillarBottom, pillar1);
    ctx.strokeStyle = "indigo";
    ctx.stroke();

    //*pillar  2
    ctx.beginPath();
      canvas.drawPillar(canvas.sprites.pillarTop, pillar2);
    ctx.stroke();

        canvas.drawPillar(canvas.sprites.pillarBottom, pillar2);
    ctx.strokeStyle = "blue";
    ctx.stroke();

    //* draw ground

    // console.log(canvas.ground);
      ctx.strokeStyle = "red";
    ctx.stroke();

    canvas.drawGround();
       ctx.strokeStyle = "blue";
    ctx.stroke();
    canvas.ground.update();
    pillar0.update();
    pillar1.update();
    pillar2.update();
    canvas.updateScore();
  }

  if (canvas.gameStatus == "GAME_OVER" || canvas.gameStatus == "GAME_PAUSED") {
    //check if achieved high score
    canvas.highScore =
      canvas.score > canvas.highScore ? canvas.score : canvas.highScore;

    // draw scoreboard



    canvas.drawScoreBoard();
    if (canvas.gameStatus == "GAME_OVER") {
      canvas.drawImage(
        canvas.sprites.gameOver,
        canvas.width / 2 - canvas.sprites.gameOver.width / 2,
        canvas.height / 6
      );
    }else if(canvas.gameStatus == "GAME_PAUSED"){
      canvas.drawImage(
        canvas.sprites.gamePaused,
        canvas.width / 2 - canvas.sprites.gameOver.width / 2,
        canvas.height / 6
      );
    }

    canvas.drawImage(
      canvas.sprites.playButton,
      canvas.width / 2 - canvas.sprites.playButton.width / 2,
      canvas.height / 1.8
    ); // same value to  be used in click event listener
  }
}

function startGame(canvasEl, canvas) {
  canvas.sprites.spriteImage.onload = canvas.gameStatus = "GAME_NOT_STARTED";
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

    // if clicked during gameplay
    if (canvas.gameStatus == "PLAYING") {
      console.log("Clicked during gameplay");
      canvas.t = 0;
      canvas.flappy.u = 2.5;
    }

    let playButton = {
      left: canvas.width / 2 - canvas.sprites.tapToPlay.width / 2,
      top: canvas.height / 1.8,
    };
    let buttonHit =
      y > playButton.top &&
      y < playButton.top + canvas.sprites.tapToPlay.height &&
      x > playButton.left &&
      x < playButton.left + canvas.sprites.tapToPlay.width;

    if (canvas.gameStatus == "GAME_OVER" && buttonHit) {
      canvas.gameStatus = "GAME_START";
    }
    if (canvas.gameStatus == "GAME_NOT_STARTED") {
      canvas.gameStatus = "GAME_START";
    }
    if (canvas.gameStatus == "GAME_PAUSED" && buttonHit) {
      canvas.gameStatus = "PLAYING";
    }
  });
  window.addEventListener("keydown", (event) => {
    //if Escape key is pressed during gameplay or while paused
    if (event.key == "Escape") {
      if (canvas.gameStatus == "PLAYING") {
        canvas.gameStatus = "GAME_PAUSED";
      } else if (canvas.gameStatus == "GAME_PAUSED") {
        canvas.gameStatus = "PLAYING";
      }
    }
  });
}
function main() {
  let canvas0 = new Canvas("canvas-0", "body", CANVAS_WIDTH, CANVAS_HEIGHT, 5);
  let canvas0El = document.getElementsByTagName("canvas")[0];
  // assets.onload = () => (canvas0.gameStatus = "GAME_NOT_STARTED");
  startGame(canvas0El, canvas0);
}
main();
