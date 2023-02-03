export function gameLoop(canvasEl, canvas) {
    console.log(".");
    let ctx = canvasEl.getContext("2d");
    let flappy = canvas.flappy;
    let { pillar0, pillar1, pillar2 } = { ...canvas };
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
      ctx.drawImage(
        assets,
        flappy.selectImage.sx,
        flappy.selectImage.sy,
        flappy.selectImage.width,
        flappy.selectImage.height,
        flappy.xOffset,
        flappy.yOffset,
        flappy.width,
        flappy.height
      );
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
      ctx.drawImage(
        assets,
        86,
        502,
        44,
        255,
        pillar0.xOffset,
        0,
        pillar0.width,
        pillar0.gapStart
      );
  
      //GAP
  
      ctx.rect(
        pillar0.xOffset,
        pillar0.gapStart + pillar0.gapWidth,
        pillar0.width,
        canvas.height
      );
      ctx.drawImage(
        assets,
        42,
        503,
        44,
        255,
        pillar0.xOffset,
        pillar0.gapStart + pillar0.gapWidth,
        pillar0.width,
        canvas.height
      );
      ctx.stroke();
      ctx.strokeStyle = "violet";
  
      //*pillar  1
      ctx.beginPath();
      ctx.rect(pillar1.xOffset, 0, pillar1.width, pillar1.gapStart);
      ctx.drawImage(
        assets,
        86,
        502,
        44,
        255,
        pillar1.xOffset,
        0,
        pillar1.width,
        pillar1.gapStart
      );
      ctx.rect(
        pillar1.xOffset,
        pillar1.gapStart + pillar1.gapWidth,
        pillar1.width,
        canvas.height
      );
      ctx.drawImage(
        assets,
        42,
        503,
        44,
        255,
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
      ctx.drawImage(
        assets,
        86,
        502,
        44,
        255,
        pillar2.xOffset,
        0,
        pillar2.width,
        pillar2.gapStart
      );
      ctx.stroke();
  
      ctx.rect(
        pillar2.xOffset,
        pillar2.gapStart + pillar2.gapWidth,
        pillar2.width,
        canvas.height
      );
      ctx.drawImage(
        assets,
        42,
        503,
        44,
        255,
        pillar2.xOffset,
        pillar2.gapStart + pillar2.gapWidth,
        pillar2.width,
        canvas.height
      );
      ctx.strokeStyle = "blue";
      ctx.stroke();
  
      //* draw ground
  
      console.log(canvas.ground);
      // ctx.rect(canvas.ground.xOffset, canvas.height - 85, canvas.width, 88);
      ctx.strokeStyle = "red";
      ctx.stroke();
  
      ctx.drawImage(
        assets,
        canvas.ground.sprite.sx,
        canvas.ground.sprite.sy,
        canvas.ground.sprite.width,
        canvas.ground.sprite.height,
        canvas.ground.xOffset,
        canvas.height - 85,
        canvas.width+4,
        88
      );
      // ctx.rect(canvas.ground.xOffset, canvas.height - 85, canvas.width * 2, 88);
      ctx.strokeStyle = "blue";
      ctx.stroke();
      ctx.drawImage(
        assets,
        canvas.ground.sprite.sx,
        canvas.ground.sprite.sy,
        canvas.ground.sprite.width,
        canvas.ground.sprite.height,
        canvas.ground.xOffset+canvas.width+1,
        canvas.height - 85,
        canvas.width+4 ,
        88
      );
  
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
  
      // draw dead bird
      ctx.beginPath();
      ctx.rect(
        //  birdImage
        flappy.xOffset,
        flappy.yOffset,
        flappy.width,
        flappy.height
      );
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }
  