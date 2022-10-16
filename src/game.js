import { Player } from "./player.js";

class Game {
  constructor(width, height) {
    // Dimensions

    this.width = width;
    this.height = height;

    // State

    this.player = new Player(this);
  }
}

export { Game };
