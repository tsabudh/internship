import Ground from "./ground";
import Pillar from "./pillar";

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
          // this.gameStatus = "GAME_OVER";
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