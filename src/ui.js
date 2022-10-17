class UserInterface {
  constructor(game) {
    this.game = game;

    // Text rendering.

    this.fontSize = 25;
    this.fontFamily = "Helvetica";
    this.color = "yellow";
  }

  draw(context) {
    context.fillStyle = this.color;
    context.font = this.fontSize + "px " + this.fontFamily;

    // Display Bounty

    context.fillText("Bounty: " + this.game.bounty, 20, 40);

    // Display Ammo

    for (let i = 0; i < this.game.player.ammo; i++) {
      context.fillRect(20 + 10 * i, 50, 3, 20);
    }
  }
}

export { UserInterface };
