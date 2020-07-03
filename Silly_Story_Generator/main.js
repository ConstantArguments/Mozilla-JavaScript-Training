/* 1.CONSTANT DEFINITIONS
 **************************************************************************/
const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");
const reset = document.querySelector(".reset");

/* 2. VARIABLE TEXT STRINGS AND ARRAYS
 **************************************************************************/
// The main story.
let storyText =
  "It was 94 fahrenheit outside, so Bob and :insertx: went for a walk. When they got to :inserty:, it was on fire! They stared in horror for a few moments, then :insertx: :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";

// Three arrays with content to randomize the story.
let insertX = [
  "Willy the Goblin",
  "Big Daddy",
  "Father Christmas",
  "Zoolander",
  "Claire"
];

let insertY = [
  "the soup kitchen",
  "Disneyland",
  "the White House",
  "the Frolic Room",
  "the Grand Canyon",
  "Applebee's"
];

let insertZ = [
  "spontaneously combusted",
  "melted into a puddle on the sidewalk",
  "turned into a slug and crawled away",
  "pooped a miniature version of Bob",
  "reenacted that scene from Titanic",
  "pulled a grilled-stuffed-burrito out of their pocket"
];

let newStory = "";

/* 3. Functions
 **************************************************************************/
reset.style.visibility = "hidden";
customName.focus();

// Adds a click event listener to the randomize variable so that when the button it represents is clicked, the result() function is run.
randomize.addEventListener("click", result);

// Adds a click event listener to the reset variable so that when the button it represents is clicked, the resetStory() function is run.
reset.addEventListener("click", resetStory);

function result() {
  newStory = storyText;

  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  function randomValueFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // replace the three placeholders from arrays, and 'Bob' with custom name in the newStory string.
  function replacePlaceholders() {
    if (newStory.indexOf(":insertx:") !== -1) {
      newStory = newStory.replace(/:insertx:/g, xItem); // /string/g with replace all instances
    }
    if (newStory.indexOf(":inserty:") !== -1) {
      newStory = newStory.replace(/:inserty:/g, yItem);
    }
    if (newStory.indexOf(":insertz:") !== -1) {
      newStory = newStory.replace(/:insertz:/g, zItem);
    }
    if (customName.value !== "") {
      let name = customName.value;
      if (newStory.indexOf("Bob") !== -1) {
        newStory = newStory.replace(/Bob/g, name);
      }
    }
  }
  replacePlaceholders();

  if (document.getElementById("uk").checked) {
    let weight = Math.round(300 / 14) + " stone";
    newStory = newStory.replace("300 pounds", weight);
    let temperature = Math.round((94 - 32) * (5 / 9)) + " centigrade";
    newStory = newStory.replace("94 fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
  randomize.style.visibility = "hidden";
  reset.style.visibility = "visible";
}

// resets page
function resetStory() {
  story.style.visibility = "hidden";
  randomize.style.visibility = "visible";
  reset.style.visibility = "hidden";
  customName.value = "";
  customName.focus();
}
