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
  },
});

// Doors
const doors = [
  new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./img/doorOpen.png",
    frameRate: 5,
    frameBuffer: 12,
    loop: false,
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

  player.velocity.x = 0;

  if (keys.d.pressed) {
    {
      player.switchSprite("runRight");
      player.velocity.x = 5;
      player.lastDirection = "right";
    }
  } else if (keys.a.pressed) {
    player.switchSprite("runLeft");
    player.velocity.x = -5;
    player.lastDirection = "left";

    // When a button isn't pressed go idle
  } else {
    if (player.lastDirection === "left") {
      player.switchSprite("idleLeft");
    } else {
      player.switchSprite("idleRight");
    }
  }

  player.draw();
  player.update();
}

animate();
