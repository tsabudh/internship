export class State {
  constructor(state) {
    this.state = state;
  }
}

class landed extends State {
  constructor(hero) {
    super("FLYING");
    this.hero = hero;
  }
  enter() {}
  handleInput() {
    if (input == "PRESS up") {
    }
  }
}
