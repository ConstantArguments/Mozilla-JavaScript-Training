const div = document.querySelector("div");

let windowWidth = window.innerWidth; // this cannot be a const for resize function to work
let windowHeight = window.innerHeight; // this cannot be a const for resize function to work

// sets <div> size on page load to equal viewport
div.style.width = `${windowWidth}px`;
div.style.height = `${windowHeight}px`;

// <div> resize on window resize
window.onresize = function() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  div.style.width = `${windowWidth}px`;
  div.style.height = `${windowHeight}px`;
}