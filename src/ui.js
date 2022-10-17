class UserInterface {
  constructor(game) {
    this.game = game;

    // Text rendering.

    this.fontSize = 25;
    this.fontFamily = "Helvetica";
    this.color = "yellow";
  }

  draw(context) {
    // Display Ammo

    context.fillStyle = this.color;

    for (let i = 0; i < this.game.player.ammo; i++) {
      context.fillRect(20 + 10 * i, 50, 3, 20);
    }
  }
}

export { UserInterface };
