const rememberDiv = document.querySelector(".remember");
const forgetDiv = document.querySelector(".forget");
const form = document.querySelector("form");
const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
const personalGreeting = document.querySelector(".personal-greeting");

// Stop the form from submitting when a button is pressed
form.addEventListener("submit", function(e) {
  e.preventDefault();
});

// run function when the "Say Hello" button is clicked
submitBtn.addEventListener("click", function() {
  // store the entered name in web storage
  localStorage.setItem("name", nameInput.value);
  // run nameDisplayCheck() to sort out displaying the
  // personalized greeting and updating the form display
  nameDisplayCheck();
});

forgetBtn.addEventListener("click", function() {
  // remove the stored name from web storage
  localStorage.removeItem("name");
  // run nameDisplayCheck() to sort out dispalying the
  // genaric greeting again andupdating the form display
  nameDisplayCheck();
});

// define nameDisplayCheck()
function nameDisplayCheck() {
  if (localStorage.getItem("name")) {
    // if exists then display personal greeting
    let name = localStorage.getItem("name");
    h1.textContent = `Welcome, ${name}`;
    personalGreeting.textContent = `Welcome to our website ${name}! We hope you have fun while you are here.`;
    // in the form, hide "forget" and show "remember"
    forgetDiv.getElementsByClassName.display = "none";
    rememberDiv.getElementsByClassName.display = "block";
  }
}
// run on load
document.body.onload = nameDisplayCheck;
