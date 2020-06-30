const select = document.querySelector("select");
const list = document.querySelector("ul");
const h1 = document.querySelector("h1");

select.onchange = function() {
  let choice = select.value;

  // ADD CONDITIONAL HERE
  let days = 31;
  if (
    choice === "September" ||
    choice === "April" ||
    choice === "June" ||
    choice === "November"
  )
    days = 30;
  else if (choice === "February") days = 28;

  createCalendar(days, choice);
};

function createCalendar(days, choice) {
  list.innerHTML = "";
  h1.textContent = choice;
  for (let i = 1; i <= days; i++) {
    let listItem = document.createElement("li");
    listItem.textContent = i;
    list.appendChild(listItem);
  }
}

createCalendar(31, "January");
