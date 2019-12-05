
var submitBtn = document.querySelector('#submit-guess-btn');
var submitGuessForm= document.querySelector('#submit-guess-form');
var clearFormBtn = document.querySelector('#clear-form-btn');
var challenger1Name = document.querySelector('#challenger-1-name-input');
var challenger1Guess = document.querySelector('#challenger-1-guess-input');
var challenger2Name = document.querySelector('#challenger-2-name-input');
var challenger2Guess = document.querySelector('#challenger-2-guess-input');

submitGuessForm.addEventListener('input', checkGuessInputs);
submitGuessForm.addEventListener('input', enableClearBtn);
clearFormBtn.addEventListener('click', clearFormInputs)

function checkGuessInputs(){

  if (challenger1Name.value && challenger1Guess.value && challenger2Name.value && challenger2Guess.value){
    submitBtn.disabled === false;
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



// Listening for a click on clear form button
// call a function that resets inputs -- clears them document
// Add class to the inputs
// use a querySelectorAll to iterate through all them setting them to an empty string
