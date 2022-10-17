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
  }

  update() {
    this.x += this.speedX;

    // Check if the enemy has moved off the screen.
    if (this.x + this.width < 0) {
      this.outOfPlay = true;
    }
  }

  draw(context) {
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Angler1 extends Enemy {
  constructor(game) {
    super(game);

    // Dimensions

    this.width = 228 * 0.2;
    this.height = 169 * 0.2;

    // Location

    this.y = Math.random() * (this.game.height * 0.9 - this.height);
  }
}

export { Angler1 };
