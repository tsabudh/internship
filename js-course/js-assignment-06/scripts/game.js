function gameLoop(canvasEl, canvas) {
  let flappy = canvas.flappy;
  let { pillar0, pillar1, pillar2 } = { ...canvas };

  if (canvas.gameStatus == "GAME_NOT_STARTED") {
    //* draw background
    canvas.drawBackground();

    // draw game title text
    canvas.drawImage(
      canvas.sprites.gameTitle,
      canvas.width / 2 - canvas.sprites.gameTitle.width / 2,
      canvas.height / 10
    );
    // draw click to play instruction text
    canvas.drawImage(
      canvas.sprites.clickToPlay,
      canvas.width / 2 - canvas.sprites.clickToPlay.width / 2,
      canvas.height / 2 + canvas.flappy.height
    );
    canvas.drawFlappy();
    canvas.drawGround();
    canvas.ground.update();
  }

  if (canvas.gameStatus == "GAME_START") {
    canvas.flappy.yOffset = canvas.height / 2;
    canvas.createPillars();
    canvas.t = 0;
    canvas.score = 0;
    flappy.alive = true;
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
    canvas.context.clearRect(0, 0, canvas.width, canvas.height);

    //* draw background
    canvas.drawBackground();

    //* draw bird
    canvas.drawFlappy();

    //* draw pillar  0 top and bottom part
    canvas.drawPillar(canvas.sprites.pillarTop, pillar0);
    canvas.drawPillar(canvas.sprites.pillarBottom, pillar0);

    //* draw pillar  1 top and bottom part
    canvas.drawPillar(canvas.sprites.pillarTop, pillar1);
    canvas.drawPillar(canvas.sprites.pillarBottom, pillar1);

    //* draw pillar  2 top and bottom part
    canvas.drawPillar(canvas.sprites.pillarTop, pillar2);
    canvas.drawPillar(canvas.sprites.pillarBottom, pillar2);

    //* draw ground
    canvas.drawGround();

    //* update ground, pillars, score,
    canvas.ground.update();
    pillar0.update();
    pillar1.update();
    pillar2.update();
    canvas.updateScore();
  }

  //* check if achieved high score
  if (canvas.gameStatus == "GAME_OVER" || canvas.gameStatus == "GAME_PAUSED") {
    canvas.highScore =
      canvas.score > canvas.highScore ? canvas.score : canvas.highScore;

    //* draw scoreboard
    canvas.drawScoreBoard();
    if (canvas.gameStatus == "GAME_OVER") {
      canvas.drawImage(
        canvas.sprites.gameOver,
        canvas.width / 2 - canvas.sprites.gameOver.width / 2,
        canvas.height / 6
      );
    } else if (canvas.gameStatus == "GAME_PAUSED") {
      //*if game is paused show "game paused"
      canvas.drawImage(
        canvas.sprites.gamePaused,
        canvas.width / 2 - canvas.sprites.gameOver.width / 2,
        canvas.height / 6
      );
    }

    // show play button
    canvas.drawImage(
      canvas.sprites.playButton,
      canvas.width / 2 - canvas.sprites.playButton.width / 2,
      canvas.height / 1.8
    ); // SAME VALUE to  be used in click event listener
  }
}

export function startGame(canvasEl, canvas) {
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
      canvas.t = 0;
      canvas.flappy.u = 2.5;
    }

    let playButton = {
      left: canvas.width / 2 - canvas.sprites.tapToPlay.width / 2,
      top: canvas.height / 1.8,
    };
    // boolean for if cursor is within button during clicks
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
