const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Collision blocks
let parsedCollisions;
let collisionBlocks;

let doors;

// Player
const player = new Player({
  // Set collision blocks when player created
  imageSrc: "./img/king/idle.png",
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 4,
      loop: true,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 5,
      loop: true,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 5,
      loop: true,
      imageSrc: "./img/king/runLeft.png",
    },
    // Door
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",

      onComplete: () => {
        // GSAP animation library used https://gsap.com/docs/v3/
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++;
            levels[level].init();
            player.switchSprite("idleRight");
            player.preventInput = false;

            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

// Background
let background;

// Starting level
let level = 1;

// Levels
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel1.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 270,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 96;
      player.position.y = 140;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel2.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 772.0,
            y: 336,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 750;
      player.position.y = 230;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: "./img/backgroundLevel3.png",
      });

      doors = [
        new Sprite({
          position: {
            x: 176.0,
            y: 335,
          },
          imageSrc: "./img/doorOpen.png",
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
};

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// Overlay for fade out
const overlay = {
  opacity: 0,
};

// Animation
function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  // collisionBlocks.forEach((collisionBlock) => {
  //   collisionBlock.draw();
  // });

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  // Fade to black when entering door
  // globalAlpha only applies to what exists between the canvas' c.save() & c.restore()
  c.globalAlpha = overlay.opacity;
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
}

levels[level].init();
animate();
