class Enemy {
  constructor(game) {
    this.game = game;

    // Location

    this.x = this.game.width;

    // Movement

    this.speedX = Math.random() * -1.5 - 0.5;

    // Conditions

    this.outOfPlay = false;
    this.destroyed = false;

    // Animation

    this.frameX = 0; // cycle through sprite sheet horizontally
    this.frameY = 0; // determine row of sprite sheet to cycle through
    this.maxFrame = 37; // maximum frames to cycle through
  }

  update() {
    // This calculation takes into account the game scrolling speed
    // when calculating enemy positions. This way in case there are
    // dynamic events that change game speed. In those cases, the
    // enemies will always be correctly positioned in relation to
    // the scrolling world.
    this.x += this.speedX - this.game.speed;

    // Check if the enemy has moved off the screen.
    if (this.x + this.width < 0) {
      this.outOfPlay = true;
    }

    // Sprite animation.

    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  draw(context) {
    // The next two lines were the blank rectangle approach before
    // we had a sprite.
    // context.fillStyle = "red";
    // context.fillRect(this.x, this.y, this.width, this.height);

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height);
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );

    if (this.game.debug) {
      context.fillStyle = "cyan";
      context.font = "30px Helveetica";
      context.fillText(this.armor, this.x, this.y);
    }
  }
}

class Angler1 extends Enemy {
  constructor(game) {
    super(game);

    // Dimensions

    this.width = 228;
    this.height = 169;

    // Location

    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    // Representation

    this.image = document.getElementById("angler1");

    // Animation

    this.frameY = Math.floor(Math.random() * 3);

    // State

    this.armor = 2;
    this.bounty = this.armor;
  }
}

class Angler2 extends Enemy {
  constructor(game) {
    super(game);

    // Dimensions

    this.width = 213;
    this.height = 165;

    // Location

    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    // Representation

    this.image = document.getElementById("angler2");

    // Animation

    this.frameY = Math.floor(Math.random() * 2);

    // State

    this.armor = 3;
    this.bounty = this.armor;
  }
}

class LuckyFish extends Enemy {
  constructor(game) {
    super(game);

    // Dimensions

    this.width = 99;
    this.height = 95;

    // Location

    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    // Representation

    this.image = document.getElementById("lucky");

    // Animation

    this.frameY = Math.floor(Math.random() * 2);

    // State

    this.armor = 3;
    this.bounty = 15;
    this.type = "lucky";
  }
}

class HiveWhale extends Enemy {
  constructor(game) {
    super(game);

    // Dimensions

    this.width = 400;
    this.height = 227;

    // Location

    this.y = Math.random() * (this.game.height * 0.95 - this.height);

    // Representation

    this.image = document.getElementById("hivewhale");

    // Animation

    this.frameY = 0;

    // State

    this.armor = 15;
    this.bounty = this.armor;
    this.type = "hive";

    // Movement

    this.speedX = Math.random() * -1.2 - 0.2;
  }
}

class Drone extends Enemy {
  constructor(game, x, y) {
    super(game);

    // Dimensions

    this.width = 115;
    this.height = 95;

    // Location

    this.x = x;
    this.y = y;

    // Representation

    this.image = document.getElementById("drone");

    // Animation

    this.frameY = Math.floor(Math.random() * 2);

    // State

    this.armor = 3;
    this.bounty = this.armor;
    this.type = "drone";

    // Movement

    this.speedX = Math.random() * -4.2 - 0.5;
  }
}

export { Angler1, Angler2, LuckyFish, HiveWhale, Drone };
