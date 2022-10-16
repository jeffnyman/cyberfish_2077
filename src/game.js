import { Player } from "./player.js";

class Game {
  constructor(width, height) {
    // Dimensions

    this.width = width;
    this.height = height;

    // State

    this.player = new Player(this);
  }

  update() {
    this.player.update();
  }

  draw(context) {
    this.player.draw(context);
  }
}

export { Game };
