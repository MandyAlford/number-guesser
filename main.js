
var submitBtn = document.querySelector('#submit-guess-btn');
var submitGuessForm= document.querySelector('#submit-guess-form');
var clearFormBtn = document.querySelector('#clear-form-btn');
var challenger1Name = document.querySelector('#challenger-1-name-input');
var challenger1Guess = document.querySelector('#challenger-1-guess-input');
var challenger2Name = document.querySelector('#challenger-2-name-input');
var challenger2Guess = document.querySelector('#challenger-2-guess-input');
var resetGameBtn = document.querySelector('#reset-game-btn');

submitGuessForm.addEventListener('input', checkGuessInputs);
submitGuessForm.addEventListener('input', enableClearBtn);
clearFormBtn.addEventListener('click', clearFormInputs);


function checkGuessInputs(){

  if (challenger1Name.value && challenger1Guess.value && challenger2Name.value && challenger2Guess.value){
    submitBtn.disabled === false;
    submitBtn.addEventListener('click', populateLatestGuess);
  } else {
    submitBtn.disabled=== true;
  }
}

function enableClearBtn() {
  if (challenger1Name.value || challenger1Guess.value || challenger2Name.value || challenger2Guess.value){
    clearFormBtn.disabled === false;

  } else {
    clearFormBtn.disabled=== true;
  }
}

function clearFormInputs() {
  document.getElementById('submit-guess-form').reset();
}


function populateLatestGuess(){
  var challenger1NameSlot= document.querySelector('#challenger-1-name-slot');
  var challenger2NameSlot= document.querySelector('#challenger-2-name-slot');
  var challenger1GuessSlot= document.querySelector('#challenger-1-guess-slot');
  var challenger2GuessSlot= document.querySelector('#challenger-2-guess-slot');

  challenger1NameSlot.innerText= challenger1Name.value;
  challenger2NameSlot.innerText= challenger2Name.value;
  challenger1GuessSlot.innerText= challenger1Guess.value;
  challenger2GuessSlot.innerText= challenger2Guess.value;

  disableAllSubmitGuessBtns();
  guessChecker();
  clearFormInputs();
}

function disableAllSubmitGuessBtns() {
  submitBtn.disabled = true;
  clearFormBtn.disabled = true;
  resetGameBtn.disabled = true;
}

function guessChecker(){
  var targetNum = 15;
  var challenger1Feedback = document.querySelector('#challenger-1-feedback');
  var challenger2Feedback = document.querySelector('#challenger-2-feedback');

  var highFeedback = ["that's too high!", "that's way too high", "too high!"];
  var lowFeedback= ["that's too low!", "that's way too low!", "too low!"];
  var index1= Math.floor(Math.random() * highFeedback.length);
  var index2= Math.floor(Math.random() * lowFeedback.length);

  var num1= parseInt(challenger1Guess.value);
  var num2= parseInt(challenger2Guess.value);

  if (num1 < targetNum){
    challenger1Feedback.innerText= lowFeedback[index2];
  } else if (num1 > targetNum){
    challenger1Feedback.innerText= highFeedback[index1];
  } else {
    challenger1Feedback.innerText= "BOOM!";
  }

  if (num2 < targetNum){
    challenger2Feedback.innerText= lowFeedback[index2];
  } else if (num2 > targetNum){
    challenger2Feedback.innerText= highFeedback[index1];
  } else {
    challenger2Feedback.innerText= "BOOM!";
  }
}
