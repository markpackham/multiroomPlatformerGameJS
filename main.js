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
});

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

  player.velocity.x = 0;

  if (keys.d.pressed) {
    player.velocity.x = 5;
  } else if (keys.a.pressed) {
    player.velocity.x = -5;
  }

  player.draw();
  player.update();
}

animate();
