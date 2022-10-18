class Layer {
  constructor(game, image, speedModifier) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;

    // Dimensions

    this.width = 1768;
    this.height = 500;

    // Location

    this.x = 0;
    this.y = 0;
  }

  update() {
    // If the background image has moved across the screen
    // and is now fully hidden behind the left edge of the
    // viewport, then the image position is reset so that it
    // can scroll again.
    if (this.x <= -this.width) {
      this.x = 0;
    }

    this.x -= this.game.speed * this.speedModifier;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);

    // Draw second image that serves as a gap filler for when
    // the main set of layer images moves off the screen.
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}

export { Layer };
