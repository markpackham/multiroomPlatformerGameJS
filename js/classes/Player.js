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

    // Check for horizontal collisions
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
        if (this.velocity.x < -1) {
          this.position.x =
            collisionBlock.position.x + collisionBlock.width + playerBuffer;
          break;
        }

        // Collision on x axis going to the right - push player to the left
        if (this.velocity.x > 1) {
          this.position.x =
            collisionBlock.position.x - collisionBlock.width - playerBuffer;
          break;
        }
      }
    }

    // Apply gravity
    this.position.y += this.velocity.y;
    this.sides.bottom = this.position.y + this.height;

    // Check for vertical collisions
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // Top of player hitting collision block
        if (this.velocity.y < -1) {
          this.position.y =
            collisionBlock.position.y + collisionBlock.height + playerBuffer;
          break;
        }
        // Bottom of player hitting collision block
        if (this.velocity.y > 1) {
          this.position.y =
            collisionBlock.position.y - this.height - playerBuffer;
          break;
        }
      }
    }

    // Above the bottom of the canvas
    if (this.sides.bottom + this.velocity.y < canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
