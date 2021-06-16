'use strict';

//selecting elements
// const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1');

// score0El.textContent = 0;
// score1El.textContent = 0;
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

btnRoll.disabled = false;
btnHold.disabled = false;

//Starting conditions
diceEl.classList.add('hidden');
score0El.textContent = 0;
score1El.textContent = 0;

let scores = [0, 0];
let activePlayer = 0;

let currentScore = 0;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//reset the game
btnNew.addEventListener('click', function () {
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  btnRoll.disabled = false;
  btnHold.disabled = false;
});

//rolling dice functionality
document.querySelector('.btn--roll').addEventListener('click', function () {
  //1. generate a random dice roll
  let diceNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(diceNumber);

  //2. display the dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNumber}.png`;
  //   if (diceNumber === 1) {
  //     document.querySelector('#imgDice').src = 'dice-1.png';
  //   } else if (diceNumber === 2) {
  //     document.querySelector('#imgDice').src = 'dice-2.png';
  //   } else if (diceNumber === 3) {
  //     document.querySelector('#imgDice').src = 'dice-3.png';
  //   } else if (diceNumber === 4) {
  //     document.querySelector('#imgDice').src = 'dice-4.png';
  //   } else if (diceNumber === 5) {
  //     document.querySelector('#imgDice').src = 'dice-5.png';
  //   } else if (diceNumber === 6) {
  //     document.querySelector('#imgDice').src = 'dice-6.png';
  //   }

  //3. check for rolled 1
  if (diceNumber !== 1) {
    //add dice to current score
    currentScore += diceNumber;
    //currentScore = currentScore + diceNumber;

    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    //we set the current score not dinamicly here!
    //current0El.textContent = currentScore;
  } else {
    //switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //1. add current score to active's player total score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2. check if the active's player total score >= 100...if is so active player win
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnRoll.disabled = true;
    btnHold.disabled = true;
    diceEl.classList.add('hidden');
  } else {
    //3. if is not, Switch to the next player
    switchPlayer();
  }
});
