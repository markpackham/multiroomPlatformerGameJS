class Player {
  constructor({ collisionBlocks = [] }) {
    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 25;
    this.height = 25;
    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.collisionBlocks = collisionBlocks;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.position.x += this.velocity.x;

    this.checkForHorizontalCollisions();
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  // Check for horizontal collisions
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Check if a collision exists on player's left, right, bottom & finally top
      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // Collision on x axis going to the left - push player to the right
        if (this.velocity.x < 0) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + playerBuffer;
          break;
        }

        // Collision on x axis going to the right - push player to the left
        if (this.velocity.x > 0) {
          this.position.x =
            collisionBlock.position.x - collisionBlock.width - playerBuffer;
          break;
        }
      }
    }
  }

  // Apply gravity
  applyGravity() {
    this.velocity.y += gravity;
    this.position.y += this.velocity.y;
  }

  // Check for vertical collisions
  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // Top of player hitting collision block
        if (this.velocity.y < 0) {
          // Stop gravity so player doesn't pass through block
          this.velocity.y = 0;

          this.position.y =
            collisionBlock.position.y + collisionBlock.height + playerBuffer;
          break;
        }
        // Bottom of player hitting collision block
        if (this.velocity.y > 0) {
          // Stop gravity so player doesn't pass through block
          this.velocity.y = 0;

          this.position.y =
            collisionBlock.position.y - this.height - playerBuffer;
          break;
        }
      }
    }
  }
}
