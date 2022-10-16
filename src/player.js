class Player {
  constructor(game) {
    this.game = game;

    // Dimensions

    this.width = 120;
    this.height = 190;

    // Location

    this.x = 20;
    this.y = 100;

    // Movement

    this.speedY = 0;
    this.maxSpeed = 3;
  }

  update() {
    if (this.game.actions.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.actions.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Player };
