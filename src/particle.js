class Particle {
  constructor(game, x, y) {
    this.game = game;

    // Location

    this.x = x;
    this.y = y;

    // Animation

    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 50; // size of individual frame
    this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);

    // State

    this.size = this.spriteSize * this.sizeModifier;

    // Movement

    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;

    // Physics

    this.gravity = 0.5;
    this.angle = 0; // angle of rotation
    this.va = Math.random() * 0.2 - 0.1; // speed of rotation; radians per animation frame
    this.bottomBounceBoundary = Math.random() * 100 + 60; // margin from which particles will bounce

    // Conditions

    this.outOfPlay = false;
    this.bounced = 0;

    // Representation

    this.image = document.getElementById("gears");
  }

  update() {
    // The rotation angle of the particle is increased by va.
    // The speed along the vertical direction will increase
    // by gravity. The particle will start moving upwards
    // because the starting speedY is -15. But as speedY is
    // increased by gravity, the -15 value goes closer to
    // zero. When it reaches zero, the particle will stop
    // moving and be at its peak height. As speedY further
    // increases, into positive numbers, it will increase
    // by 0.5 per animation frame and the particle will
    // start falling down.
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX;
    this.y += this.speedY;

    // Handle the particle falling down past the edge of the
    // canvas or the game screen scrolling past the particle.
    if (this.y > this.game.height + this.size || this.x < 0 - this.size) {
      this.outOfPlay = true;
    }

    // Handle particles bouncing. The speedY will be increased
    // a bit for the bounce, causing the particle to move up,
    // but the gravity value will keep being applied. So the
    // value of speedY will eventually reach zero and into the
    // positive numbers. This causes the particle to eventually
    // go out of play.
    if (
      this.y > this.game.height - this.bottomBounceBoundary &&
      this.bounced < 2
    ) {
      this.bounced++;
      this.speedY *= -0.9;
    }
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.size,
      this.size,
    );
  }
}

export { Particle };
