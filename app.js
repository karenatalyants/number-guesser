/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if lose
- Let player choose to play again
*/


// game defaults

let min = 1,
  max = 11,
  winningNum = rand(min, max),
  guessesLeft = 3;

// random integer generation between min and max

function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// UI elements

const minNum = document.querySelector(".min"),
  maxNum = document.querySelector(".max"),
  guessBtn = document.querySelector("#guessBtn"),
  input = document.querySelector("#guessField"),
  message = document.querySelector(".message"),
  paButton = document.querySelector("#playAgain");

// assign UI min max

minNum.textContent = min;
maxNum.textContent = max;

// adding event listeners for two buttons

guessBtn.addEventListener("click", submit);
paButton.addEventListener("click", playAgain);

// functions with gameplay logic

function submit() {
  let guess = parseInt(input.value);
  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else {
    // here comes the game logic after validation

    if (guessesLeft != 0) {

      // check if won
      if (guess == winningNum) {
        gameOver(true, `You won! ${winningNum} is the correct answer!`)

        // replace the button
        guessBtn.style.display = "none";
        paButton.style.display = "";

        //paButton.addEventListener("click", playAgain());
      } else {
        // reduce guesses
        guessesLeft -= 1;

        if (guessesLeft == 0) {
          gameOver(false, `You lost. The correct answer was ${winningNum}`);
          // replace the button
          guessBtn.style.display = "none";
          paButton.style.display = "";
        } else {
          // set failure message
          setMessage(`Wrong. You have ${guessesLeft} guesses left.`, "orange");
          input.value = "";
        }
      }
    }
  }
}


function playAgain() {

  // new random correct answer
  winningNum = rand(min, max);
  // replace the button
  paButton.style.display = "none";
  guessBtn.style.display = "";
  // enable the input field and reset color
  guessField.disabled = false;
  guessField.style.placeholder = "Enter your guess...";
  guessField.style.borderColor = "";
  //remove message
  message.textContent = "";
  input.value = "";
}

function gameOver(won, msg) {
  // disable input, reset attempts, assign new correct answer
  guessField.disabled = true;
  guessesLeft = 3;
  // change the border color and message
  if (won == true) {
    guessField.style.borderColor = "green";
    // set message
    setMessage(msg, "green");
  } else {
    guessField.style.borderColor = "red";
    setMessage(msg, "red");
  }
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}