const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Collision blocks
let parsedCollisions = collisionsLevel1.parse2D();
let collisionBlocks = parsedCollisions.createObjectsFrom2D();

// Player
const player = new Player({
  // Set collision blocks when player created
  collisionBlocks,
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
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: "./img/king/enterDoor.png",
    },
  },
});

// Doors
const doors = [
  new Sprite({
    position: {
      x: 767,
      y: 270,
    },
    imageSrc: "./img/doorOpen.png",
    frameRate: 5,
    frameBuffer: 12,
    loop: false,
    autoplay: false,
  }),
];

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

// Background
let background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/backgroundLevel1.png",
});

// Animation
function animate() {
  window.requestAnimationFrame(animate);

  background.draw();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.draw();
  });

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput();
  player.draw();
  player.update();
}

animate();
