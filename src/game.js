import { Background } from "./background.js";
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

    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UserInterface(this);

    // State

    this.speed = 1;
    this.bounty = 0;
    this.winningBounty = 10;
    this.huntOver = false;
    this.huntTime = 0;
    this.huntTimeLimit = 5000;

    // Keeps track of all actions (key press events) by the player.
    this.actions = [];

    // Keeps track of all active enemies on the level.
    this.enemies = [];

    // Mechanics

    this.enemyTimer = 0;
    this.enemyInterval = 1000;
  }

  update(deltaTime) {
    if (!this.huntOver) {
      this.huntTime += deltaTime;
    }

    if (this.huntTime > this.huntTimeLimit) {
      this.huntOver = true;
    }

    // Update layers 1, 2 and 3.
    this.background.update();

    // Update layer 4.
    this.background.layer4.update();

    this.player.update(deltaTime);

    this.moveEnemy(deltaTime);
  }

  draw(context) {
    this.background.draw(context);
    this.player.draw(context);
    this.ui.draw(context);

    // Draw enemies.

    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });

    // Draw bottom-most layer. This is to make sure
    // that this layer appears in front of all other
    // game objects.

    this.background.layer4.draw(context);
  }

  addEnemy() {
    this.enemies.push(new Angler1(this));
  }

  moveEnemy(deltaTime) {
    this.enemies.forEach((enemy) => {
      enemy.update();

      this.checkEnemyCollision(enemy);
      this.checkProjectileCollision(enemy);
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.outOfPlay);
    this.enemies = this.enemies.filter((enemy) => !enemy.destroyed);

    if (this.enemyTimer > this.enemyInterval && !this.huntOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }

  checkEnemyCollision(enemy) {
    if (this.checkCollision(this.player, enemy)) {
      enemy.destroyed = true;
    }
  }

  checkProjectileCollision(enemy) {
    this.player.projectiles.forEach((projectile) => {
      if (this.checkCollision(projectile, enemy)) {
        enemy.armor--;
        projectile.collided = true;

        if (enemy.armor <= 0) {
          enemy.destroyed = true;

          if (!this.huntOver) {
            this.bounty += enemy.bounty;
          }

          if (this.bounty > this.winningBounty) {
            this.huntOver = true;
          }
        }
      }
    });
  }
}

export { Game };
