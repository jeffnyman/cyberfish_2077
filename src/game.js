import { Angler1 } from "./enemy.js";
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

    // Keeps track of all active enemies on the level.
    this.enemies = [];

    // Mechanics

    this.enemyTimer = 0;
    this.enemyInterval = 1000;
  }

  update(deltaTime) {
    this.player.update(deltaTime);

    this.moveEnemy(deltaTime);

    // Handle enemy movement.

    // this.enemies.forEach((enemy) => {
    //   enemy.update();
    // });

    // this.enemies = this.enemies.filter((enemy) => !enemy.outOfPlay);

    // if (this.enemyTimer > this.enemyInterval) {
    //   this.addEnemy();
    //   this.enemyTimer = 0;
    // } else {
    //   this.enemyTimer += deltaTime;
    // }
  }

  draw(context) {
    this.player.draw(context);
    this.ui.draw(context);

    // Draw enemies.

    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
  }

  addEnemy() {
    this.enemies.push(new Angler1(this));
  }

  moveEnemy(deltaTime) {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.outOfPlay);

    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
}

export { Game };
