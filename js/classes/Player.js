class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate }) {
    // Use draw method from Sprite parent class
    super({ imageSrc, frameRate });

    this.position = {
      x: 200,
      y: 200,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.collisionBlocks = collisionBlocks;
  }

  update() {
    c.fillStyle = "rgba(0,0,255,0.4)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    this.position.x += this.velocity.x;

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    };

    c.fillStyle = "rgba(0,255,0,0.4)";
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );
    this.checkForVerticalCollisions();
  }

  // Check for horizontal collisions
  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // Check if a collision exists on player's left, right, bottom & finally top
      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
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
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // Top of player hitting collision block
        if (this.velocity.y < 0) {
          // Stop gravity so player doesn't pass through block
          this.velocity.y = 0;

          const offset = this.hitbox.position.y - this.position.y;

          this.position.y =
            collisionBlock.position.y +
            collisionBlock.height -
            offset +
            playerBuffer;
          break;
        }
        // Bottom of player hitting collision block
        if (this.velocity.y > 0) {
          // Stop gravity so player doesn't pass through block
          this.velocity.y = 0;

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height;

          this.position.y = collisionBlock.position.y - offset - playerBuffer;
          break;
        }
      }
    }
  }
}
