import { Projectile } from "./projectile.js";

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

    // Animation

    this.frameX = 0; // cycle through sprite sheet horizontally
    this.frameY = 0; // determine row of sprite sheet to cycle through

    // Representation

    this.image = document.getElementById("player");

    // Data

    /*
    Holds all currently active projectiles. This is stored
    on the player object rather than the game object because
    the player generates projectiles as part of their
    tech-infused biology.
    */
    this.projectiles = [];

    this.ammo = 20;
    this.maxAmmo = 50;

    // Mechanics

    this.ammoTimer = 0;
    this.ammoInterval = 500;
  }

  update(deltaTime) {
    if (this.game.actions.includes("ArrowUp")) {
      this.speedY = -this.maxSpeed;
    } else if (this.game.actions.includes("ArrowDown")) {
      this.speedY = this.maxSpeed;
    } else {
      this.speedY = 0;
    }

    this.y += this.speedY;

    this.handleProjectiles();
    this.handleAmmo(deltaTime);
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);

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

    // Draw projectiles.

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
  }

  firePrimary() {
    if (this.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30),
      );

      this.ammo--;
    }
  }

  handleProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    // Creates a new projectiles array, leaving out
    // any of the ones that should have disappeared.
    // All projectiles start off with dissipated being
    // false. So the "not dissipated" would mean
    // true.

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.dissipated,
    );

    // The same thing is done for projectiles that have
    // hit an enemy. In this case, the particles are
    // indicated by collided rather than dissipated.

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.collided,
    );
  }

  handleAmmo(deltaTime) {
    // ammoTimer = when limit is reached, event is trigged
    // ammoInternal = the limit that timer needs to reach
    // The goal is to replenish ammo based on some interval.
    // This will happen if the ammo is not currently at the
    // maximum amount of ammo.

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
      }

      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
  }
}

export { Player };
