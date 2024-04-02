class Sprite {
  constructor({ position, imageSrc, frameRate = 1, animations }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frameRate = frameRate;

    // Whether or not image has loaded fully
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
      this.animations = animations;

      if (this.animations) {
        // Create image objects for all animations rather than create them individually
        for (let key in this.animations) {
          const image = new Image();
          image.src = this.animations[key].imageSrc;
          this.animations[key].image = image;
        }
      }
    };

    this.loaded = false;

    this.currentFrame = 0;

    this.elapsedFrames = 0;
    // Slow animation down
    this.frameBuffer = 3;
  }

  draw() {
    // Don't do anything unless image loaded
    if (!this.loaded) return;

    // Crop animation frames
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;

    // Slow down animation
    if (this.elapsedFrames % this.frameBuffer === 0) {
      // Safeguard if we have an image with only 1 frame
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }
}
