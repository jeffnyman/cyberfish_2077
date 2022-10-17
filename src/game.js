import { InputHandler } from "./input.js";
import { Player } from "./player.js";
import { UserInterface } from "./ui.js";

class Game {
  constructor(width, height) {
    // Dimensions

    this.width = width;
    this.height = height;

    // Objects

    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UserInterface(this);

    // State

    // Keeps track of all actions (key press events) by the player.
    this.actions = [];
  }

  update(deltaTime) {
    this.player.update(deltaTime);
  }

  draw(context) {
    this.player.draw(context);
    this.ui.draw(context);
  }
}

export { Game };
