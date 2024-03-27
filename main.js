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

function animate() {
  window.requestAnimationFrame(animate);

  background.draw();

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
