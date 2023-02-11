export class InputHandler {
  constructor(canvas) {
    this.lastKey = "";
    window.addEventListener("keydown", (e) => {
      if (e.key == "a") canvas.keyDown.a = true;
      if (e.key == "d") canvas.keyDown.d = true;
      if (e.key == "w") canvas.keyDown.w = true;
      if (e.key == "a") canvas.keyDown.a = true;
      if (e.key == "a") canvas.keyDown.a = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key == "a") canvas.keyDown.a = false;
      if (e.key == "d") canvas.keyDown.d = false;
      if (e.key == "w") canvas.keyDown.w = false;
      if (e.key == "a") canvas.keyDown.a = false;
      if (e.key == "a") canvas.keyDown.a = false;
    });
  }
}
