
var submitBtn = document.querySelector('#submit-guess-btn');
var submitGuessForm= document.querySelector('#submit-guess-form');
var clearFormBtn = document.querySelector('#clear-form-btn');
var challenger1Name = document.querySelector('#challenger-1-name-input');
var challenger1Guess = document.querySelector('#challenger-1-guess-input');
var challenger2Name = document.querySelector('#challenger-2-name-input');
var challenger2Guess = document.querySelector('#challenger-2-guess-input');
var resetGameBtn = document.querySelector('#reset-game-btn');
var minRangeInput = document.querySelector('#min-range-input');
var maxRangeInput = document.querySelector('#max-range-input');
var minRangeValue = document.querySelector('#min-range-value');
var maxRangeValue = document.querySelector('#max-range-value');
var updateBtn = document.querySelector('#update-btn');
var challenger1GuessSlot= document.querySelector('#challenger-1-guess-slot');
var challenger2GuessSlot= document.querySelector('#challenger-2-guess-slot');
var challenger1Feedback = document.querySelector('#challenger-1-feedback');
var challenger2Feedback = document.querySelector('#challenger-2-feedback');
var challenger1NameSlot= document.querySelector('#challenger-1-name-slot');
var challenger2NameSlot= document.querySelector('#challenger-2-name-slot');
var gameWinner
var targetNum
var guessCounter= 0;
var rightSection= document.querySelector('.right-section');

submitGuessForm.addEventListener('input', checkGuessInputs);
submitGuessForm.addEventListener('input', enableClearBtn);
clearFormBtn.addEventListener('click', clearFormInputs);
updateBtn.addEventListener('click', udpateCurrentGuessRange);
resetGameBtn.addEventListener('click', resetGuessForm);

rightSection.addEventListener("click", deleteCard);

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

  challenger1NameSlot.innerText= challenger1Name.value;
  challenger2NameSlot.innerText= challenger2Name.value;
  challenger1GuessSlot.innerText= challenger1Guess.value;
  challenger1GuessSlot.classList.add('pink-text');
  challenger2GuessSlot.innerText= challenger2Guess.value;
  challenger2GuessSlot.classList.add('pink-text');


  // disableAllSubmitGuessBtns();
  guessChecker();
  clearFormInputs();
}

function disableAllSubmitGuessBtns() {
  submitBtn.disabled = true;
  clearFormBtn.disabled = true;
  resetGameBtn.disabled = true;
}

function generateTargetNum(){
  var min = parseInt(`${minRangeValue.innerText}`)
  var max = parseInt(`${maxRangeValue.innerText}`);
  targetNum = Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(targetNum);
}

function guessChecker(){
  var highFeedback = ["that's too high!", "guess lower!", "too high!", "go lower!", "not low enough!"];
  var lowFeedback= ["that's too low!", "guess higher!", "too low!", "go higher!", "not high enough!"];
  var index1= Math.floor(Math.random() * highFeedback.length);
  var index2= Math.floor(Math.random() * lowFeedback.length);

  var num1= parseInt(challenger1Guess.value);
  var num2= parseInt(challenger2Guess.value);
  guessCounter +=2;
  if (num1 < targetNum){
    challenger1Feedback.innerText= lowFeedback[index2];
  } else if (num1 > targetNum){
    challenger1Feedback.innerText= highFeedback[index1];
  } else {
    challenger1Feedback.innerText= "BOOM!";
    gameWinner= challenger1Name.value;
    displayWinnerCard();
  }

  if (num2 < targetNum){
    challenger2Feedback.innerText= lowFeedback[index2];
  } else if (num2 > targetNum){
    challenger2Feedback.innerText= highFeedback[index1];
  } else {
    challenger2Feedback.innerText= "BOOM!";
    gameWinner= challenger2Name.value;
    displayWinnerCard();
  }
}

function udpateCurrentGuessRange() {
  minRangeValue.innerText = minRangeInput.value;
  maxRangeValue.innerText = maxRangeInput.value;
  generateTargetNum();
  clearSetRangeInputs();
}

function clearSetRangeInputs() {
  document.getElementById('set-range-inputs').reset();
}

function displayWinnerCard(){
  var rightSection= document.querySelector('.right-section');

  rightSection.insertAdjacentHTML('afterbegin', `
  <section class="winner-card">
      <section class="vs">
        <p><span>${challenger1Name.value}</span></p>
        <p>VS</p>
        <p><span>${challenger2Name.value}</span></p>
      </section>
      <section class="winner-declaration">
      <p><span>${gameWinner}</span></p>
      <p>WINNER</p>
      </section>
      <section class="game-stats">
        <p><span>${guessCounter}</span> GUESSES</p>
        <p><span>1</span> MINUTE <span>35</span> SECONDS</p>
        <img src="assets/delete.svg" alt="close-icon" class="close">
      </section>
    </section>`);
  clearGuessCounter();
}

function clearGuessCounter(){
  guessCounter=0;
}

function deleteCard(event) {
  if (event.target.classList.contains("close")){
   event.target.parentElement.parentElement.remove();
   }
  }

function resetGuessForm() {
  minRangeValue.innerText = 1;
  maxRangeValue.innerText = 100;

  challenger1GuessSlot.classList.remove('pink-text');
  challenger2GuessSlot.classList.remove('pink-text');

  challenger1NameSlot.innerText = 'Challenger 1 Name';
  challenger2NameSlot.innerText = 'Challenger 2 Name';

  challenger1Feedback.innerText = 'no guesses yet!';
  challenger2Feedback.innerText = 'no guesses yet!';
  //disable form buttons
  // disableAllSubmitGuessBtns()
  //reset generateTargetNum
  resetTargetNum();
  console.log({targetNum});
}

function resetTargetNum() {
  targetNum = NaN;
}

function rangeChecker(){
  if (minRangeInput.value < maxRangeInput.value){
    udpateCurrentGuessRange();
  } else {
    
  }
}
