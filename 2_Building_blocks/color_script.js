const select = document.querySelector("select");
const html = document.querySelector(".output");

select.onchange = function() {
  let choice = select.value;
  let time = 0;

  // ADD SWITCH STATEMENT
  switch (choice) {
    case "white":
      update("FFFFFF", "000000");
      break;
    case "black":
      update("000000", "FFFFFF");
      break;
    case "purple":
      update("800080", "FFFF00");
      break;
    case "yellow":
      update("FFFF00", "800080");
      break;
    case "psychedelic":
      //setInterval(tripOut, 250,);    // once in Psych mode you are stuck. for-loop does-nt work.
      setTimeout(tripOut, time); // i cant find a way to loop this elegently.
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
      setTimeout(tripOut, time);
      time += 250;
  }
};

function tripOut() {
  let colorA = Math.floor(Math.random() * 16777215).toString(16);
  let colorB = Math.floor(Math.random() * 16777215).toString(16);
  update(colorA, colorB);
}

function update(bgColor, textColor) {
  html.style.backgroundColor = "#" + bgColor;
  html.style.color = "#" + textColor;
}
