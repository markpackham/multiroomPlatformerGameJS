class Sprite {
  constructor({
    position,
    imageSrc,
    frameRate = 1,
    animations,
    frameBuffer = 3,
    loop = true,
    autoplay = true,
  }) {
    this.position = position;
    this.image = new Image();

    // Whether or not image has loaded fully
    this.image.onload = () => {
      this.loaded = true;
      this.width = this.image.width / this.frameRate;
      this.height = this.image.height;
    };

    this.image.src = imageSrc;
    this.loaded = false;
    this.frameRate = frameRate;
    this.currentFrame = 0;
    this.elapsedFrames = 0;
    // Slow animation down

    this.frameBuffer = frameBuffer;
    this.animations = animations;
    this.loop = loop;
    // Autoplay used for things like entering a door

    this.autoplay = autoplay;
    this.currentAnimation;

    if (this.animations) {
      // Create image objects for all animations rather than create them individually
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
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

  play() {
    this.autoplay = true;
  }

  updateFrames() {
    // Autoplay is true by default, we set doors to false so they remain closed till player uses them
    if (!this.autoplay) return;

    this.elapsedFrames++;

    // Slow down animation
    if (this.elapsedFrames % this.frameBuffer === 0) {
      // Safeguard if we have an image with only 1 frame
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
        // Only keep animation going if loop is true
      } else if (this.loop) {
        this.currentFrame = 0;
      }

      // Check if currentAnimaiton exists & if it has an onComplete property
      if (this.currentAnimation?.onComplete) {
        // Check if at end frame of animation
        if (
          this.currentFrame === this.frameRate - 1 &&
          !this.currentAnimation.isActive
        ) {
          this.currentAnimation.onComplete();
          this.currentAnimation.isActive = true;
        }
      }
    }
  }
}
