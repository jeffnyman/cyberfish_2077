class UserInterface {
  constructor(game) {
    this.game = game;

    // Text rendering.

    this.fontSize = 25;
    this.fontFamily = "Helvetica";
  }

  draw(context) {
    context.save();

    context.fillStyle = "white";
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.font = this.fontSize + "px " + this.fontFamily;

    // Display Bounty

    context.fillText("Bounty: " + this.game.bounty, 20, 40);

    // Display Ammo

    context.fillStyle = "yellow";

    for (let i = 0; i < this.game.player.ammo; i++) {
      context.fillRect(20 + 10 * i, 50, 3, 20);
    }

    context.restore();
  }
}

export { UserInterface };
