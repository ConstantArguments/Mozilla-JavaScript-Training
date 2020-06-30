/* variables to hold references to all the objects we want to manipulate
************************************************************************* */

// The <video> element, and the controls bar
const media = document.querySelector("video");
const controls = document.querySelector(".controls");

// The play/pause, stop, rewind, and fast forward buttons
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

// The outer timer wrapper
const timerWrapper = document.querySelector(".timer");
// the digital timer readout
const timer = document.querySelector(".timer span");
// the inner <div> that gets wider as the time elapses
const timerBar = document.querySelector(".timer div");

// audio
const mute = document.querySelector('.mute');

/* remove the default browser controls from the video, and make the custom controls visible
************************************************************************* */

media.removeAttribute('controls');
controls.style.visibility = 'visible';

/* play and pause video
************************************************************************* */

// event listeners
play.addEventListener("click", playPauseMedia);
stop.addEventListener('click', stopMedia); // stop the video when user stops
media.addEventListener('ended', stopMedia); // stop the video when it finishes playing

// play
function playPauseMedia() {
  // Make play/pause or stop buttons work while the rewind or fast forward functionality is active
  fixPlayPause();

  if (media.paused) {
    play.setAttribute("data-icon", "u"); // icon font used u is pause
    media.play();
  } else {
    play.setAttribute("data-icon", "P"); // icon font used P is play
    media.pause();
  }
}

// "stop" is pause and rewind video to beginnning
function stopMedia() { // no real "stop" in HTMLMediaElement API
  media.pause();
  media.currentTime = 0; // immediately jumps the media to that position
  play.setAttribute("data-icon", "P"); // make ready to play again

  // Make play/pause or stop buttons work while the rewind or fast forward functionality is active
  fixPlayPause();
}

/* video seeking back and fourth
************************************************************************* */

// event listeners
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);

// variables for seeking
let intervalFwd;
let intervalRwd;

// seek backward
function mediaBackward() {
  clearInterval(intervalFwd);
  fwd.classList.remove("active");

  if (rwd.classList.contains("active")) {
    // if already fast forwarding then play
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    media.play();
  } else {
    // cancel any fast forward functionality and replace it with the rewind functionality
    rwd.classList.add("active");
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
  }
}

function windBackward() {
  // when the interval is active, this function is being run once every 200 milliseconds
  if (media.currentTime <= 3) {
    // prevents rewinding back past the start of the video
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    stopMedia();
  } else {
    // rewinding the video by 3 seconds, once every 200 milliseconds
    media.currentTime -= 3;
  }
}

// seek forward
function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if (fwd.classList.contains("active")) {
    // if already rewinding then play
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    // cancel any rewind functionality and replace it with thefast forward functionality
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windForward() {
  // when the interval is active, this function is being run once every 200 milliseconds
  if (media.currentTime >= media.duration -3) {
    // prevents fast forwarding back past the end of the video
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    stopMedia();
  } else {
    // fast forwarding the video by 3 seconds, once every 200 milliseconds
    media.currentTime += 3;
  }
}

// click time bar to set playback position
timerWrapper.onclick = function(e) {
  // clicked position in timeWrapper will equate percent of timeBar
  let pos = (e.pageX  - controls.offsetLeft - this.offsetLeft - 10) / this.offsetWidth; // 10 is for margin
  media.currentTime = pos * media.duration;
};

/* update elapsed time
************************************************************************* */

// event listener
media.addEventListener('timeupdate', setTime);

// set time
function setTime() {
  // keeps display values under 60 for 00:00:00 time format
  let hours = Math.floor(media.currentTime / 60 / 60)
  let minutes = Math.floor((media.currentTime / 60) - (hours * 60));
  let seconds = Math.floor(media.currentTime - (minutes * 60));
  let hourValue;
  let minuteValue;
  let secondValue;

  if (hours < 10) {
    // add leading zero if less than 10
    hourValue = `0${hours}`;
  } else {
    hourValue = hours;
  }

  if (minutes < 10) {
    // add leading zero if less than 10
    minuteValue = `0${minutes}`;
  } else {
    minuteValue = minutes;
  }

  if (seconds < 10) {
    // add leading zero if less than 10
    secondValue = `0${seconds}`;
  } else {
    secondValue = seconds;
  }

  let mediaTime = `${hourValue}:${minuteValue}:${secondValue}`;
  timer.textContent = mediaTime;

  // The length we should set the inner <div> to is worked out by first working out the width of the outer <div>
  // (any element's clientWidth property will contain its length), and then multiplying it by the HTMLMediaElement.currentTime
  // divided by the total HTMLMediaElement.duration of the media.
  let barLength = timerWrapper.clientWidth * (media.currentTime / media.duration);
  timerBar.style.width = `${barLength}px`;
}

/* Fix play and pause
************************************************************************* */

// Make play/pause or stop buttons work while the rewind or fast forward functionality is active
function fixPlayPause() {
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}

/* audio
************************************************************************* */

// mute
mute.onclick = function() {
  media.muted = !media.muted;
};
