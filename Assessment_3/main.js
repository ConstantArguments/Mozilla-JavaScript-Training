// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

// set up variable for ball count in <p>
const paraCount = document.querySelector(".count");

// set up balls
let evilCircle;
let ball;
let balls = []; // holds all the balls.
let ballCount = 0;

// function to generate random number
function random(min, max) {
  let num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// set up timer
const theTimer = document.querySelector(".timer");
let timer = [0, 0, 0, 0];
let interval;
let timerRunning = false;
let currentTime;

function leadingZero(time) {
  // Add leading zero to numbers 9 or below (purely for aesthetics):
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// shape object constructor
class Shape {
  constructor(x, y, velX, velY, exists) {
    this.x = x; // (x,y) start coordinates.
    this.y = y;
    this.velX = velX; // (x,y) "velocity". These values will be regularly added to the x/y coordinate values when we start to animate the balls, to move them by this much on each frame.
    this.velY = velY;
    this.exists = exists;
  }
}

// evilCircle object constructor
class EvilCircle extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath(); // to state that we want to draw a shape
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    /*
    Method to trace an arc shape.
      * The x and y position of the arc's center — we are specifying our evilCircle's x and y properties.
      * The radius of our arc — we are specifying our evilCircle's size property.
      * The last two parameters specify the start and end number of degrees round the circle that the arc is drawn between.
          Here we specify 0 degrees, and 2 * PI, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians).
          That gives us a complete circle. If you had specified only 1 * PI, you'd get a semi-circle (180 degrees).
    */
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  checkBounds() {
    /*
    Check whether the evilCircle has reached the edge of the canvas.
    If it has, we reverse the polarity of the relevant velocity so the evilCircle's is bounced back onto the screen slightly.
    */
    if (this.x + this.size >= width) {
      this.x -= this.size;
    }

    if (this.x - this.size <= 0) {
      this.x += this.size;
    }

    if (this.y + this.size >= height) {
      this.y -= this.size;
    }

    if (this.y - this.size <= 0) {
      this.y += this.size;
    }
  }

  // key codes a = 65, d = 68, w = 87, s = 83 to move evilCircle l,r,u,d
  setControls() {
    let _this = this;
    window.onkeydown = function (e) {
      if (e.keyCode === 65) {
        _this.x -= _this.velX;
      } else if (e.keyCode === 68) {
        _this.x += _this.velX;
      } else if (e.keyCode === 87) {
        _this.y -= _this.velY;
      } else if (e.keyCode === 83) {
        _this.y += _this.velY;
      }
    };
    window.onmousemove = function (e) {
      let relativeX = e.clientX;
      let relativeY = e.clientY;
      if (relativeX > 0 && relativeX < width) {
        _this.x = relativeX;
      }
      if (relativeY > 0 && relativeY < height) {
        _this.y = relativeY;
      }
    };
  }

  eatenDetect() {
    for (let j = 0; j < balls.length; j++) {
      if (balls[j].exists === true) {
        let dx = this.x - balls[j].x;
        let dy = this.y - balls[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        // if collision with evilCircle change ball exist to false and decrements ballCount
        if (distance < this.size + balls[j].size) {
          balls[j].exists = false;
          ballCount--;
          paraCount.textContent = `Ball count: ${ballCount}`;
          if (ballCount === 0) {
            alert(`Good Show! Your time was ${currentTime}. Let's try it a little FASTER!`);
            reset();
          }
        }
      }
    }
  }
}

// ball object constructor
class Ball extends Shape {
  constructor(x, y, velX, velY, exists, color, size) {
    super(x, y, velX, velY, exists);
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
        let distance = Math.sqrt(dx * dx + dy * dy);
        // if collision change both ball direction and color
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = `rgb(${random(0, 225)},${random(
            0,
            225
          )},${random(0, 225)})`;
          balls[j].velX = this.velY;
          balls[j].velY = this.velX;
          this.velX = -balls[j].velX;
          this.velY = -balls[j].velY;
        }
      }
    }
  }
}



// runs draws animation loop
function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.25)"; // canvas fill color
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    if (balls[i].exists === true) {
      // draw each ball on the screen.
      balls[i].draw();
      // then do the necessary updates to position and velocity in time for the next frame.
      balls[i].update();
      // perform collision detection
      balls[i].collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.eatenDetect();

  // This method is constantly run and passed the same function name,
  // it will run that function a set number of times per second to create a smooth animation.
  // This is done recursively
  requestAnimationFrame(loop);
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;

  theTimer.innerHTML = "00:00:00";

  ballCount = 0;
  balls = [];

  start();
}

// gets things started
function start() {

  // makes evilCircle (x, y, velX, velY, exists, color, size)
  evilCircle = new EvilCircle(
    width / 2,
    height / 2,
    20,
    20,
    true,
    "white",
    10
  );
  evilCircle.setControls();

  // fills balls array with ball objects. (x, y, velX, velY, exists, color, size)
  do {
    let size = random(10, 20);
    ball = new Ball(
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-7, 7),
      random(7, -7),
      true,
      `rgb(${random(0, 225)},${random(0, 225)},${random(0, 225)})`,
      size
    );

    balls.push(ball);
    ballCount++;
    paraCount.textContent = `Ball count: ${ballCount}`;
  } while (balls.length < 25); // change integer to make more or less balls

  alert(
    'Move the "Evil Circle" to capture the bouncing balls.\nUse A,S,D,W or the mouse to move.'
  );

  loop();
  interval = setInterval(runTimer, 10);
}

start();
