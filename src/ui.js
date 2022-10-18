class UserInterface {
  constructor(game) {
    this.game = game;

    // Text rendering.

    this.fontSize = 25;
    this.fontFamily = "Bangers";
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

    if (this.game.player.powerUp) {
      context.fillStyle = "red";
    } else {
      context.fillStyle = "yellow";
    }

    for (let i = 0; i < this.game.player.ammo; i++) {
      context.fillRect(20 + 10 * i, 50, 3, 20);
    }

    // Display Timer

    context.fillStyle = "white";

    const formattedTime = (this.game.huntTime * 0.001).toFixed(1);
    context.fillText("Hunt Timer: " + formattedTime, 20, 100);

    // Display game over messages

    context.fillStyle = "yellow";

    if (this.game.huntOver) {
      context.textAlign = "center";
      context.fillStyle = "white";

      let message1;
      let message2;

      if (this.game.bounty > this.game.winningBounty) {
        message1 = "Bounty Collected!";
        message2 = "Well done on the hunt!";
      } else {
        message1 = "Bounty Not Collected!";
        message2 = "Better luck on the next hunt!";
      }

      context.font = "70px " + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20,
      );

      context.font = "25px " + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20,
      );
    }

    context.restore();
  }
}

export { UserInterface };
