const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const player = new Player();

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

let background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/backgroundLevel1.png",
});

let collisionBlocks = [];

let parsedCollisions = collisionsLevel1.parse2D();
parsedCollisions.forEach((row, yIndex) => {
  row.forEach((symbol, xIndex) => {
    // 292 is what a collision block is
    if (symbol === 292) {
      // Add new collision in collision blocks array
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: xIndex * 64,
            y: yIndex * 64,
          },
        })
      );
    }
  });
});

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
