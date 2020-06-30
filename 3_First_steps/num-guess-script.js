/*
Generate a random number between 1 and 100.
Record the turn number the player is on. Start it on 1.
Provide the player with a way to guess what the number is.
Once a guess has been submitted first record it somewhere so the user can see their previous guesses.
Next, check whether it is the correct number.
If it is correct:
    Display congratulations message.
    Stop the player from being able to enter more guesses (this would mess the game up).
    Display control allowing the player to restart the game.
If it is wrong and the player has turns left:
    Tell the player they are wrong.
    Allow them to enter another guess.
    Increment the turn number by 1.
If it is wrong and the player has no turns left:
    Tell the player it is game over.
    Stop the player from being able to enter more guesses (this would mess the game up).
    Display control allowing the player to restart the game.
Once the game restarts, make sure the game logic and UI are completely reset, then go back to step 1.
*/

let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

guessField.focus();

function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    setGameOver();
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }
  guessCount++;
  guessField.value = "";
  guessField.focus();
}
guessSubmit.addEventListener("click", checkGuess);
guessField.onkeyup = function(e) {
  if (e.keyCode === 13) {
    //checks whether the pressed key is "Enter"
    checkGuess();
  }
};

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.appendChild(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (let i = 0; i < resetParas.length; i++) {
    resetParas[i].textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
