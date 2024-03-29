var challenger1Feedback = document.querySelector('#challenger-1-feedback');
var challenger1Guess = document.querySelector('#challenger-1-guess-input');
var challenger1GuessSlot = document.querySelector('#challenger-1-guess-slot');
var challenger1Name = document.querySelector('#challenger-1-name-input');
var challenger1NameSlot = document.querySelector('#challenger-1-name-slot');
var challenger2Feedback = document.querySelector('#challenger-2-feedback');
var challenger2Guess = document.querySelector('#challenger-2-guess-input');
var challenger2GuessSlot = document.querySelector('#challenger-2-guess-slot');
var challenger2Name = document.querySelector('#challenger-2-name-input');
var challenger2NameSlot = document.querySelector('#challenger-2-name-slot');
var clearAllBtn = document.querySelector('.clear-all-btn');
var clearFormBtn = document.querySelector('#clear-form-btn');
var errorMessage = document.querySelector('#warning');
var guessCounter = 0;
var maxRangeInput = document.querySelector('#max-range-input');
var maxRangeValue = document.querySelector('#max-range-value');
var minRangeInput = document.querySelector('#min-range-input');
var minRangeValue = document.querySelector('#min-range-value');
var resetGameBtn = document.querySelector('#reset-game-btn');
var rightSection = document.querySelector('.right-section');
var setRangeForm = document.querySelector('#set-range-inputs');
var submitBtn = document.querySelector('#submit-guess-btn');
var submitGuessForm = document.querySelector('#submit-guess-form');
var updateBtn = document.querySelector('#update-btn');
var gameWinner;
var targetNum;
var startTime;

submitGuessForm.addEventListener('input', checkGuessInputs);
submitGuessForm.addEventListener('input', enableClearBtn);
clearFormBtn.addEventListener('click', clearFormInputs);
resetGameBtn.addEventListener('click', resetGuessForm);
rightSection.addEventListener('click', deleteCard);
setRangeForm.addEventListener('input', checkRangeInputs);
challenger1Guess.addEventListener('input', checkChallengerGuessRange);
challenger2Guess.addEventListener('input', checkChallengerGuessRange);

function checkGuessInputs(){

  if (challenger1Name.value && challenger1Guess.value && challenger2Name.value && challenger2Guess.value){
    submitBtn.disabled = false;
    submitBtn.classList.add('active-btns');
    submitBtn.addEventListener('click', populateLatestGuess);

  } else {
    submitBtn.classList.remove('active-btns');
    submitBtn.disabled = true;
  }
}

function enableClearBtn() {
  if (challenger1Name.value || challenger1Guess.value || challenger2Name.value || challenger2Guess.value){
    clearFormBtn.disabled = false;
    clearFormBtn.classList.add('active-btns');

  } else {
    clearFormBtn.disabled = true;
    clearFormBtn.classList.remove('active-btns');
  }
}

function clearFormInputs() {
  document.getElementById('submit-guess-form').reset();
}


function populateLatestGuess(){
  challenger1NameSlot.innerText = challenger1Name.value;
  challenger2NameSlot.innerText = challenger2Name.value;
  challenger1GuessSlot.innerText = challenger1Guess.value;
  challenger1GuessSlot.classList.add('pink-text');
  challenger2GuessSlot.innerText = challenger2Guess.value;
  challenger2GuessSlot.classList.add('pink-text');

  guessChecker();
  clearFormInputs();

  submitBtn.classList.remove('active-btns');
  submitBtn.disabled = true;
  clearFormBtn.classList.remove('active-btns');
  clearFormBtn.disabled = true;
}

function disableAllBtns() {
  submitBtn.disabled = true;
  clearFormBtn.disabled = true;
  resetGameBtn.disabled = true;
}

function generateTargetNum(){
  var min = parseInt(`${minRangeValue.innerText}`)
  var max = parseInt(`${maxRangeValue.innerText}`);
  targetNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

function guessChecker(){
  var highFeedback = ['that\'s too high!', 'guess lower!', 'too high!', 'go lower!', 'not low enough!'];
  var lowFeedback = ['that\'s too low!', 'guess higher!', 'too low!', 'go higher!', 'not high enough!'];
  var index1 = Math.floor(Math.random() * highFeedback.length);
  var index2 = Math.floor(Math.random() * lowFeedback.length);
  var num1 = parseInt(challenger1Guess.value);
  var num2 = parseInt(challenger2Guess.value);
  guessCounter +=2;

  if (num1 < targetNum){
    challenger1Feedback.innerText = lowFeedback[index2];

  } else if (num1 > targetNum) {
    challenger1Feedback.innerText = highFeedback[index1];

  } else {
    challenger1Feedback.innerText= 'BOOM!';
    gameWinner = challenger1Name.value;
    var gameTime = (Date.now()-startTime)/1000;
    var minutes = Math.floor(gameTime/60);
    var seconds = Math.floor(gameTime % 60);

    displayWinnerCard(minutes, seconds);
  }

  if (num2 < targetNum){
    challenger2Feedback.innerText= lowFeedback[index2];

  } else if (num2 > targetNum){
    challenger2Feedback.innerText= highFeedback[index1];

  } else {
    challenger2Feedback.innerText= 'BOOM!';
    gameWinner = challenger2Name.value;
    var gameTime = Math.floor((Date.now()-startTime)/1000);
    var minutes = Math.floor(gameTime/60);
    var seconds = Math.floor(gameTime % 60);

    displayWinnerCard(minutes, seconds);
  }
}

function udpateCurrentGuessRange() {
  minRangeValue.innerText = minRangeInput.value;
  maxRangeValue.innerText = maxRangeInput.value;
  updateBtn.classList.remove('active-btns');
  updateBtn.disabled = true;

  generateTargetNum();
  clearSetRangeInputs();
  setGameStartTime();
}

function clearSetRangeInputs() {
  document.getElementById('set-range-inputs').reset();
}

function displayWinnerCard(minutes, seconds){
  var winnerCardsContainer= document.querySelector('.winner-cards-container');

  winnerCardsContainer.insertAdjacentHTML('afterbegin', `
  <section class='winner-card'>
      <section class='vs'>
        <p><span>${challenger1Name.value}</span></p>
        <p>VS</p>
        <p><span>${challenger2Name.value}</span></p>
      </section>
      <section class='winner-declaration'>
      <p><span>${gameWinner}</span></p>
      <p>WINNER</p>
      </section>
      <section class='game-stats'>
        <p><span>${guessCounter}</span> GUESSES</p>
        <p><span>${minutes}</span> MINUTES <span>${seconds}</span> SECONDS</p>
        <img src='assets/delete.svg' alt='close-icon' class='close'>
      </section>
    </section>`);

  clearGuessCounter();
  showClearAllBtn()
}

function showClearAllBtn() {
  var rightSection = document.querySelector('.right-section')
  clearAllBtn.classList.remove('hidden');
  rightSection.addEventListener('click', clearAllWinnerCards);
}

function clearAllWinnerCards() {
  var winnerCard = document.querySelectorAll('.winner-card');
  if (event.target.classList.contains('clear-all-btn')) {
    event.target.nextElementSibling.remove();
    clearAllBtn.classList.add('hidden');
  }
}

function clearGuessCounter(){
  guessCounter = 0;
}

function deleteCard(event) {
  if (event.target.classList.contains('close')){
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

  targetNum = '';
  disableAllBtns();
}

function displayErrorMessage(){
  if (parseInt(minRangeInput.value) < parseInt(maxRangeInput.value)){
    errorMessage.classList.add('hidden');
    maxRangeInput.classList.remove('warning-input');

    enableUpdateBtn();

  } else {
    errorMessage.classList.remove('hidden');
    maxRangeInput.classList.add('warning-input');
    updateBtn.disabled = true;
  }
}

function checkRangeInputs(){
  if (minRangeInput.value && maxRangeInput.value){
    displayErrorMessage();

  } else {
  updateBtn.disabled = true;
  updateBtn.classList.remove('active-btns');
  }
}

function enableUpdateBtn(){
  updateBtn.disabled = false;
  updateBtn.classList.add('active-btns');
  updateBtn.addEventListener('click', udpateCurrentGuessRange);
}

function checkChallengerGuessRange(event){
  if (parseInt(event.target.value)>=parseInt(minRangeValue.innerText) && parseInt(event.target.value)<=parseInt(maxRangeValue.innerText)){
  event.target.nextElementSibling.classList.add('hidden');

  } else {
    event.target.nextElementSibling.classList.remove('hidden');
  }
}

function setGameStartTime(){
  startTime = Date.now();
}
