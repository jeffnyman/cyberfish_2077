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

    // Handle projectiles.

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

    // Handle ammo.

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) {
        this.ammo++;
      }

      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
  }

  draw(context) {
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.width, this.height);

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
}

export { Player };
