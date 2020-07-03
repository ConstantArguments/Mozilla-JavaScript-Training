const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");
const img = document.querySelectorAll("img");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Creatiing and Looping through images */
for (let i = 1; i <= 5; i++) {
  let newImage = document.createElement("img");
  newImage.setAttribute("src", "_images/pic" + i + ".jpg");
  thumbBar.appendChild(newImage);

  newImage.onclick = function(e) {
    let imageSrc = e.target.getAttribute("src");
    changeDisplayedImage(imageSrc);
  };
  function changeDisplayedImage(imageSrc) {
    displayedImage.setAttribute("src", imageSrc);
  }
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function() {
  let darken = btn.getAttribute("class");
  if (darken === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
};
