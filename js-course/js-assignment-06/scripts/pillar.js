export  class Pillar {
    constructor(canvas) {
      this.index = canvas.pillars.length;
      this.gapWidth = 110;
      this.width = 80;
      this.passedByFlappy = false;
      this.xOffset = this.getPillarXOffset(canvas); //canvas.width;
      this.gapStart = this.getGapStart(canvas); // make it random
      canvas.pillars.push(this);
  
      this.update = function () {
        if (this.xOffset < -this.width) {
          this.passedByFlappy = false;
          this.xOffset =
            canvas.pillarSpacing * (canvas.numberOfPillar - 2) - this.width; //* ????????
  
          //*giving random gap when outside screen
          let min = 70;
          let max = canvas.height / 2.5;
          this.gapStart = Math.random() * (max - min) + min;
        }
        this.xOffset -= canvas.speed;
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
  
    getGapStart(canvas) {
      // debugger;
  
      //*giving random gap when outside screen
      let min = 70;
      let max = canvas.height / 2.5;
      let gapStart = Math.random() * (max - min) + min;
  
      return gapStart;
    }
  }