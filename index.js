const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);
