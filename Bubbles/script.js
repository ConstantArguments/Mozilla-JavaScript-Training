const btn = document.querySelector("button");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let WIDTH = document.documentElement.clientWidth;
let HEIGHT = document.documentElement.clientHeight;

canvas.width = WIDTH;
canvas.height = HEIGHT;

function randoNum(number) {
  return Math.floor(Math.random() * number);
}
function randoColor() {
  return Math.floor(Math.random() * 16777215).toString(16); // returns random hex value for use as color
}

// random quantity, color, coodinates, and diameter of bubbles
function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let i = 0; i < randoNum(10000); i++) {
    ctx.beginPath();
    ctx.fillStyle = "#" + randoColor(); // random color for each bubble
    ctx.arc(randoNum(WIDTH), randoNum(HEIGHT), randoNum(75), 0, 2 * Math.PI); // random coordinates (x,y) and random diamiter
    ctx.fill();
  }
}

btn.addEventListener("click", draw);
