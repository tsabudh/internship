import { Sprites } from "./sprites.js";
import { Ground } from "./ground.js";
import { Pillar } from "./pillar.js";
import { Flappy } from "./flappy.js";

export class Canvas {
  constructor(id, container, width, height, numberOfPillar = 4) {
    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    canvas.setAttribute("width", width + "px");
    canvas.setAttribute("height", height + "px");

    this.width = width;
    this.height = height;
    this.parentId = container;
    this.id = id;
    this.sprites = new Sprites(this);
    this.pillarSpacing = 300;
    this.pillars = [];
    this.numberOfPillar = numberOfPillar;
    this.gameStatus = "NOT_STARTED";
    this.speed = 1;
    // this.gameStatus = "NOT_STARTED";
    this.g = 12;
    this.t = 0.01; //*value of t multiplied by setInterval value argument ie:100
    this.score = 0;
    this.highScore = 0;
    this.scoreAdded = false;
    this.ground = new Ground(this);
    this.flappy = new Flappy(this);
    this.createPillars(numberOfPillar);
    this.context = document
      .getElementById(container)
      .appendChild(canvas)
      .getContext("2d");
  }

  createPillars(numberOfPillar=4) {
    this.pillars = []; //* clear the existing pillars array
    for (let i = 0; i <= numberOfPillar; i++) {
      this[`pillar${i}`] = new Pillar(this);
    }
  }
  updateScore() {
    this.pillars.forEach((pillar) => {
      if (
        (this.flappy.xOffset + this.flappy.width > pillar.xOffset &&
          this.flappy.xOffset < pillar.xOffset + pillar.width &&
          (this.flappy.yOffset < pillar.gapStart ||
            this.flappy.yOffset + this.flappy.height >
              pillar.gapStart + pillar.gapWidth)) ||
        this.flappy.yOffset > this.ground.yOffset - this.flappy.height
      ) {
        this.flappy.alive = false;
        this.gameStatus = "GAME_OVER";
        // console.log("game over", this.gameStatus);
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
  drawImage(sprite, dx, dy) {
    this.context.drawImage(
      this.sprites.spriteImage,
      sprite.sx,
      sprite.sy,
      sprite.width,
      sprite.height,
      dx,
      dy,
      sprite.width,
      sprite.height
    );
  }
  drawFlappy() {
    let drawBird;
    if(this.flappy.flyingUp==true) drawBird = this.sprites.flyingBird;
    else drawBird = this.sprites.glidingBird;
    this.context.drawImage(
      this.sprites.spriteImage,
      drawBird.sx,
      drawBird.sy,
      drawBird.width,
      drawBird.height,
      this.flappy.xOffset,
      this.flappy.yOffset,
      this.flappy.width,
      this.flappy.height
    );
  
  }
  drawPillar(pillarPart, pillar) {
    if (pillarPart == this.sprites.pillarTop) {
      this.context.drawImage(
        this.sprites.spriteImage,
        this.sprites.pillarTop.sx,
        this.sprites.pillarTop.sy,
        this.sprites.pillarTop.width,
        this.sprites.pillarTop.height,
        pillar.xOffset,
        0,
        pillar.width,
        pillar.gapStart
      );
    }
    if (pillarPart == this.sprites.pillarBottom) {
      this.context.drawImage(
        this.sprites.spriteImage,
        this.sprites.pillarBottom.sx,
        this.sprites.pillarBottom.sy,
        this.sprites.pillarBottom.width,
        this.sprites.pillarBottom.height,
        pillar.xOffset,
        pillar.gapStart + pillar.gapWidth,
        pillar.width,
        this.height
      );
    }
  }
  drawGround() {
    this.context.drawImage(
      this.sprites.spriteImage,
      this.sprites.groundImage.sx,
      this.sprites.groundImage.sy,
      this.sprites.groundImage.width,
      this.sprites.groundImage.height,
      this.ground.xOffset + this.width + 1,
      this.ground.yOffset,
      this.width + 4,
      88
    );
    this.context.drawImage(
      this.sprites.spriteImage,
      this.sprites.groundImage.sx,
      this.sprites.groundImage.sy,
      this.sprites.groundImage.width,
      this.sprites.groundImage.height,
      this.ground.xOffset,
      this.ground.yOffset,
      this.width + 4,
      88
    );
  }

  drawScoreBoard() {
    let heightFactor=2.5;
    this.context.drawImage(
      this.sprites.spriteImage,
      this.sprites.scoreBoard.sx,
      this.sprites.scoreBoard.sy,
      this.sprites.scoreBoard.width,
      this.sprites.scoreBoard.height,
      this.width / 2 - this.sprites.scoreBoard.width / 2,
      this.height/heightFactor - this.sprites.scoreBoard.height / 2,
      this.sprites.scoreBoard.width,
      this.sprites.scoreBoard.height
    );

    this.context.font = "20px Georgia";
    this.context.fillStyle = "brown";
    this.context.fillText(
      this.score,
      this.width / 2 - this.sprites.scoreBoard.width / 2 + 45,
      this.height / heightFactor - this.sprites.scoreBoard.height / 2 + 50
    );
    this.context.fillText(
      this.highScore,
      this.width / 2 - this.sprites.scoreBoard.width / 2 + 125,
      this.height / heightFactor - this.sprites.scoreBoard.height / 2 + 50
    );
  }

  listenForEvents(){
    window.addEventListener("click", (event) => {
      this.gameStatus="PLAYING"
      this.t = 0;
      this.flappy.u = 2.5;
    });
  }
}
