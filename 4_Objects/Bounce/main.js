// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let balls = []; // holds all the balls.

// function to generate random number
function random(min, max) {
  let num = Math.floor(Math.random() * (max - min + 1 )) + min;
  return num;
}

// ball object generator
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x; // (x,y) start coordinates.
    this.y = y;
    this.velX = velX; // (x,y) "velocity". These values will be regularly added to the x/y coordinate values when we start to animate the balls, to move them by this much on each frame.
    this.velY = velY;
    this.color = color;
    this.size = size; // radius
  }

  draw() {
    ctx.beginPath(); // to state that we want to draw a shape
    ctx.fillStyle = this.color;
    /*
    Method to trace an arc shape.
      * The x and y position of the arc's center — we are specifying our ball's x and y properties.
      * The radius of our arc — we are specifying our ball's size property.
      * The last two parameters specify the start and end number of degrees round the circle that the arc is drawn between.
          Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians).
          That gives us a complete circle. If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).
    */
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    /*
    Check whether the ball has reached the edge of the canvas.
    If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction.
    Size used so ball does not go half way off screen before "bounce".
    */
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }
    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }
    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    // move ball each time method is called.
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (let j = 0; j < balls.length; j++) {
      // don't check whether a ball has collided with itself.
      if (!(this === balls[j])) {
        let dx = this.x - balls[j].x;
        let dy = this.y - balls[j].y;
        let distance = Math.sqrt((dx * dx) + (dy * dy));
        // if collision change both ball direction and color
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = `rgb(${random(0, 225)},${random(0, 225)},${random(0, 225)})`;
          balls[j].velX = this.velY;
          balls[j].velY = this.velX;
          this.velX = -balls[j].velX;
          this.velY = -balls[j].velY;
        }
      }
    }
  }
}

// fills balls array with ball objects.
do {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(7, -7),
    `rgb(${random(0, 225)},${random(0, 225)},${random(0, 225)})`,
    size
  );

  balls.push(ball);

} while (balls.length < 25); // change integer to make more or less balls

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)"; // canvas fill color
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    // draw each ball on the screen.
    balls[i].draw();
    // then do the necessary updates to position and velocity in time for the next frame.
    balls[i].update();
    // perform collision detection
    balls[i].collisionDetect();
  }

  // This method is constantly run and passed the same function name,
  // it will run that function a set number of times per second to create a smooth animation.
  // This is generally done recursively
  requestAnimationFrame(loop);
}

// gets things started
loop();
