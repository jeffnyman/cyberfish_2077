class Player {
  constructor(game) {
    this.game = game;

    // Dimensions

    this.width = 120;
    this.height = 190;

    // Location

    this.x = 20;
    this.y = 100;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Player };
